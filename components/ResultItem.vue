<script setup>
const { item } = defineProps([ "item" ])
</script>

<template>

<div class="bg-white rounded-lg p-4">
    <h3 class="text-xl font-semibold"><a :href="item.link" class="text-blue-600">{{ item.title }}</a></h3>
    <p class="text-gray-600">{{ item.snippet }}</p>
    <a :href="item.link" class="text-sm text-gray-400 hover:text-blue-600">{{ item.displayLink }}</a>
</div>

</template>
