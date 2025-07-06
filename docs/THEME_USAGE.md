# Theme Usage Guide for mohitp.me

Your color system is set up using Tailwind CSS v4's new `@theme` directive with OKLCH color values for better color accuracy and future-proofing. The theme is managed by `next-themes` with proper SSR support.

## Available Colors

### Tailwind Utilities (via @theme)
These colors are available as standard Tailwind utilities:

```html
<!-- Brand colors as Tailwind utilities -->
<div class="bg-brand-bg-light text-brand-text-light">Light mode</div>
<div class="bg-brand-bg-dark text-brand-text-dark">Dark mode</div>
<a href="#" class="text-brand-link-light hover:text-brand-link-hover-light">Light mode link</a>
<a href="#" class="text-brand-link-dark hover:text-brand-link-hover-dark">Dark mode link</a>
```

### Custom Theme-Aware Utilities
These automatically switch between light/dark based on system preference or manual toggle:

```html
<!-- Theme-aware utilities -->
<div class="bg-theme text-theme">Auto-switching background and text</div>
<div class="bg-theme-card">Card background</div>
<p class="text-theme-alt">Alternative text color</p>
<a href="#" class="text-theme-link">Auto-switching link</a>
```

### CSS Custom Properties
For use in custom CSS or inline styles:

```css
/* Available CSS variables */
--theme-bg
--theme-text
--theme-alt-text
--theme-link
--theme-link-hover
--theme-card
--theme-border

/* Example usage */
.my-component {
  background-color: var(--theme-bg);
  color: var(--theme-text);
  border-color: var(--theme-border);
}
```

## Theme System

Your theme system uses `next-themes` with **system preference as default** (not dark mode):

1. **System** (default): Follows user's OS preference
2. **Light Mode**: Manual override to light theme
3. **Dark Mode**: Manual override to dark theme

### Theme Behavior:
- **Default**: Follows system preference (light/dark based on OS)
- **Manual override**: Use theme toggle to force light or dark mode
- **Persistence**: Theme choice is saved in localStorage

### Manual Theme Control:
```html
<!-- Force light mode -->
<html class="light">

<!-- Force dark mode -->
<html class="dark">

<!-- Use system preference (default) -->
<html> <!-- no class = respects system preference -->
```

### Theme Provider Configuration:
```tsx
// In your providers.tsx
<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
  {children}
</ThemeProvider>
```

## Color Values

### Dark Mode
- Background: `oklch(0.1689 0.0021 286.18)` - Very dark blue-gray
- Text: `oklch(0.994 0 0)` - Near white
- Alt Text: `oklch(0.683 0 0)` - Light gray
- Card: `oklch(0.1689 0.0021 286.18)` - Same as background
- Link: `oklch(0.994 0 0)` - Near white
- Link Hover: `oklch(0.8707 0.1325 82.74)` - Light orange-yellow
- Border: `oklch(0.5 0 0 / 0.25)` - Semi-transparent gray

### Light Mode
- Background: `oklch(1 0 0)` - Pure white
- Text: `oklch(0 0 0)` - Pure black  
- Alt Text: `oklch(0.5484 0.0087 61.34)` - Medium gray with slight warmth
- Card: `oklch(1 0 0)` - Same as background (white)
- Link: `oklch(0.5582 0.2429 265.36)` - Blue-purple
- Link Hover: `oklch(0.4582 0.2829 265.36)` - Darker blue-purple
- Border: `oklch(0.5 0 0 / 0.28)` - Semi-transparent gray (slightly more opaque)

## Available Utility Classes

### Background Utilities
```html
<div class="bg-theme">Theme-aware background</div>
<div class="bg-theme-card">Card background</div>
```

### Text Utilities
```html
<p class="text-theme">Primary text</p>
<p class="text-theme-alt">Secondary text</p>
<a href="#" class="text-theme-link">Theme-aware link</a>
<a href="#" class="text-theme-link hover:text-theme-link-hover">Link with hover</a>
```

### Border Utilities
```html
<div class="border border-theme-alt">Border with theme-aware color</div>
<div class="border-theme-link-hover">Border with link hover color</div>
```

### Special Utilities
```html
<nav class="glass-nav">Glassmorphism navigation</nav>
```

## Font Utilities

Your project includes extensive font utilities for the Bogue font family:

