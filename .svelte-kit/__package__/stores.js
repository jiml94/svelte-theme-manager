import { writable } from "svelte/store";
export const themeStore = writable({
    useSystemTheme: true,
    darkMode: false
});
