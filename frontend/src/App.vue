<script setup></script>
<template>
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: '#410099',
      },
    }"
  >
    <router-view />
  </a-config-provider>
</template>
