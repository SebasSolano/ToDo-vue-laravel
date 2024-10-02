<script setup>
  import NoteForm from "./NoteForm.vue";
  import { UserOutlined, LogoutOutlined } from "@ant-design/icons-vue";
  import { useRouter } from "vue-router";
  import { logout } from "../api/api";

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("token");
      router.push("/auth");
    } catch (error) {
      console.error("Error closing session:", error);
    }
  };
</script>
<template>
  <div
    class="flex items-center justify-between w-full h-20 bg-indigo-300 shadow-md"
  >
    <div class="flex items-center justify-between p-4 space-x-5">
      <h1 class="font-semibold text-xl p-2 border-2 border-black text">
        N O T E S
      </h1>
      <h3 class="flex items-center justify-start space-x-1">
        <UserOutlined /> <span>name</span>
      </h3>
    </div>
    <div class="flex items-center justify-between space-x-3 p-4">
      <NoteForm />
      <a-button
        @click="handleLogout"
        class="flex items-center justify-center space-x-1"
        >Logout <LogoutOutlined
      /></a-button>
    </div>
  </div>

  <RouterView></RouterView>
</template>
