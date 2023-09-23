<script setup>
import useState from "../composables/useState.js"

const supportedLangs = [
    { name: "Čeština", code: "cs" },
    { name: "Slovenčina", code: "sk" },
    { name: "Deutsch", code: "de" },
    { name: "English", code: "en" },
    { name: "Español", code: "es" },
    { name: "Français", code: "fr" },
]
const state = useState()
</script>

<template>

<div class="p-4">
    <h2 class="text-xl font-semibold mb-2">Nastavení Vyhledávání</h2>

    <!-- Enable Duplicate Filter -->
    <div class="flex items-center space-x-2 mb-2">
        <input v-model="state.enableDuplicateFilter" type="checkbox"
            id="enableDuplicateFilter" class="mr-2" />
        <label for="enableDuplicateFilter">
            Detekce duplicitních výsledků
        </label>
    </div>

    <!-- Enable Safe Search -->
    <div class="flex items-center space-x-2 mb-2">
        <input v-model="state.enableSafeSearch" type="checkbox"
            id="enableSafeSearch" class="mr-2" />
        <label for="enableSafeSearch">
            Bezpečné vyhledávání
        </label>
    </div>

    <!-- Language Selection -->
    <div class="mb-2 inline-flex gap4">
        <label for="lang" class="my-auto">
            Jazyk vyhledávání:
        </label>
        <select v-model="state.lang" id="lang"
            class="p-2 border rounded-md">
            <option v-for="{ name, code } in supportedLangs" :key="code"
                :value="code">{{ name }}</option>
        </select>
    </div>
</div>

</template>
