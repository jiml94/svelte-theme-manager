# svelte-theme-manager

A versatile Svelte component for effortlessly managing dark/light modes and custom color themes in your Svelte applications.

![ThemeSwitch.svelte](https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWVzbm9tOG5yOGdvbmxlMTVpcWR3YTN0a3UzOW1yeTBheGU5dDFneiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l4utfwBWFRv2rjxB99/giphy.gif)

[![npm version](https://badge.fury.io/js/svelte-theme-manager.svg)](https://www.npmjs.com/package/svelte-theme-manager)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- Easy-to-use theme switch component
- Smooth transitions between dark and light modes
- System theme detection and synchronization
- Customizable color palette and CSS property names
- Support for custom-only themes
- Multiple instances stay synced across your app
- No dependencies

## Installation

```bash
npm install svelte-theme-manager
```

## Basic Usage

```svelte
<script>
  import ThemeSwitch from 'svelte-theme-manager';
</script>

<ThemeSwitch />
```

## Advanced Usage

### Custom Colors and CSS Property Names

You can customize the default color palette and CSS property names:

```svelte
<script>
  import ThemeSwitch from 'svelte-theme-manager';

  let colors = {
    lightBg0: "#f0f0f0",
    lightBg1: "#ffffff",
    darkBg0: "#1a1a1a",
    darkBg1: "#2c2c2c",
    // ... add more custom colors
  };

  let propertyNames = {
    Bg0: "--custom-bg-0",
    Bg1: "--custom-bg-1",
    // ... add more custom property names
  };
</script>

<ThemeSwitch {colors} {propertyNames} />
```

### Custom-Only Mode

You can use only custom colors and properties:

```svelte
<script>
  import ThemeSwitch from 'svelte-theme-manager';

  let customOnly = true;
  let customColors = {
    lightCustomColor0: "#e0e0e0",
    darkCustomColor0: "#303030",
    // ... add more custom colors
  };

  let customPropertyNames = {
    CustomColor0: '--my-custom-color',
    // ... add more custom property names
  };
</script>

<ThemeSwitch {customOnly} {customColors} {customPropertyNames} />
```

### Styling Options

You can customize the appearance of the ThemeSwitch component:

```svelte
<script>
  import ThemeSwitch from 'svelte-theme-manager';
</script>

<ThemeSwitch 
  fontSize="0.8rem"
  padding="8px"
  backgroundColor="var(--my-bg-color)"
  border="2px solid #ccc"
  horizontal={true}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fontSize` | `string` | `"0.6rem"` | Size of the icons |
| `padding` | `string` | `calc(fontSize / 3)` | Padding of each option |
| `backgroundColor` | `string` | `'var(--color-bg-1)'` | Background color CSS property |
| `applyOnBody` | `boolean` | `true` | Apply background color to body |
| `horizontal` | `boolean` | `false` | Horizontal layout of options |
| `preference` | `"light" \| "dark" \| "system"` | `"system"` | Default theme preference |
| `border` | `string` | `"solid 1px var(--color-text)"` | Border style of the switch |
| `style` | `string` | `""` | Custom inline style |
| `colors` | `object` | `{}` | Custom color palette |
| `propertyNames` | `object` | `{}` | Custom CSS property names |
| `customOnly` | `boolean` | `false` | Use only custom colors and properties |
| `customColors` | `object` | `{}` | Custom color values |
| `customPropertyNames` | `object` | `{}` | Custom CSS property names |

## Default Colors and Property Names

The component comes with a set of default colors and property names. You can override these by passing your own `colors` and `propertyNames` objects. For a full list of default values, please refer to the source code.

## System Theme Detection

The component automatically detects the user's system theme preference and adjusts accordingly. You can override this behavior by setting the `preference` prop to `"light"` or `"dark"`.

## Reactive Updates

The theme state is managed using a Svelte store, allowing for reactive updates across your entire application. You can access the current theme state in your components:

```svelte
<script>
  import { themeStore } from 'svelte-theme-manager';
</script>

<p>Current theme: {$themeStore.darkMode ? 'Dark' : 'Light'}</p>
<p>Using system theme: {$themeStore.useSystemTheme ? 'Yes' : 'No'}</p>
```

## Browser Compatibility

This component uses modern CSS features like `backdrop-filter`. Make sure to check browser compatibility and provide appropriate fallbacks if needed.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## About

Created by [um-dev](https://urmoov.dev)