import { writable, type Writable } from "svelte/store";

export const themeStore:Writable<{
    useSystemTheme: boolean,
    darkMode: boolean
}> = writable({
    useSystemTheme: true,
    darkMode: false
})