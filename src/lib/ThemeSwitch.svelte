<script lang="ts">
    import { onMount } from "svelte";
    import {themeStore} from "./stores.js"

    // Props
    export let fontSize:string = "0.6rem";
    export let padding:string = `calc(${fontSize} / 3)`;
    export let applyOnBody:boolean = true;
    export let horizontal:boolean = false;
    export let preference:"light" | "dark" | "system" = "system";
    export let border:string = "solid 1px var(--color-text)";
    export let style:string="";
    export let backgroundColor:string = 'var(--color-bg-1)';
    export let colors: Partial<typeof defaultColors> = {};
    export let propertyNames: Partial<typeof defaultPropertyNames> = {};
    export let customColors:{[key: `light${string}` | `dark${string}`]: string} = {};
    export let customPropertyNames:{[key: string]: string} = {};
    export let customOnly:boolean = false;
    export let development:boolean = false;

    // Reactive declarations
    $: ({ useSystemTheme, darkMode } = $themeStore);
    $: mergedColors = {...defaultColors, ...colors};
    $: mergedPropertyNames = {...defaultPropertyNames, ...propertyNames};
    $: checkCustomColors(customPropertyNames);
    $: if (browser && useSystemTheme) systemTheme === "dark" ? selectMode("dark") : selectMode("light");
    $: selectedBackgroundTransform = horizontal 
        ? `transform: scaleX(0.33) translateX(${useSystemTheme ? "0%" : darkMode ? "202%" : "101%"})`
        : `transform: translateY(${useSystemTheme ? "0" : "101%"}) scaleX(${useSystemTheme ? "1" : "0.5"}) translateX(${!useSystemTheme && darkMode ? "101%" : "0%"})`;
    $: faIcons = {
        faWindows: `<svg fill="var(--color-text)" height="${fontSize}"  preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M0 93.7l183.6-25.3v177.4H0V93.7zm0 324.6l183.6 25.3V268.4H0v149.9zm203.8 28L448 480V268.4H203.8v177.9zm0-380.6v180.1H448V32L203.8 65.7z"/></svg>`,
        faApple: `<svg fill="var(--color-text)" height="${fontSize}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>`,
        faLinux: `<svg fill="var(--color-text)" height="${fontSize}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M220.8 123.3c1 .5 1.8 1.7 3 1.7 1.1 0 2.8-.4 2.9-1.5 .2-1.4-1.9-2.3-3.2-2.9-1.7-.7-3.9-1-5.5-.1-.4 .2-.8 .7-.6 1.1 .3 1.3 2.3 1.1 3.4 1.7zm-21.9 1.7c1.2 0 2-1.2 3-1.7 1.1-.6 3.1-.4 3.5-1.6 .2-.4-.2-.9-.6-1.1-1.6-.9-3.8-.6-5.5 .1-1.3 .6-3.4 1.5-3.2 2.9 .1 1 1.8 1.5 2.8 1.4zM420 403.8c-3.6-4-5.3-11.6-7.2-19.7-1.8-8.1-3.9-16.8-10.5-22.4-1.3-1.1-2.6-2.1-4-2.9-1.3-.8-2.7-1.5-4.1-2 9.2-27.3 5.6-54.5-3.7-79.1-11.4-30.1-31.3-56.4-46.5-74.4-17.1-21.5-33.7-41.9-33.4-72C311.1 85.4 315.7 .1 234.8 0 132.4-.2 158 103.4 156.9 135.2c-1.7 23.4-6.4 41.8-22.5 64.7-18.9 22.5-45.5 58.8-58.1 96.7-6 17.9-8.8 36.1-6.2 53.3-6.5 5.8-11.4 14.7-16.6 20.2-4.2 4.3-10.3 5.9-17 8.3s-14 6-18.5 14.5c-2.1 3.9-2.8 8.1-2.8 12.4 0 3.9 .6 7.9 1.2 11.8 1.2 8.1 2.5 15.7 .8 20.8-5.2 14.4-5.9 24.4-2.2 31.7 3.8 7.3 11.4 10.5 20.1 12.3 17.3 3.6 40.8 2.7 59.3 12.5 19.8 10.4 39.9 14.1 55.9 10.4 11.6-2.6 21.1-9.6 25.9-20.2 12.5-.1 26.3-5.4 48.3-6.6 14.9-1.2 33.6 5.3 55.1 4.1 .6 2.3 1.4 4.6 2.5 6.7v.1c8.3 16.7 23.8 24.3 40.3 23 16.6-1.3 34.1-11 48.3-27.9 13.6-16.4 36-23.2 50.9-32.2 7.4-4.5 13.4-10.1 13.9-18.3 .4-8.2-4.4-17.3-15.5-29.7zM223.7 87.3c9.8-22.2 34.2-21.8 44-.4 6.5 14.2 3.6 30.9-4.3 40.4-1.6-.8-5.9-2.6-12.6-4.9 1.1-1.2 3.1-2.7 3.9-4.6 4.8-11.8-.2-27-9.1-27.3-7.3-.5-13.9 10.8-11.8 23-4.1-2-9.4-3.5-13-4.4-1-6.9-.3-14.6 2.9-21.8zM183 75.8c10.1 0 20.8 14.2 19.1 33.5-3.5 1-7.1 2.5-10.2 4.6 1.2-8.9-3.3-20.1-9.6-19.6-8.4 .7-9.8 21.2-1.8 28.1 1 .8 1.9-.2-5.9 5.5-15.6-14.6-10.5-52.1 8.4-52.1zm-13.6 60.7c6.2-4.6 13.6-10 14.1-10.5 4.7-4.4 13.5-14.2 27.9-14.2 7.1 0 15.6 2.3 25.9 8.9 6.3 4.1 11.3 4.4 22.6 9.3 8.4 3.5 13.7 9.7 10.5 18.2-2.6 7.1-11 14.4-22.7 18.1-11.1 3.6-19.8 16-38.2 14.9-3.9-.2-7-1-9.6-2.1-8-3.5-12.2-10.4-20-15-8.6-4.8-13.2-10.4-14.7-15.3-1.4-4.9 0-9 4.2-12.3zm3.3 334c-2.7 35.1-43.9 34.4-75.3 18-29.9-15.8-68.6-6.5-76.5-21.9-2.4-4.7-2.4-12.7 2.6-26.4v-.2c2.4-7.6 .6-16-.6-23.9-1.2-7.8-1.8-15 .9-20 3.5-6.7 8.5-9.1 14.8-11.3 10.3-3.7 11.8-3.4 19.6-9.9 5.5-5.7 9.5-12.9 14.3-18 5.1-5.5 10-8.1 17.7-6.9 8.1 1.2 15.1 6.8 21.9 16l19.6 35.6c9.5 19.9 43.1 48.4 41 68.9zm-1.4-25.9c-4.1-6.6-9.6-13.6-14.4-19.6 7.1 0 14.2-2.2 16.7-8.9 2.3-6.2 0-14.9-7.4-24.9-13.5-18.2-38.3-32.5-38.3-32.5-13.5-8.4-21.1-18.7-24.6-29.9s-3-23.3-.3-35.2c5.2-22.9 18.6-45.2 27.2-59.2 2.3-1.7 .8 3.2-8.7 20.8-8.5 16.1-24.4 53.3-2.6 82.4 .6-20.7 5.5-41.8 13.8-61.5 12-27.4 37.3-74.9 39.3-112.7 1.1 .8 4.6 3.2 6.2 4.1 4.6 2.7 8.1 6.7 12.6 10.3 12.4 10 28.5 9.2 42.4 1.2 6.2-3.5 11.2-7.5 15.9-9 9.9-3.1 17.8-8.6 22.3-15 7.7 30.4 25.7 74.3 37.2 95.7 6.1 11.4 18.3 35.5 23.6 64.6 3.3-.1 7 .4 10.9 1.4 13.8-35.7-11.7-74.2-23.3-84.9-4.7-4.6-4.9-6.6-2.6-6.5 12.6 11.2 29.2 33.7 35.2 59 2.8 11.6 3.3 23.7 .4 35.7 16.4 6.8 35.9 17.9 30.7 34.8-2.2-.1-3.2 0-4.2 0 3.2-10.1-3.9-17.6-22.8-26.1-19.6-8.6-36-8.6-38.3 12.5-12.1 4.2-18.3 14.7-21.4 27.3-2.8 11.2-3.6 24.7-4.4 39.9-.5 7.7-3.6 18-6.8 29-32.1 22.9-76.7 32.9-114.3 7.2zm257.4-11.5c-.9 16.8-41.2 19.9-63.2 46.5-13.2 15.7-29.4 24.4-43.6 25.5s-26.5-4.8-33.7-19.3c-4.7-11.1-2.4-23.1 1.1-36.3 3.7-14.2 9.2-28.8 9.9-40.6 .8-15.2 1.7-28.5 4.2-38.7 2.6-10.3 6.6-17.2 13.7-21.1 .3-.2 .7-.3 1-.5 .8 13.2 7.3 26.6 18.8 29.5 12.6 3.3 30.7-7.5 38.4-16.3 9-.3 15.7-.9 22.6 5.1 9.9 8.5 7.1 30.3 17.1 41.6 10.6 11.6 14 19.5 13.7 24.6zM173.3 148.7c2 1.9 4.7 4.5 8 7.1 6.6 5.2 15.8 10.6 27.3 10.6 11.6 0 22.5-5.9 31.8-10.8 4.9-2.6 10.9-7 14.8-10.4s5.9-6.3 3.1-6.6-2.6 2.6-6 5.1c-4.4 3.2-9.7 7.4-13.9 9.8-7.4 4.2-19.5 10.2-29.9 10.2s-18.7-4.8-24.9-9.7c-3.1-2.5-5.7-5-7.7-6.9-1.5-1.4-1.9-4.6-4.3-4.9-1.4-.1-1.8 3.7 1.7 6.5z"/></svg>`,
        faMobile: `<svg fill="var(--color-text)" height="${fontSize}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M80 0C44.7 0 16 28.7 16 64l0 384c0 35.3 28.7 64 64 64l224 0c35.3 0 64-28.7 64-64l0-384c0-35.3-28.7-64-64-64L80 0zm80 432l64 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-64 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/></svg>`,
        faDesktop: `<svg fill="var(--color-text)" height="${fontSize}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l176 0-10.7 32L160 448c-17.7 0-32 14.3-32 32s14.3 32 32 32l256 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-69.3 0L336 416l176 0c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0zM512 64l0 224L64 288 64 64l448 0z"/></svg>`,
        faSun: `<svg fill="var(--color-text)" xmlns="http://www.w3.org/2000/svg" height=${fontSize} viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M375.7 19.7c-1.5-8-6.9-14.7-14.4-17.8s-16.1-2.2-22.8 2.4L256 61.1 173.5 4.2c-6.7-4.6-15.3-5.5-22.8-2.4s-12.9 9.8-14.4 17.8l-18.1 98.5L19.7 136.3c-8 1.5-14.7 6.9-17.8 14.4s-2.2 16.1 2.4 22.8L61.1 256 4.2 338.5c-4.6 6.7-5.5 15.3-2.4 22.8s9.8 13 17.8 14.4l98.5 18.1 18.1 98.5c1.5 8 6.9 14.7 14.4 17.8s16.1 2.2 22.8-2.4L256 450.9l82.5 56.9c6.7 4.6 15.3 5.5 22.8 2.4s12.9-9.8 14.4-17.8l18.1-98.5 98.5-18.1c8-1.5 14.7-6.9 17.8-14.4s2.2-16.1-2.4-22.8L450.9 256l56.9-82.5c4.6-6.7 5.5-15.3 2.4-22.8s-9.8-12.9-17.8-14.4l-98.5-18.1L375.7 19.7zM269.6 110l65.6-45.2 14.4 78.3c1.8 9.8 9.5 17.5 19.3 19.3l78.3 14.4L402 242.4c-5.7 8.2-5.7 19 0 27.2l45.2 65.6-78.3 14.4c-9.8 1.8-17.5 9.5-19.3 19.3l-14.4 78.3L269.6 402c-8.2-5.7-19-5.7-27.2 0l-65.6 45.2-14.4-78.3c-1.8-9.8-9.5-17.5-19.3-19.3L64.8 335.2 110 269.6c5.7-8.2 5.7-19 0-27.2L64.8 176.8l78.3-14.4c9.8-1.8 17.5-9.5 19.3-19.3l14.4-78.3L242.4 110c8.2 5.7 19 5.7 27.2 0zM256 368a112 112 0 1 0 0-224 112 112 0 1 0 0 224zM192 256a64 64 0 1 1 128 0 64 64 0 1 1 -128 0z"/>
                </svg>`,
        faMoon: `<svg fill="var(--color-text)" xmlns="http://www.w3.org/2000/svg" height=${fontSize} viewBox="0 0 384 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M144.7 98.7c-21 34.1-33.1 74.3-33.1 117.3c0 98 62.8 181.4 150.4 211.7c-12.4 2.8-25.3 4.3-38.6 4.3C126.6 432 48 353.3 48 256c0-68.9 39.4-128.4 96.8-157.3zm62.1-66C91.1 41.2 0 137.9 0 256C0 379.7 100 480 223.5 480c47.8 0 92-15 128.4-40.6c1.9-1.3 3.7-2.7 5.5-4c4.8-3.6 9.4-7.4 13.9-11.4c2.7-2.4 5.3-4.8 7.9-7.3c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-3.7 .6-7.4 1.2-11.1 1.6c-5 .5-10.1 .9-15.3 1c-1.2 0-2.5 0-3.7 0l-.3 0c-96.8-.2-175.2-78.9-175.2-176c0-54.8 24.9-103.7 64.1-136c1-.9 2.1-1.7 3.2-2.6c4-3.2 8.2-6.2 12.5-9c3.1-2 6.3-4 9.6-5.8c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-3.6-.3-7.1-.5-10.7-.6c-2.7-.1-5.5-.1-8.2-.1c-3.3 0-6.5 .1-9.8 .2c-2.3 .1-4.6 .2-6.9 .4z"/>
                </svg>`,
    };

    // Local state
    let browser:boolean = false;
    let systemTheme:"light" | "dark";
    let osIcon:string;
    let themeSelectorElement:HTMLElement;
    let themeSelectorHeight:number;
    let themeSelectorWidth:number;
    let customColorErrors:number = 0;

    $themeStore.useSystemTheme = preference === "system" ? true : false
    

    // Constants
    const defaultColors = {
        lightBg0: "hsl(208, 33%, 84%)",
        lightBg1: "hsl(208, 33%, 86%)",
        lightBg2: "hsl(208, 33%, 95%)",
        lightTheme1: "#41acd2",
        lightTheme2: "#fff000",
        lightTextColor: "hsla(0, 0%, 0%, 0.702)",
        lightTextColor1: "#8a8a8e",
        lightTextColor2: "#c4c4c6",
        lightTextColor3: "#dcdcdd",
        lightLabelLink: "rgb(0, 102, 204)",
        lightRed: "rgb(255, 59, 48)",
        lightOrange: "rgb(255, 149, 0)",
        lightYellow: "rgb(255, 204, 0)",
        lightGreen: "rgb(52 ,199, 89)",
        lightMint: "rgb(0 , 199, 190)",
        lightTeal: "rgb(48, 176, 199)",
        lightCyan: "rgb(50, 173, 230)",
        lightBlue: "rgb(0, 122, 155)",
        lightIndigo: "rgb(88, 86, 214)",
        lightPurple: "rgb(175, 82, 222)",
        lightPink: "rgb(255, 45, 85)",
        lightBrown: "rgb(162, 132, 94)",
        lightGray: "rgb(142, 142, 147)",
        lightGray2: "rgb(174, 174, 178)",
        lightGray3: "rgb(199, 199, 204)",
        lightGray4: "rgb(209, 209, 214)",
        lightGray5: "rgb(229, 299, 234)",
        lightGray6: "rgb(242, 242, 247)",
        darkBg0: "hsl(208, 33%, 16%)",
        darkBg1: "hsl(208, 33%, 14%)",
        darkBg2: "hsl(208, 33%, 5%)",
        darkTheme1: "#e62140",
        darkTheme2: "#191447",
        darkTextColor: "hsla(0, 0%, 100%, 0.702)",
        darkTextColor1: "#8d8d92",
        darkTextColor2: "#47474a",
        darkTextColor3: "#2a2a2c",
        darkLabelLink: "rgb(40, 151, 255)",
        darkRed: "rgb(255, 69, 58)",
        darkOrange: "rgb(255, 159, 10)",
        darkYellow: "rgb(255, 214, 10)",
        darkGreen: "rgb(48 ,209, 88)",
        darkMint: "rgb(99 , 230, 226)",
        darkTeal: "rgb(64, 200, 224)",
        darkCyan: "rgb(100, 210, 255)",
        darkBlue: "rgb(10, 132, 255)",
        darkIndigo: "rgb(94, 92, 230)",
        darkPurple: "rgb(191, 90, 242)",
        darkPink: "rgb(255, 55, 95)",
        darkBrown: "rgb(172, 142, 104)",
        darkGray: "rgb(142, 142, 147)",
        darkGray2: "rgb(99, 99, 102)",
        darkGray3: "rgb(72, 72, 74)",
        darkGray4: "rgb(58, 58, 60)",
        darkGray5: "rgb(44, 44, 46)",
        darkGray6: "rgb(28, 28, 30)",
    }
    const defaultPropertyNames = {
        Bg0: "--color-bg-0",
        Bg1: "--color-bg-1",
        Bg2: "--color-bg-2",
        Theme1: "--color-theme-1",
        Theme2: "--color-theme-2",
        TextColor: "--color-text",
        TextColor1: "--color-text-1",
        TextColor2: "--color-text-2",
        TextColor3: "--color-text-3",
        LabelLink: "--color-label-link",
        Red: "--color-red",
        Orange: "--color-orange",
        Yellow: "--color-yellow",
        Green: "--color-green",
        Mint: "--color-mint",
        Teal: "--color-teal",
        Cyan: "--color-cyan",
        Blue: "--color-blue",
        Indigo: "--color-indigo",
        Purple: "--color-purple",
        Pink: "--color-pink",
        Brown: "--color-brown",
        Gray: "--color-gray",
        Gray2: "--color-gray-2",
        Gray3: "--color-gray-3",
        Gray4: "--color-gray-4",
        Gray5: "--color-gray-5",
        Gray6: "--color-gray-6",
    }

    //Functions
    function selectMode(mode:"light"|"dark") {
        if (applyOnBody) document.body.style.setProperty("background-color", backgroundColor)
        //avoid running default colors if explicitly required
        if (!customOnly) {
            for (const key in mergedPropertyNames) {
                if (Object.prototype.hasOwnProperty.call(mergedPropertyNames, key)) {
                    const property = mergedPropertyNames[key as keyof typeof mergedPropertyNames]
                    document.body.style.setProperty(property, mergedColors[`${mode}${key}`  as keyof typeof mergedColors]);
                }
            }
        }

        //only run through custom color properties if they're set
        if (Object.keys(customPropertyNames).length && !customColorErrors) {
            for (const key in customPropertyNames) {
                if (Object.prototype.hasOwnProperty.call(customPropertyNames, key)) {
                    const property = customPropertyNames[key]
                    document.body.style.setProperty(property, customColors[`${mode}${key}`]);
                }
            }
        }

        $themeStore.darkMode = mode === "dark"

    }

    function checkCustomColors(customPropertyNames:{[key: string]: string}) {
        customColorErrors = 0
        for (const key in customPropertyNames) {
            if (Object.prototype.hasOwnProperty.call(customPropertyNames, key)) {
                const propertyName = customPropertyNames[key];
                const lightValue = customColors[`light${key}`]
                const darkValue = customColors[`dark${key}`]
                if (!lightValue) {
                    console.warn("The light value for the property", propertyName, "is missing, it should be named", `light${key}`, "in the customColors prop")
                    customColorErrors++
                }
                if (!darkValue) {
                    console.warn("The dark value for the property", propertyName, "is missing, it should be named", `dark${key}`, "in the customColors prop")
                    customColorErrors++
                }
            }
        }
        if (customColorErrors && development) alert(`There${customColorErrors === 1 ? "'s a problem": ` are ${customColorErrors} problems`}  with your custom color properties so they won't be set, check the console`)
    }
    
    function detectOS() {
        let userAgent = navigator.userAgent;
        const platform = (navigator as any).userAgentData?.platform || navigator.platform;
        
        const macosPlatforms = ['macOS', 'Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
        const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
        const iosPlatforms = ['iPhone', 'iPad', 'iPod'];
        
        if (macosPlatforms.includes(platform)) return faIcons.faApple;
        if (iosPlatforms.includes(platform)) return faIcons.faMobile;
        if (windowsPlatforms.includes(platform)) return faIcons.faWindows;
        if (/Android/.test(userAgent)) return faIcons.faMobile;
        if (/Linux/.test(platform)) return faIcons.faLinux;

        //fallback for userAgentData or platform lack of support
        userAgent = navigator.userAgent.toLowerCase();

        if (userAgent.indexOf("win") > -1) return faIcons.faWindows;
        if (userAgent.indexOf("mac") > -1) return faIcons.faApple;
        if (userAgent.indexOf("linux") > -1) return faIcons.faLinux;
        if (userAgent.indexOf("android") > -1) return faIcons.faMobile;
        if (userAgent.indexOf("iphone") > -1 || userAgent.indexOf("ipad") > -1) return faIcons.faMobile;
        
        return faIcons.faDesktop;
    }
    function sanitizeSVG(svg: string): string {
        if (!svg) return svg
        svg = svg.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        if (!svg.trim().startsWith('<svg')) return '';
        return svg;
    }

    // Lyfecycle
    onMount(() => {
        //signal to the rest of the component that it's mounted on the browser (instead of importing browser from $app/environment)
        browser = true;

        //define what icon to show for the system
        osIcon = detectOS();

        //add event listener to dynamically switch the theme according to the system preference
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (event:MediaQueryListEvent) => {
            systemTheme = event.matches ? "dark" : "light";
        };

        mediaQuery.addEventListener('change', handleChange);
        systemTheme = mediaQuery.matches ? "dark" : "light";
        
        selectMode(preference === "system" ? systemTheme : preference);

        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    })

</script>
    
    
<div class="themeSelector" 
    bind:this={themeSelectorElement}
    bind:clientHeight={themeSelectorHeight}
    bind:clientWidth={themeSelectorWidth}
    style=" flex-direction: {osIcon === faIcons.faMobile || horizontal ? "row" : "column"};
            font-size: 0.6rem;
            {style}
            background-color: {backgroundColor};
            border: {border};
            --padding: {padding};
            "
>
    <div class="selectedBackground"
        style=" {selectedBackgroundTransform};
                height: {horizontal ? "100%" : "50%"};
                "
    ></div>
    <button on:click={() => {$themeStore.useSystemTheme = true}}
        class="systemTheme" class:selected={useSystemTheme}
    >
        {@html sanitizeSVG(osIcon)}
    </button>
    <div class="themeSwitch" style="flex-direction: {osIcon === faIcons.faMobile ? "column" : "row"}" >
        <button on:click={() => {$themeStore.useSystemTheme = false; selectMode("light")}}
            class="systemTheme" class:selected={!useSystemTheme && !darkMode}
        >
            {@html sanitizeSVG(faIcons.faSun)}
        </button>
        <button on:click={() => {$themeStore.useSystemTheme = false; selectMode("dark")}}
            class="systemTheme" class:selected={!useSystemTheme && darkMode}
        >
            {@html sanitizeSVG(faIcons.faMoon)}
        </button>
    </div>
</div>


<style>
    .themeSelector {
        width: -webkit-fit-content;
        width: -moz-fit-content;
        width: fit-content;
        position:relative;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
            -ms-flex-direction: column;
                flex-direction: column;
        -webkit-box-align: center;
            -ms-flex-align: center;
                align-items: center;
        -webkit-box-pack: center;
            -ms-flex-pack: center;
                justify-content: center;
        border-radius: 5px;
        font-size: 60%;
        overflow: hidden; 
    }
    .selectedBackground {
        pointer-events: none;
        position:absolute;
        top: 0;
        left: 0;
        width: 100%;
        -webkit-backdrop-filter: invert(100%);
        backdrop-filter: invert(100%);
        -webkit-transform-origin: top left;
            -ms-transform-origin: top left;
                transform-origin: top left;
        -webkit-transition: border-radius 0.2s ease-in-out, -webkit-transform 0.5s ease-out;
        transition: border-radius 0.2s ease-in-out, -webkit-transform 0.5s ease-out;
        -o-transition: transform 0.5s ease-out, border-radius 0.2s ease-in-out;
        transition: transform 0.5s ease-out, border-radius 0.2s ease-in-out;
        transition: transform 0.5s ease-out, border-radius 0.2s ease-in-out, -webkit-transform 0.5s ease-out;
    }
    .systemTheme {
        width: 100%;
    }
    .themeSwitch {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
            -ms-flex-align: center;
                align-items: center;
        -webkit-box-pack: space-evenly;
            -ms-flex-pack: space-evenly;
                justify-content: space-evenly;
        width:100%;
    }

    button {
        all:unset;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
            -ms-flex-pack: center;
                justify-content: center;
        -webkit-box-align: center;
            -ms-flex-align: center;
                align-items: center;
        border-radius: 5px;
        padding: var(--padding);
        -webkit-box-flex: 1;
            -ms-flex: 1;
                flex: 1;
        cursor: pointer;
    }
    :global(html *) {
        color: var(--color-text);
        -webkit-transition: color 0.5s ease-in-out, background-color 0.5s ease-in-out;
        -o-transition: color 0.5s ease-in-out, background-color 0.5s ease-in-out;
        transition: color 0.5s ease-in-out, background-color 0.5s ease-in-out;
    }
    
    div, button {
        -webkit-box-sizing:border-box;
        box-sizing:border-box;
    }
</style>