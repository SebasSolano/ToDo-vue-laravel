<script setup>
  import { ref, reactive, nextTick, onMounted } from "vue";
  import {
    UserOutlined,
    DiffOutlined,
    InfoCircleOutlined,
    PlusOutlined,
    EditOutlined,
  } from "@ant-design/icons-vue";
  import { message } from "ant-design-vue";
  import dayjs from "dayjs";
  import { useStore } from "vuex";

  const props = defineProps({
    notes: {
      type: Object,
      required: false,
    },
  });

  const inputRef = ref();
  const open = ref(false);
  const confirmLoading = ref(false);

  const store = useStore();

  const form = reactive({
    title: "",
    description: "",
    dueDate: "",
    user: "",
    tags: [],
    inputVisible: false,
    inputValue: "",
  });

  const showModal = () => {
    open.value = true;
  };

  const handleOk = async () => {
    confirmLoading.value = true;
    const date = dayjs(form.dueDate).format("YYYY-MM-DD");

    const note = {
      title: form.title,
      description: form.description,
      dueDate: date,
      tags: form.tags,
      status: props.notes?.status || "active",
    };

    try {
      if (props.notes) {

        await store.dispatch("editNote", note);
        message.success("Note edited successfully");

      } else {
        await store.dispatch("addNote", note);
        message.success("Note added successfully");
      }
      resetForm();
      open.value = false;
    } catch (error) {
      message.error("Error saving the note");
      console.error(error);
    } finally {
      confirmLoading.value = false;
    }
  };

  const handleClose = (removedTag) => {
    const tags = form.tags.filter((tag) => tag !== removedTag);
    console.log(tags);
    form.tags = tags;
  };
  const showInput = () => {
    form.inputVisible = true;
    nextTick(() => {
      inputRef.value.focus();
    });
  };
  const handleInputConfirm = () => {
    const inputValue = form.inputValue;
    let tags = form.tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);
    Object.assign(form, {
      tags,
      inputVisible: false,
      inputValue: "",
    });
  };

  const resetForm = () => {
    form.title = "";
    form.description = "";
    form.dueDate = "";
    form.user = "";
    form.tags = [];
  };

  onMounted(() => {
    if (props.notes) {
      const date = dayjs(props.notes.dueDate, "YYYY-MM-DD");

      form.title = props.notes.title;
      form.description = props.notes.description;
      form.dueDate = date;
      form.user = props.notes.user;
      form.tags = props.notes.tags;
    }
  });
</script>
<template>
  <a-button
    v-if="props.notes"
    @click="showModal"
    type="primary"
    class="flex items-center justify-center space-x-1"
  >
    <EditOutlined />
  </a-button>
  <a-button
    v-else
    @click="showModal"
    type="primary"
    class="flex items-center justify-center space-x-1"
  >
    Add Note <DiffOutlined />
  </a-button>
  <a-modal
    v-model:open="open"
    title="Add a Note"
    :confirm-loading="confirmLoading"
    @ok="handleOk"
  >
    <form @submit.prevent="handleOk" class="space-y-4">
      <div>
        <label class="block text-gray-700">Title</label>
        <a-input v-model:value="form.title" placeholder="Title">
          <template #prefix>
            <DiffOutlined />
          </template>
          <template #suffix>
            <a-tooltip title="Add a title for the note">
              <info-circle-outlined style="color: rgba(0, 0, 0, 0.45)" />
            </a-tooltip>
          </template>
        </a-input>
      </div>
      <div>
        <label class="block text-gray-700">Description</label>
        <a-textarea
          v-model:value="form.description"
          placeholder="Add a description for the note."
          :auto-size="{ minRows: 2, maxRows: 5 }"
        />
      </div>
      <div>
        <label class="block text-gray-700">User</label>
        <a-input v-model:value="form.user" placeholder="User">
          <template #prefix>
            <user-outlined />
          </template>
          <template #suffix>
            <a-tooltip title="Add the user in charge">
              <info-circle-outlined style="color: rgba(0, 0, 0, 0.45)" />
            </a-tooltip>
          </template>
        </a-input>
      </div>
      <div>
        <label class="block text-gray-700">Expiration</label>
        <a-date-picker v-model:value="form.dueDate" class="w-full" />
      </div>
      <div>
        <label class="block text-gray-700">Tags</label>
        <template v-for="(tag, index) in form.tags" :key="tag">
          <a-tag :closable="index >= 0" @close="handleClose(tag)">
            {{ tag }}
          </a-tag>
        </template>
        <a-input
          v-if="form.inputVisible"
          ref="inputRef"
          v-model:value="form.inputValue"
          type="text"
          size="small"
          :style="{ width: '78px' }"
          @blur="handleInputConfirm"
          @keyup.enter="handleInputConfirm"
        />
        <a-tag
          v-else
          style="background: #fff; border-style: dashed"
          @click="showInput"
        >
          <plus-outlined />
          New Tag
        </a-tag>
      </div>
    </form>
  </a-modal>
</template>
