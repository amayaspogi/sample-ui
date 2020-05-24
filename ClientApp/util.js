export function version() {
    let version = new URL(document.querySelector("#startup").src).search;
    return version ?? "?v=base";
}

export function toJSON(json) {
    let jsonModel = `{${(json ?? "").split(",").map(x => x.split(":").reduce((x, y) => `"${x}":"${y}"`)).reduce((x, y) => `${x},${y}`)}}`;
    return JSON.parse(jsonModel);
}

export function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'

}

export function getContext(dom) {
    let iterate = (obj) => {
        if (obj.getAttribute("data-context")) obj = obj.parentElement;
        let parent = obj.closest("[data-context]");
        if (parent) {
            return `${iterate(parent) ?? ""}.${parent.getAttribute("data-context")}`; 
        }
        else {
            return obj.getAttribute("data-context");
        }
    }
   return iterate(dom).slice(1);
}