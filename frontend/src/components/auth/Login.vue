<script setup>
  import { ref, reactive } from "vue";
  import { useRouter } from "vue-router";
  import { message } from "ant-design-vue";
  import { login } from "../../api/api";

  const router = useRouter();
  const isLoading = ref(false);

  const email = ref("");
  const password = ref("");

  async function onSubmit(event) {
    console.log("testo xd", email.value, password.value);
    event.preventDefault();
    isLoading.value = true;
    try {
      await login(email.value, password.value);
      message.success("Login successful");
      router.push("/");
    } catch (error) {
      message.error("Login error: " + error.message);
    } finally {
      isLoading.value = false;
    }
  }
</script>

<template>
  <div class="grid gap-6">
    <form @submit="onSubmit">
      <div class="grid gap-2">
        <div class="grid gap-1">
          <label for="email"> Email </label>
          <input
            v-model="email"
            class="p-2 rounded-lg border-2 focus:border-indigo-500 focus:ring-indigo-500 transition duration-300 text-sm"
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
          <input
            class="p-2 rounded-lg border-2 focus:border-indigo-500 focus:ring-indigo-500 transition duration-300 text-sm"
            v-model="password"
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
