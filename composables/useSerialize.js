import json2toml from "json2toml"
import YAML from "yaml"

export default () => ({
    json: (data) => JSON.stringify(data),
    toml: (data) => json2toml(data),
    yaml: (data) => YAML.stringify(data),
})
