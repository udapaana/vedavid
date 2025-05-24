<template>
  <div class="bg-white border border-gray-200 rounded-lg p-4 mb-6">
    <label class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }}
    </label>
    <select 
      :value="modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-vedic-primary focus:border-vedic-primary"
    >
      <option value="">{{ placeholder }}</option>
      <option 
        v-for="option in options" 
        :key="option.value" 
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
interface Option {
  value: string
  label: string
}

interface Props {
  modelValue: string
  options: Option[]
  label: string
  placeholder: string
}

defineProps<Props>()
defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>