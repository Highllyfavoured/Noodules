# Noodules Design System

## Overview

Noodules features an award-winning design system with modern aesthetics, premium interactions, and an engaging user experience optimized for biomedical educators and students.

## Color Palette

### Primary Colors

- **Primary Blue**: `#2196F3` (214 94% 50%)
  - Used for main CTAs, highlights, and key interactions
  - Conveys trust, learning, and professionalism

- **Secondary Teal**: `#4FC3DC` (176 78% 48%)
  - Used for secondary actions and accents
  - Represents growth and discovery

- **Accent Purple**: `#7B68EE` (264 92% 62%)
  - Used for special highlights and interactive elements
  - Adds vibrancy and energy

### Neutral Colors

- **Background**: Pure white (`#FFFFFF`) / Deep navy (`#1A1D2E`) in dark mode
- **Foreground**: `#1A1D1F` / `#F8F9FA` in dark mode
- **Muted**: `#E7ECF0` / `#3A4556` in dark mode

### Semantic Colors

- **Destructive**: Red (`#EF4444`)
- **Success**: Green (integrated from chart palette)
- **Warning**: Amber (integrated from chart palette)

## Typography

### Font Family

- **Heading**: Inter (via Geist Sans)
- **Body**: Inter (via Geist Sans)
- **Monospace**: GeistMono (for code/technical content)

### Font Sizes & Weights

| Element | Size | Weight |
|---------|------|--------|
| H1 (Hero) | 3.75rem | 700 |
| H2 (Section) | 2rem | 700 |
| H3 (Card) | 1.25rem | 600 |
| H4 (Label) | 1rem | 600 |
| Body Large | 1.125rem | 400 |
| Body Normal | 1rem | 400 |
| Body Small | 0.875rem | 400 |
| Caption | 0.75rem | 400 |

## Design Patterns

### Card Components

All cards feature:
- Soft border with subtle color hint
- Background with slight transparency
- Hover state with:
  - Elevated shadow
  - Gradient background reveal
  - Border color shift to accent color
  - Smooth transition (300ms)

```tsx
<Card className="group p-6 border border-border bg-background hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
  {/* Content */}
</Card>
```

### Buttons

**Primary Button**:
```tsx
<Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white border-0">
  Action
</Button>
```

**Secondary Button**:
```tsx
<Button variant="outline" className="border-border hover:bg-muted bg-transparent">
  Secondary Action
</Button>
```

**Ghost Button**:
```tsx
<Button variant="ghost" className="hover:bg-muted">
  Link-like Action
</Button>
```

### Gradient Overlays

**Glow Effect**:
```tsx
<div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
```

**Icon Glow**:
```tsx
<div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-lg blur-md opacity-50 group-hover:opacity-100"></div>
```

**Text Gradient**:
```tsx
<h1 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
  Gradient Text
</h1>
```

### Progress Indicators

```tsx
<div className="w-full h-3 bg-muted rounded-full overflow-hidden border border-border/50">
  <div
    className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
    style={{ width: `${progress}%` }}
  />
</div>
```

## Animations

### Custom Keyframe Animations

**Float Animation** (3s loop):
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
}
```

**Glow Animation** (2s loop):
```css
@keyframes glow {
  0%, 100% { box-shadow: 0 0 20px rgba(33, 150, 243, 0.3); }
  50% { box-shadow: 0 0 40px rgba(33, 150, 243, 0.5); }
}
```

**Slide In Up** (0.5s):
```css
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Usage

```tsx
{/* Float animation */}
<div className="animate-float">Floating Element</div>

{/* Glow animation */}
<button className="animate-glow">Glowing Button</button>

{/* Slide in from top */}
<div className="animate-slide-in-down">Hero Content</div>
```

## Layout Patterns

### Hero Section

- Full viewport height (min-h-[90vh])
- Centered content with gradient backgrounds
- Layered blur effects for depth
- Staggered slide-in animations for elements

### Feature Grid

- Responsive: 1 column mobile, 2-3 columns tablet, 3-4 columns desktop
- Gap: 24px (gap-6)
- Hover effects on cards
- Gradient color hints matching content

### Navigation

- Sticky positioning (z-50)
- Backdrop blur for frosted glass effect
- Gradient logo icon
- Clean spacing and alignment

## Component Hierarchy

### Tier 1: Page Level
- Hero Section
- Feature Sections
- CTA Section
- Footer

### Tier 2: Section Level
- Card Grid
- Progress Tracker
- Statistics Panel
- Content Blocks

### Tier 3: Component Level
- Cards
- Buttons
- Icons
- Progress Bars
- Text Elements

## Accessibility

### Color Contrast
- Primary text on primary background: 4.5:1+ contrast
- Secondary text on background: 3:1+ contrast
- All interactive elements: keyboard accessible

### Typography
- Minimum font size: 12px (caption)
- Line height: 1.6 for body text
- Letter spacing: normal to slightly increased for headers

### Icons
- All icons paired with text labels
- Meaningful icon usage (not decorative)
- Proper ARIA labels where needed

## Responsive Design

### Breakpoints

```css
/* Mobile-first approach */
- Mobile: < 640px
- Tablet: 640px - 1024px (sm: and md:)
- Desktop: 1024px+ (lg: and xl:)
```

### Responsive Classes

```tsx
{/* Grid adjusts at breakpoints */}
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  
{/* Text sizes scale */}
<h1 className="text-4xl md:text-5xl lg:text-6xl">
  Responsive Heading
</h1>

{/* Spacing adjusts */}
<div className="p-4 md:p-6 lg:p-8">
  Content with responsive padding
</div>
```

## Dark Mode

The design system fully supports dark mode with:
- Reduced opacity of accent colors
- Lighter primary color (#2196F3 → lighter blue)
- Darker backgrounds with proper contrast
- Adjusted shadows and depths

Enable dark mode with: `<html className="dark">`

## Best Practices

### Do's ✓
- Use gradients for emphasis on primary actions
- Implement smooth transitions (300ms+)
- Maintain consistent spacing (8px grid)
- Use semantic color meanings
- Apply hover states to interactive elements
- Test accessibility with WCAG AA standard

### Don'ts ✗
- Don't overuse gradients on multiple elements
- Don't animate for more than 500ms without reason
- Don't mix too many accent colors in one view
- Don't ignore dark mode compatibility
- Don't reduce font sizes below 12px
- Don't skip alt text for images

## Performance Tips

- Use `will-change: transform` for animated elements
- Implement `prefers-reduced-motion` for animations
- Optimize images to reduce page weight
- Use CSS over JS for simple animations
- Leverage hardware acceleration with transforms

## Future Enhancements

- Animation presets library
- Advanced color theming system
- Micro-interaction library
- Component storybook
- Design tokens JSON export
