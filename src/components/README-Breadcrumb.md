# Breadcrumb Component Usage

## Overview
A reusable breadcrumb navigation component inspired by Indiaspora's design that automatically generates navigation paths based on the current route.

## Basic Usage

### 1. Automatic Breadcrumbs (Recommended)
```tsx
import React from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import useBreadcrumb from '../../hooks/useBreadcrumb';

const YourPage: React.FC = () => {
    const breadcrumbItems = useBreadcrumb();
    
    return (
        <div>
            <Breadcrumb items={breadcrumbItems} />
            {/* Your page content */}
        </div>
    );
};
```

### 2. Manual Breadcrumbs
```tsx
import React from 'react';
import Breadcrumb from '../../components/Breadcrumb';

const YourPage: React.FC = () => {
    const customBreadcrumbs = [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about-us' },
        { label: 'Custom Page', isActive: true }
    ];
    
    return (
        <div>
            <Breadcrumb items={customBreadcrumbs} />
            {/* Your page content */}
        </div>
    );
};
```

## Props

### Breadcrumb Component
- `items`: BreadcrumbItem[] - Array of breadcrumb items
- `className?`: string - Additional CSS classes

### BreadcrumbItem Interface
- `label`: string - Display text for the breadcrumb
- `href?`: string - Link URL (optional for active/last item)
- `isActive?`: boolean - Whether this is the current page

## Features

- ✅ Automatic route-based breadcrumb generation
- ✅ Responsive design
- ✅ Accessibility support (ARIA labels)
- ✅ Hover effects and transitions
- ✅ Customizable styling
- ✅ TypeScript support

## Styling

The component uses Tailwind CSS classes and follows the Indiaspora design pattern:
- Gray background with border
- Chevron separators
- Blue accent for active items
- Hover effects on links

## Route Label Customization

To customize route labels, edit the `routeLabels` object in `src/hooks/useBreadcrumb.tsx`:

```tsx
const routeLabels: Record<string, string> = {
  'your-route': 'Your Custom Label',
  // ... other mappings
};
```
