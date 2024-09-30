<script setup></script>
<template>
  <form @submit.prevent="" class="">
    <div>
      <label class="block text-gray-700">Title</label>
      <a-input v-model:value="userName" placeholder="Basic usage">
        <template #prefix>
          <user-outlined />
        </template>
        <template #suffix>
          <a-tooltip title="Extra information">
            <info-circle-outlined style="color: rgba(0, 0, 0, 0.45)" />
          </a-tooltip>
        </template>
      </a-input>
    </div>
    <div>
      <label class="block text-gray-700">Description</label>
      <a-textarea
        v-model:value="value2"
        placeholder="Autosize height with minimum and maximum number of lines"
        :auto-size="{ minRows: 2, maxRows: 5 }"
      />
    </div>
    <div>
      <label class="block text-gray-700">Title</label>
      <input type="text" class="w-full p-2 border border-gray-300 rounded" />
    </div>
    <div>
      <label class="block text-gray-700">Title</label>
      <input type="text" class="w-full p-2 border border-gray-300 rounded" />
    </div>
  </form>
</template>