```html
<!-- Font families -->
<div class="font-bogue">Bogue font family</div>
<div class="font-saprona">Saprona font family</div>

<!-- Bogue font weights and styles -->
<div class="font-bogue-thin">Bogue Thin (100)</div>
<div class="font-bogue-thin-italic">Bogue Thin Italic</div>
<div class="font-bogue-light">Bogue Light (300)</div>
<div class="font-bogue-light-italic">Bogue Light Italic</div>
<div class="font-bogue-regular">Bogue Regular (400)</div>
<div class="font-bogue-italic">Bogue Italic</div>
<div class="font-bogue-medium">Bogue Medium (500)</div>
<div class="font-bogue-medium-italic">Bogue Medium Italic</div>
<div class="font-bogue-semibold">Bogue Semibold (600)</div>
<div class="font-bogue-semibold-italic">Bogue Semibold Italic</div>
<div class="font-bogue-bold">Bogue Bold (700)</div>
<div class="font-bogue-bold-italic">Bogue Bold Italic</div>
<div class="font-bogue-extrabold">Bogue Extrabold (800)</div>
<div class="font-bogue-extrabold-italic">Bogue Extrabold Italic</div>
<div class="font-bogue-black">Bogue Black (900)</div>
<div class="font-bogue-black-italic">Bogue Black Italic</div>
```

## Example Component Usage

```jsx
// React component example
export default function Card({ children }) {
  return (
    <div className="bg-theme-card p-6 rounded-lg shadow-md border border-theme-alt">
      <h2 className="text-theme font-bogue-bold text-xl mb-4">Card Title</h2>
      <p className="text-theme-alt font-saprona">{children}</p>
      <a href="#" className="text-theme-link hover:text-theme-link-hover mt-4 inline-block transition-colors">
        Learn more
      </a>
    </div>
  );
}

// Navigation with glassmorphism effect
export default function Navigation() {
  return (
    <nav className="glass-nav p-4 fixed top-0 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-theme font-bogue-bold text-lg">mohitp.me</h1>
        <div className="flex space-x-4">
          <a href="#" className="text-theme-link hover:text-theme-link-hover">About</a>
          <a href="#" className="text-theme-link hover:text-theme-link-hover">Work</a>
          <a href="#" className="text-theme-link hover:text-theme-link-hover">Contact</a>
        </div>
      </div>
    </nav>
  );
}
```

## Benefits of This Approach

1. **System-first design**: Respects user's OS preference by default
2. **Future-proof**: Uses OKLCH color space for better color accuracy
3. **Flexible**: Supports system preference, manual light/dark override
4. **Performant**: Colors are processed at build time by Tailwind
5. **Maintainable**: Centralized color definitions with CSS custom properties
6. **Accessible**: Proper contrast ratios maintained across themes
7. **SSR-friendly**: Uses next-themes for proper hydration
8. **Smooth transitions**: Built-in color transitions for theme changes

## Theme Toggle Component

Your `ThemeToggle` component supports two modes with smooth animations:
- **Light**: Manual light mode override
- **Dark**: Manual dark mode override
- **System**: Follows OS preference (default)

The component uses `next-themes` and includes:
- Smooth sliding animation
- Proper icons (Sun/Moon)
- Loading state prevention
- Accessibility support
- Hover effects

```jsx
import ThemeToggle from '@/components/theme-toggle'

// Usage in your layout or header
<ThemeToggle />
```

### Theme Toggle Implementation:
```tsx
"use client"
import { useTheme } from "next-themes"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }
  
  // ... component implementation
}
```

## Customization

To modify colors, update the values in the `@theme` block in `globals.css`. The OKLCH format is:
- First value: Lightness (0-1)
- Second value: Chroma (0-0.4 typically)  
- Third value: Hue (0-360 degrees)

### Adding New Colors:
```css
@theme {
  /* Add your custom colors */
  --color-brand-accent: oklch(0.7 0.2 120);
  --color-brand-accent-hover: oklch(0.8 0.25 120);
}

/* Then create CSS custom properties */
:root {
  --theme-accent: var(--color-brand-accent);
  --theme-accent-hover: var(--color-brand-accent-hover);
}

/* And utility classes */
@layer utilities {
  .bg-theme-accent {
    background-color: var(--theme-accent);
  }
  
  .text-theme-accent {
    color: var(--theme-accent);
  }
}
```

## Performance Optimizations

Your theme system includes several performance optimizations:

1. **Reduced motion support**: Respects `prefers-reduced-motion`
2. **GPU acceleration**: Uses `transform3d` and `backface-visibility`
3. **Smooth font rendering**: Antialiasing and text rendering optimization
4. **Efficient transitions**: Only animates necessary properties
5. **Build-time processing**: Colors processed by Tailwind at build time

## Accessibility Features

- **High contrast ratios**: Carefully chosen colors for accessibility
- **Focus indicators**: Proper focus states with `focus-visible`
- **Reduced motion**: Respects user motion preferences
- **Semantic HTML**: Proper ARIA labels and semantic structure
- **Keyboard navigation**: Full keyboard accessibility support

## Migration Notes

If upgrading from an older version:

1. The theme system now defaults to **system preference** instead of dark mode
2. Link colors have been updated in dark mode for better contrast
3. Border utilities have been added for better visual separation
4. Font utilities now include extensive Bogue font family support
5. Glassmorphism effects are available for navigation elements
