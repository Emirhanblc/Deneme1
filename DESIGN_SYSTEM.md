# Visual Design System - Quick Reference

## 🎨 Color Palette

### Primary (Teal - DevOps Professional)

```
50:  #f0fdfa  - Lightest backgrounds
100: #ccfbf1  - Badge backgrounds
400: #2dd4bf  - Accent highlights
500: #14b8a6  - Primary brand color
600: #0d9488  - Primary interactive (buttons, links)
700: #0f766e  - Primary hover states
900: #134e4a  - Dark gradients
```

### Neutral (Professional Gray Scale)

```
50:  #fafafa  - Light backgrounds
100: #f5f5f5  - Card backgrounds
200: #e5e5e5  - Borders
600: #525252  - Secondary text
800: #262626  - Body text
900: #171717  - Headings
950: #0a0a0a  - Code blocks
```

---

## 📐 Typography Scale

### Font Families

```css
Headings: DM Sans (font-heading)
Body:     Inter (default)
Code:     JetBrains Mono (font-mono)
```

### Size Scale (Responsive)

```css
/* Headings */
h1: text-4xl → text-5xl → text-6xl  (36px → 48px → 60px)
h2: text-3xl → text-4xl → text-5xl  (30px → 36px → 48px)
h3: text-2xl → text-3xl → text-4xl  (24px → 30px → 36px)
h4: text-xl → text-2xl              (20px → 24px)

/* Body */
Base:  text-base   (16px)
Large: text-lg     (18px)
XL:    text-xl     (20px)
2XL:   text-2xl    (24px)

/* Small */
Small: text-sm     (14px)
XS:    text-xs     (12px)
```

### Line Heights

```css
tight:          1.25  - Headings
normal:         1.5   - Default
relaxed:        1.625 - Body text
relaxed-plus:   1.75  - Article content (custom)
```

### Font Weights

```css
regular:   400
medium:    500
semibold:  600
bold:      700
```

---

## 🎯 Icon System (Lucide React)

### DevOps/System Icons

```javascript
import {
  Server, // Backend, infrastructure
  Shield, // Security
  Network, // Networking
  Terminal, // Command line
  GitBranch, // Version control
  Github, // Repository links
  Clock, // Time/duration
  Calendar, // Dates
  Mail, // Contact
  ArrowRight, // Navigation
  Zap, // Speed/performance
  CheckCircle, // Completed status
  Lightbulb, // Planning status
} from 'lucide-react';
```

### Usage Pattern

```jsx
<Shield className="w-5 h-5 text-primary-600" />
```

---

## 🎬 Animations

### Keyframes

```css
/* Fade In */
@keyframes fadeIn {
  0%:   opacity: 0
  100%: opacity: 1
}
Duration: 0.5s ease-out

/* Slide Up */
@keyframes slideUp {
  0%:   translateY(10px), opacity: 0
  100%: translateY(0), opacity: 1
}
Duration: 0.5s ease-out

/* Scale In */
@keyframes scaleIn {
  0%:   scale(0.95), opacity: 0
  100%: scale(1), opacity: 1
}
Duration: 0.3s ease-out

/* Grid Pulse */
@keyframes gridPulse {
  0%, 100%: opacity: 0.02
  50%:      opacity: 0.05
}
Duration: 4s ease-in-out infinite
```

### Hover Animations

```css
/* Cards */
hover:-translate-y-2
hover:shadow-2xl
transition-all duration-300

/* Buttons */
hover:-translate-y-0.5
hover:shadow-lg
transition-all duration-200

/* Icons/Arrows */
group-hover:translate-x-1
transition-transform

/* Tech Badges */
hover:scale-105
hover:bg-primary-600
```

### Staggered Delays

```jsx
style={{ animationDelay: `${index * 100}ms` }}
```

---

## 🧩 Component Classes

### Cards

```css
.card-modern {
  rounded-2xl
  border border-neutral-200
  bg-white
  p-6 → p-8
  shadow-sm → shadow-2xl (hover)
  -translate-y-1 → -translate-y-2 (hover)
  transition-all duration-300
}
```

### Buttons

```css
/* Primary */
.btn-primary {
  bg-primary-600 → bg-primary-700 (hover)
  text-white
  font-semibold
  px-6 py-3
  rounded-lg → rounded-xl
  shadow-lg
  hover:-translate-y-0.5
  focus:ring-2 focus:ring-primary-500
}

/* Secondary */
.btn-secondary {
  border-2 border-primary-600
  text-primary-600
  hover:bg-primary-50
}
```

### Badges

```css
/* Category Badge */
.badge-modern {
  inline-flex items-center gap-1.5
  px-3 py-1
  rounded-full
  text-xs font-medium
  bg-primary-100 text-primary-700
}

/* Tech Stack Badge */
.tech-badge {
  inline-flex items-center gap-1.5
  px-2.5 py-1
  rounded-md
  text-xs font-mono font-medium
  bg-neutral-900 text-neutral-100
  hover:bg-primary-600 hover:scale-105
  transition-all
}
```

