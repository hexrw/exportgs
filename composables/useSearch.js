import useState from "../composables/useState.js"

const state = useState()

const baseUrl = "https://content-customsearch.googleapis.com/customsearch/v1?"
const resultsPerPage = 10  // 1-10

const transformResult = res =>
    res.map( i => { delete i.pagemap; return i } )

export default () => async function getSearchResults (q, page = 0 /* 0-9 */) {
    const url = baseUrl + new URLSearchParams({
        key: import.meta.env.VITE_GOOGLE_CS_API_KEY,
        cx: import.meta.env.VITE_GOOGLE_SE_ID,
        q, fields: "items",
        c2coff: 1, alt: "json",
        filter: state.enableDuplicateFilter ? 1 : 0,
        safe: state.enableSafeSearch ? "active" : "off",
        lr: `lang_${state.lang}`,
        num: resultsPerPage,
        start: page * resultsPerPage + 1
    }).toString()

    return fetch(url)
        .then( res => res.json() )
        .then( data => {
            if (data?.items) return transformResult(data.items)
            else return Promise.reject(data) })
        .catch( err => console.error(err) )
}
