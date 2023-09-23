import { reactive } from "vue"
const state = reactive({
    enableDuplicateFilter: true,
    enableSafeSearch: false,
    lang: "cs" })
export default () => { return state }
