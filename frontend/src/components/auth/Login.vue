<script setup>
  import { ref, reactive } from "vue";
  import { useRouter } from "vue-router";
  import { message } from "ant-design-vue";

  const router = useRouter();
  const isLoading = ref(false);
  const form = reactive({
    email: "",
    password: "",
  });

  async function onSubmit(event) {
    event.preventDefault();
    isLoading.value = true;
    try {
        message.success("Logged in successfully!");
      setTimeout(() => {
        isLoading.value = false;
        router.push("/");
      }, 1000);
    } catch (error) {
      setTimeout(() => {
        isLoading.value = false;
      }, 1000);
    }
  }
</script>

<template>
  <div class="grid gap-6">
    <form @submit="onSubmit">
      <div class="grid gap-2">
        <div class="grid gap-1">
          <label for="email"> Email </label>
          <a-input
            v-model="form.email"
            id="email"
            placeholder="Email"
            type="email"
            auto-capitalize="none"
            auto-complete="email"
            auto-correct="off"
            :disabled="isLoading"
            required
          />
          <label for="password"> Password </label>
          <a-input-password
            v-model="form.password"
            id="password"
            placeholder="Password"
            type="password"
            auto-capitalize="none"
            auto-complete="password"
            auto-correct="off"
            :disabled="isLoading"
            required
          />
        </div>
        <a-button
          html-type="submit"
          type="primary"
          :loading="isLoading"
          :disabled="isLoading"
        >
          Log In
        </a-button>
      </div>
    </form>
    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <span class="w-full border-t" />
      </div>
    </div>
  </div>
</template>
