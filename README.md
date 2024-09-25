# svelte-theme-manager

Adding dark mode to your Svelte app is that easy, made by [`um-dev`](https://urmoov.dev).

A single page switch component with no dependecies can be added anywhere in your Svelte app and handles dark and light themes smoothly with optional reactive device synchronization and smooth transitions.
Allows you to customize dozens of default colors and their respective CSS property names if you already use some in your project!
You can also add completely different custom colors and/or any other global CSS properties you'd like to change whenever your theme switches. You can even disable the default options if you'd prefer


## Usage

#### With our default color CSS properties and pallete

```svelte
<script>
    import ThemeSwitch from ' svelte-theme-manager'
</script>

<!-- Place wherever you want -->
<ThemeSwitch><ThemeSwitch>
```
#### With your optional preferred colors and CSS property names 

```svelte
<script>
    import ThemeSwitch from ' svelte-theme-manager'

    let border = "none"
    let horizontal = true //more compact switch

    let colors = {
        lightBg0: "", // your highlight light theme background-color
        lightBg1: "", // your standard light theme background-color
        lightBg2: "", // your elevated light theme background-color
        lightTheme1: "", // your brands primary color on light mode
        lightTheme2: "", // your brands secondary color on light mode
        lightTextColor: "", // your main text color on light mode
        darkBg0: "", // your hightlight dark them background-color
        darkBg1: "", // your standard dark theme background-color
        darkBg2: "", // your your elevated dark them background-color
        darkTheme1: "", // your brands primary color on dark mode
        darkTheme2: "", // your brands secondary color on dark mode
        darkTextColor: "", // your main text color on dark mode
    }

    let propertyNames = {//the property names you use on your app for your
        Bg0: "", //  highlight background-color
        Bg1: "", // standard background-color
        Bg2: "", // elevated background-color
        Theme1: "", // brand's primary color
        Theme2: "", // brand's secondary color
        TextColor: "", // main text color
        TextColor1: "", // secondary text color
    }
</script>

<!-- Place wherever you want -->
<ThemeSwitch {colors} {propertyNames} {border} {horizontal}><ThemeSwitch>
```

#### With only your custom colors and CSS property names 

```svelte
<script>
    import ThemeSwitch from ' svelte-theme-manager'

    // don't use any of the preset colors nor properties
    let customOnly = true 

    // don't apply the theme standard background to the body
    let applyToBody = false

    let customColors = {
        lightCustomColor0: "", //custom color 0 for light theme
        lightCustomColor1: "", //custom color 1 for light theme
        darkCustomColor0: "", //custom color 0 for dark theme
        darkCustomColor1: "", //custom color 1 for dark theme
    }

    let customPropertyNames = {//the property names you use on your app for your
        CustomColor0: '', //CSS property name for the custom color 1
        CustomColor1: '', //CSS property name for the custom color 2
    }

    // Note that custom colors can have any label that will override the `colors` and `propertyNames` props
    // Every label on the `customPropertyNames` prop need two corresponding labels in the `customColors`,
    // one prepended by `light` and the other by `dark`, the component will alert about any mistake and
    // set a warning on the console explaining the mistake and how to correct it.
    // The component won't set custom colors until there are no mistakes in the 'custom' objects 

</script>

<!-- Place wherever you want -->
<ThemeSwitch {customOnly} {applyToBody} {customColors} {customPropertyNames}><ThemeSwitch>
```

## Installation

```bash
npm install svelte-theme-manager
```

## Props

```svelte
<script>
    export let fontSize:string = "0.6rem" //customize the size of the icons
    export let padding:string = `calc(${fontSize} / 3)` //customize the padding of each option
    export let backgroundColor:string = 'var(--color-bg-1)' //select which CSS property will be applied to the body if the `applyOnBody`prop is set to true
    export let applyOnBody:boolean = true //automatically applies the `backgroundColor` prop value to the body background if set to true
    export let horizontal:boolean = false //if set to true, places the 3 options side by side
    export let preference:"light" | "dark" | "system" = "system" //sets the default initial value
    export let border:string = "solid 1px var(--color-text)" //set a border around the switch
    export let style:string="" //custom inline stile for the switch
    export let colors:{ //all the default colors that can be customized
        lightBg0?: string,
        lightBg1?: string,
        lightBg2?: string,
        lightTheme1?: string,
        lightTheme2?: string,
        lightTextColor?: string,
        lightTextColor1?: string,
        lightTextColor2?: string,
        lightTextColor3?: string,
        lightLabelLink?: string,
        lightRed?: string,
        lightOrange?: string,
        lightYellow?: string,
        lightGreen?: string,
        lightMint?: string,
        lightTeal?: string,
        lightCyan?: string,
        lightBlue?: string,
        lightIndigo?: string,
        lightPurple?: string,
        lightPink?: string,
        lightBrown?: string,
        lightGray?: string,
        lightGray2?: string,
        lightGray3?: string,
        lightGray4?: string,
        lightGray5?: string,
        lightGray6?: string,
        darkBg0?: string,
        darkBg1?: string,
        darkBg2?: string,
        darkTheme1?: string,
        darkTheme2?: string,
        darkTextColor?: string,
        darkTextColor1?: string,
        darkTextColor2?: string,
        darkTextColor3?: string,
        darkLabelLink?: string,
        darkRed?: string,
        darkOrange?: string,
        darkYellow?: string,
        darkGreen?: string,
        darkMint?: string,
        darkTeal?: string,
        darkCyan?: string,
        darkBlue?: string,
        darkIndigo?: string,
        darkPurple?: string,
        darkPink?: string,
        darkBrown?: string,
        darkGray?: string,
        darkGray2?: string,
        darkGray3?: string,
        darkGray4?: string,
        darkGray5?: string,
        darkGray6?: string
    } = {}
    export let propertyNames:{ //all the default CSS properties that can be customized 
        Bg0?: string,
        Bg1?: string,
        Bg2?: string,
        Theme1?: string,
        Theme2?: string,
        TextColor?: string,
        TextColor1?: string,
        TextColor2?: string,
        TextColor3?: string,
        LabelLink?: string,
        Red?: string,
        Orange?: string,
        Yellow?: string,
        Green?: string,
        Mint?: string,
        Teal?: string,
        Cyan?: string,
        Blue?: string,
        Indigo?: string,
        Purple?: string,
        Pink?: string,
        Brown?: string,
        Gray?: string,
        Gray2?: string,
        Gray3?: string,
        Gray4?: string,
        Gray5?: string,
        Gray6?: string
    } = {}

    export let customOnly:boolean = false //if set to true, will only use the `customColors` and `customPropertyNames` props, if false it adds to the default values (overriding any clash)
    export let customPropertyNames:{[key: string]: string} = {} //sets the CSS property names for each key
    export let customColors:{[key: `light${string}` | `dark${string}`]: string} = {} //sets the light and dark value for each of the custom properties set above, each of the `customPropertyNames` keys must have two corresponding keys here: the same key prepended by `light` and another prepended by `dark`
</script>
```

## Default Values

```svelte
<script>
    let defaultColors = {
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
    let defaultPropertyNames = {
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
</script>
```