### Code Blocks

```css
/* Block Code */
.code-block {
  rounded-xl
  bg-neutral-950
  p-6
  border border-neutral-800
  overflow-x-auto
}

/* Inline Code */
.code-inline {
  font-mono text-sm
  px-1.5 py-0.5
  rounded
  bg-neutral-100 text-primary-700
  border border-neutral-200
}
```

---

## 📱 Responsive Breakpoints

```css
/* Tailwind Default */
sm:  640px   - Small tablets
md:  768px   - Tablets
lg:  1024px  - Desktop
xl:  1280px  - Large desktop
2xl: 1536px  - Extra large
```

### Grid Patterns

```jsx
/* 1 → 2 → 3 columns */
grid-cols-1 md:grid-cols-2 lg:grid-cols-3

/* 1 → 2 columns (blog/projects) */
grid-cols-1 md:grid-cols-2

/* Gap responsive */
gap-6 md:gap-8
```

### Spacing Scale

```jsx
/* Vertical spacing */
py-16 → py-20  - Section padding
mb-12 → mb-16  - Section margins
gap-6 → gap-8  - Grid gaps

/* Horizontal spacing */
px-4 sm:px-6 lg:px-8  - Container padding
```

---

## 🎨 Background Patterns

### Animated Grid

```jsx
<div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px] animate-grid-pulse" />
```

### Gradient Overlays

```jsx
/* Hero gradients */
bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950

/* Bottom fade */
bg-gradient-to-t from-neutral-950 via-transparent to-transparent

/* Card gradients */
bg-gradient-to-br from-white via-neutral-50 to-white
```

---

## 🔍 Focus States

### Accessibility

```css
focus:outline-none
focus:ring-2
focus:ring-primary-500
focus:ring-offset-2
```

### Interactive States

```css
/* Links */
hover:text-primary-700
hover:underline

/* Buttons */
active:scale-95
disabled:opacity-50 disabled:cursor-not-allowed
```

---

## 📏 Layout Constraints

### Content Width

```css
/* Full width container */
max-w-7xl mx-auto

/* Reading width */
max-w-3xl mx-auto  - Articles, descriptions

/* Medium width */
max-w-5xl mx-auto  - Forms, features
```

### Optimal Line Length

```css
max-width: 65ch;  - Paragraphs (via p styling)
```

---

## 🎯 Status Colors

### Project/Feature Status

```javascript
// Completed
bg-green-100 text-green-800
<CheckCircle className="w-3.5 h-3.5" />

// Active/In Progress
bg-blue-100 text-blue-800
<Clock className="w-3.5 h-3.5" />

// Planning
bg-yellow-100 text-yellow-800
<Lightbulb className="w-3.5 h-3.5" />
```

---

## 🚀 Quick Implementation Examples

### Hero Section with Animated Grid

```jsx
<section className="relative overflow-hidden bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 py-24">
  <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px] animate-grid-pulse" />
  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
  <div className="relative max-w-5xl mx-auto text-center">{/* Content */}</div>
</section>
```

### Card with Icon Badge

```jsx
<article className="group rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
  <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-primary-50 text-primary-600">
    <Shield className="w-5 h-5" />
    <span className="text-xs font-mono font-semibold uppercase tracking-wider">
      Security
    </span>
  </div>
  {/* Card content */}
</article>
```

### Tech Stack Badges

```jsx
<div className="flex flex-wrap gap-3">
  <span className="tech-badge">
    <Server className="w-3.5 h-3.5" />
    Kubernetes
  </span>
  <span className="tech-badge">
    <Terminal className="w-3.5 h-3.5" />
    Docker
  </span>
</div>
```

### CTA Button with Icon

```jsx
<Link
  href="/blog"
  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary-600 text-white font-semibold shadow-lg hover:bg-primary-700 hover:shadow-xl hover:-translate-y-0.5 transition-all group"
>
  Blog Yazıları
  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
</Link>
```

---

## ✅ Checklist for New Pages

When creating new pages, ensure:

- [ ] Font-heading class on all h1-h4 elements
- [ ] Leading-relaxed-plus on body text
- [ ] Lucide icons (not inline SVGs)
- [ ] Tech-badge class for technology labels
- [ ] Card-modern class for card containers
- [ ] Animate-slide-up with staggered delays
- [ ] Hover states (-translate-y-2 for cards)
- [ ] Focus rings on interactive elements
- [ ] Responsive grid (md:grid-cols-2 lg:grid-cols-3)
- [ ] Proper color contrast (neutral-900 on white)
- [ ] Max-width constraints (max-w-7xl)
- [ ] Smooth transitions (duration-200/300)

---

**Last Updated:** November 9, 2025  
**Build Status:** ✅ Passing  
**Bundle Impact:** None (87.6 kB unchanged)
