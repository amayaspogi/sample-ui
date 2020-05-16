export function version() {
    let version = new URL(document.querySelector("#startup").src).search;
    return version ?? "?v=base";
}