<script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { message } from "ant-design-vue";
  import { register } from "../../api/api";

  const router = useRouter();
  const isLoading = ref(false);
  const name = ref("");
  const email = ref("");
  const password = ref("");
  const confPassword = ref("");

  async function onSubmit(event) {
    console.log(name.value, email.value, password.value);
    event.preventDefault();
    isLoading.value = true;

    try {
      if (password.value !== confPassword.value) {
        message.error("Passwords do not match");
        return;
      }

      await register(name.value, email.value, password.value);
      message.success("Registration successful");
      router.push("/auth");
    } catch (error) {
      message.error("Registration error: " + error.message);
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
          <label for="email"> Name </label>
          <input
            class="p-2 rounded-lg border-2 focus:border-indigo-500 focus:ring-indigo-500 transition duration-500 text-sm"
            v-model="name"
            id="name"
            placeholder="Name"
            type="name"
            auto-capitalize="none"
            auto-complete="name"
            auto-correct="off"
            :disabled="isLoading"
            required
          />
          <label for="email"> Email </label>
          <input
            class="p-2 rounded-lg border-2 focus:border-indigo-500 focus:ring-indigo-500 transition duration-500 text-sm"
            v-model="email"
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
            class="p-2 rounded-lg border-2 focus:border-indigo-500 focus:ring-indigo-500 transition duration-500 text-sm"
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
          <label for="password"> Confirm Password </label>
          <input
            class="p-2 rounded-lg border-2 focus:border-indigo-500 focus:ring-indigo-500 transition duration-500 text-sm"
            v-model="confPassword"
            id="confPassword"
            placeholder="Confirm Password"
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
          Sing in
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
