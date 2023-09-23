<script setup>
import { ref, watchEffect } from "vue"
import useSearch from "./composables/useSearch.js"
import ResultItem from "./components/ResultItem.vue"
import Settings from "./components/Settings.vue"
import Export from "./components/Export.vue"

const input = ref("")
const searchResults = ref([])
const page = ref(0)
const search = useSearch()

const submit = async () => {
    page.value = 0
    console.log("Method Call | submit", input.value)
    const res = await search(input.value)
    searchResults.value = res }

const loadMore = async (e) => {
    console.log(JSON.stringify(e))
    console.log("Method Call | loadMore", input.value, page.value)
    if (page.value > 8 || !input.value) {
        console.log("Method Call | loadMore | canceled")
        return; }  // 9 pages max (100 results)
    page.value++
    const newResults = await search(input.value, page.value)
    searchResults.value = searchResults.value.concat(newResults) }

watchEffect(() => {
    console.log("Component State Change | input", input.value)
    console.log( "Component State Change | searchResults",
        JSON.stringify(searchResults.value).slice(0, 100) )  // truncate
    console.log("Component State Change | page", page.value) })
</script>

<template>

<main class="p-5 flex flex-col gap6 min-h-screen">

<div class="flex flex-row flex-wrap gap6 justify-evenly">
    <Settings />
    <Export :searchResults="searchResults" />
</div>

<div class="flex flex-row flex-wrap justify-center gap4 mx-auto">
    <div class="flex flex-row focus-within:ring-2 rounded-md focus-within:ring-blue-500">
        <input v-model="input" @keyup.enter="submit" type="text" name="input" id="input"
            class="border border-gray-300 rounded-md border-r-none rounded-r-none py2 pl4 focus:outline-none"
            placeholder="Hledaný termín..." />
        <label for="input" class="flex pl2 pr4 rounded-r-md border border-gray-300 border-l-none">
            <svg class="w6 h6 my-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11.5" cy="11.5" r="9.5"/><path stroke-linecap="round" d="m20 20l2 2"/></g></svg>
        </label>
    </div>
    <button @click="submit" :disabled="!input"
        class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
        Hledat
    </button>
</div>

<div>
    <div v-if="input && searchResults.length === 0" class="text-center text-gray-500">Žádné výsledky</div>
</div>

<div v-if="searchResults.length > 0" class="flex flex-col gap6">
    <div class="text-center text-gray-500">
        Načteno {{ searchResults.length || 0 }} výsledků
    </div>
    <button @click="loadMore" class="mx-auto mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md cursor-pointer">
        Načíst další
    </button>

    <ul ref="searchResultsEl" class="space-y-4 max-w-5xl mx-auto">
        <li v-for="item in searchResults">
            <ResultItem :item="item" />
        </li>
    </ul>
    <button @click="loadMore" class="mx-auto bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md cursor-pointer">
        Načíst další
    </button>
    <div class="text-center text-gray-500 mt12">Konec výsledků</div>
</div>

</main>

</template>