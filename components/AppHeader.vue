<template>
  <!-- Navigation -->
  <nav class="fixed top-0 w-full z-50 backdrop-blur-md bg-gray-900/70 border-b border-purple-500/20">
    <div class="container mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center space-x-2">
          <svg class="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke-width="2" />
            <path d="M12 2 L12 12 L17 17" stroke-width="2" />
          </svg>
          <span class="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            NEO Sentinel
          </span>
        </div>

        <!-- Navigation Links -->
        <div class="hidden md:flex space-x-8">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.name"
            :to="link.path"
            class="hover:text-purple-400 transition-colors duration-300 text-white font-medium"
          >
            {{ link.name }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Dashboard', path: '/dashboard' },
];
</script>
