<script setup>
  import { watchEffect, reactive } from "vue";
  import { useRoute } from "vue-router";

  const route = useRoute();

  const states = reactive({
    title: "",
    pTittle: "",
    nameApp: "N O T E S",
    buttonName: "",
    buttonUrl: "",
  });

  watchEffect(() => {
    if (route.path === "/auth" || route.path === "/auth/") {
      states.title = "Log in to " + states.nameApp;
      states.pTittle = "Enter an existing email and password";
      states.buttonName = "Sing in";
      states.buttonUrl = "/auth/register";
    } else if (
      route.path === "/auth/register" ||
      route.path === "/auth/register/"
    ) {
      states.title = "Create an account";
      states.pTittle = "Enter an email and a password";
      states.buttonName = "Log in";
      states.buttonUrl = "/auth";
    }
  });
</script>

<template>
  <div
    class="container relative h-[100vh] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 bg-slate-100"
  >
    <RouterLink
      :to="states.buttonUrl"
      class="absolute right-4 top-4 md:right-8 md:top-8 rounded-2xl hover:underline"
      >{{ states.buttonName }}</RouterLink
    >

    <div
      class="relative h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex"
    >
      <div class="absolute inset-0 bg-zinc-900">
      </div>
      <div
        class="relative z-20 flex items-center text-lg font-medium hover:cursor-pointer"
      >
        <img src="../assets/vue.svg"  class="h-32 w-32" />
        <span class="text-3xl">{{ states.nameApp }}</span>
      </div>
    </div>
    <div class="lg:p-8">
      <div
        class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]"
      >
        <div class="flex flex-col space-y-2 text-center">
          <h1 class="text-2xl font-semibold tracking-tight">
            {{ states.title }}
          </h1>
          <p class="text-sm text-muted-foreground">
            {{ states.pTittle }}
          </p>
        </div>
        <RouterView />
        <p class="px-8 text-center text-sm text-muted-foreground">
          By clicking Continue, you accept our
          <router-link
            to="/auth"
            class="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service</router-link
          >
          and
          <router-link
            to="/auth"
            class="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy.</router-link
          >
        </p>
      </div>
    </div>
  </div>
</template>
