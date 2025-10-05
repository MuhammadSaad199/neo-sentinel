

<template>
  <div class="min-h-screen">
    <AppHeader />
        <slot />

    <!-- Overlay for Mobile -->
    <div v-if="sidebarOpen" @click="toggleSidebar" class="fixed inset-0 bg-black opacity-50 md:hidden"></div>
  </div>
             <!-- footer seciton  -->
             <!-- <div class="md:ml-56 w-full">
              <Footer />
             </div> -->
</template>

<script setup>
useHead({
  title: 'Xoomtec',
  link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }]
});
import { ref } from "vue";

const sidebarOpen = ref(false);

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};
</script>