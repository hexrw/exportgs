<script setup>
import { ref } from "vue"
import useSerialize from "../composables/useSerialize.js"

const props = defineProps([ "searchResults" ])
const serialize = useSerialize()
const supported = [ "json", "toml", "yaml" ]
const selected = ref(supported[0])

async function exportAndDownload() {
    const type = supported.includes(selected.value)
        ? `application/${selected.value}` : "application/octet-stream"
    const data = await serialize[selected.value](props.searchResults)

    const blob = new Blob([data], { type })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `export.${selected.value}`
    link.click()
}
</script>

<template>

<div class="p-4 md:min-w-md">
    <h2 class="text-xl font-semibold mb-2">Export</h2>

    <!-- Format Selection -->
    <div class="mb-2 inline-flex gap4">
        <label for="format" class="my-auto">
            Formát:
        </label>
        <select v-model="selected" id="format"
            class="p-2 border rounded-md">
            <option v-for="name in supported" :key="name"
                :value="name">{{ name }}</option>
        </select>
    </div>

    <div class="mt-3">
        <button @click="exportAndDownload" :disabled="props.searchResults.length < 1"
            class="mx-auto bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
            Stáhnout
        </button>
    </div>
</div>

</template>
