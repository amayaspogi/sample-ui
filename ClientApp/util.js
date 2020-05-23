export function version() {
    let version = new URL(document.querySelector("#startup").src).search;
    return version ?? "?v=base";
}

export function toJSON(json) {
    let jsonModel = `{${(json ?? "").split(",").map(x => x.split(":").reduce((x, y) => `"${x}":"${y}"`)).reduce((x, y) => `${x},${y}`)}}`;
    return JSON.parse(jsonModel);
}