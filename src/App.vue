<template>
  <div id="app" class="min-h-screen bg-vedic-background">
    <VedaNavigation />
    
    <main>
      <router-view />
    </main>
    
    <footer class="bg-vedic-primary text-white text-center py-6 mt-16">
      <div class="max-w-4xl mx-auto px-4">
        <p class="mb-2">
          VedaVid - Digital Platform for Veda Adhyayana
        </p>
        <p class="text-sm text-vedic-accent">
          Preserving ancient wisdom through modern technology
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import VedaNavigation from '@/components/VedaNavigation.vue'
</script>