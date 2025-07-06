# Course Library Typography System

A comprehensive typography hierarchy designed for consistent content presentation across the course library application.

## Typography Hierarchy

### Headings

| Variant | Size | Weight | Use Case | Example |
|---------|------|--------|----------|---------|
| **H1** | 40px / 2.5rem | Bold (700) | Primary page titles | Dashboard, Course Details |
| **H2** | 32px / 2rem | Semi-Bold (600) | Section titles | Course Library, Upload Guide |
| **H3** | 28px / 1.75rem | Semi-Bold (600) | Sub-sections | Guide Information, Requirements |
| **H4** | 24px / 1.5rem | Semi-Bold (600) | Card titles, dialog titles | Course Cards, Modal Headers |
| **H5** | 20px / 1.25rem | Semi-Bold (600) | Course titles, content headings | Individual Course Names |
| **H6** | 18px / 1.125rem | Semi-Bold (600) | Form section titles | Form Section Headers |

### Body Text & Labels

| Variant | Size | Weight | Use Case | Example |
|---------|------|--------|----------|---------|
| **Subtitle1** | 16px / 1rem | Medium (500) | Course descriptions | Section introductions, course summaries |
| **Subtitle2** | 14px / 0.875rem | Semi-Bold (600) | Metadata labels | Form labels, data labels (uppercase) |
| **Body1** | 16px / 1rem | Regular (400) | Primary content | Main content text, descriptions |
| **Body2** | 14px / 0.875rem | Regular (400) | Secondary content | Helper text, secondary descriptions |
| **Button** | 14px / 0.875rem | Semi-Bold (600) | Navigation text | Buttons, navigation links |
| **Caption** | 12px / 0.75rem | Regular (400) | Metadata | Timestamps, file sizes, helper text |
| **Overline** | 12px / 0.75rem | Bold (700) | Status indicators | Tags, status labels (uppercase) |

## Usage Examples

### Page Header
```tsx
<Box sx={{ mb: 4 }}>
  <Typography variant="h1" gutterBottom>
    Teacher Guide Dashboard
  </Typography>
  <Typography variant="subtitle1" color="text.secondary">
    Monitor guide status, approve submissions, and track course completion
  </Typography>
</Box>
```

### Course Card
```tsx
<Card>
  <CardContent>
    <Typography variant="overline" color="primary.main">
      Grade 3 • Mathematics
    </Typography>
    
    <Typography variant="h5" gutterBottom>
      Addition and Subtraction Fundamentals
    </Typography>
    
    <Typography variant="subtitle1" gutterBottom>
      Master basic arithmetic operations with hands-on activities
    </Typography>
    
    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
      <Box>
        <Typography variant="subtitle2" color="text.secondary">
          Duration
        </Typography>
        <Typography variant="body2">
          6 weeks
        </Typography>
      </Box>
    </Box>
  </CardContent>
</Card>
```

### Form Section
```tsx
<Box sx={{ mb: 3 }}>
  <Typography variant="h6" gutterBottom>
    Basic Information
  </Typography>
  
  <Box sx={{ mb: 2 }}>
    <Typography variant="subtitle2" gutterBottom>
      Guide Title
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Enter a descriptive title for your guide
    </Typography>
  </Box>
</Box>
```

### Statistics Card
```tsx
<Paper sx={{ p: 3, textAlign: 'center' }}>
  <Typography variant="h4" color="primary.main">
    156
  </Typography>
  <Typography variant="subtitle1" gutterBottom>
    Total Courses
  </Typography>
  <Typography variant="body2" color="text.secondary">
    Available in library
  </Typography>
</Paper>
```

### Status Indicators
```tsx
<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
  <Chip label="Approved" color="success" size="small" />
  <Typography variant="caption" color="text.secondary">
    Last updated: March 15, 2024
  </Typography>
</Box>
```

## Responsive Behavior

The typography system includes responsive breakpoints:

- **H1**: 40px on desktop, 32px on mobile
- **H2**: 32px on desktop, 28px on mobile  
- **H3**: 28px on desktop, 24px on mobile
- **H4**: 24px on desktop, 20px on mobile

Other variants remain consistent across breakpoints for optimal readability.

## Best Practices

### Do's ✅

- **Use H1 for main page titles only** - Each page should have one clear H1 heading
- **Follow the hierarchy consistently** - Don't skip heading levels (H2 to H4)
- **Use subtitle2 for all form labels** - Maintains consistent form styling
- **Apply overline for status indicators** - Creates clear visual hierarchy for tags
- **Use consistent spacing** - Apply `gutterBottom` prop for consistent vertical rhythm
- **Leverage theme colors** - Use `color="text.secondary"` for supporting text

### Don'ts ❌

- **Don't use hardcoded font sizes** - Always use typography variants
- **Don't mix font weights inconsistently** - Stick to the defined weights in each variant
- **Don't use H1 multiple times per page** - Can confuse screen readers and SEO
- **Don't override colors unless necessary** - Use the theme colors for consistency
- **Don't use deprecated Material-UI props** - Use `variant` instead of `component` for semantic HTML

## Color Usage

The typography system uses these semantic colors:

- **Primary text**: `#424242` (default for headings and body text)
- **Secondary text**: `#757575` (for supporting text and metadata)
- **Theme colors**: Use `color="primary.main"`, `color="text.secondary"`, etc.

## Implementation Notes

### Font Loading
The system uses the Roboto font family with fallbacks:
```css
fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
```

### Letter Spacing
Optimized letter spacing for each variant:
- **Large headings**: Slight negative spacing (-0.02em, -0.01em)
- **Body text**: Slight positive spacing (0.01em)
- **Labels/tags**: Increased spacing (0.02em, 0.08em)

### Line Heights
Carefully chosen line heights for optimal readability:
- **Headings**: 1.2-1.4 for tight, impactful text
- **Body text**: 1.5-1.6 for comfortable reading
- **UI elements**: 1.4 for compact interface text

## Accessibility

The typography system follows WCAG guidelines:

- **Sufficient color contrast** - All text meets minimum contrast ratios
- **Proper heading hierarchy** - Semantic HTML structure for screen readers
- **Readable font sizes** - Minimum 12px for all text
- **Responsive scaling** - Text adapts to different screen sizes

## Testing

Visit `/typography-demo` to see all typography variants in action and test the system across different contexts.

## Migration Guide

To update existing components:

1. **Replace hardcoded font sizes** with typography variants
2. **Update font weights** to use theme-based weights
3. **Standardize form labels** to use `subtitle2`
4. **Apply consistent spacing** with `gutterBottom` prop
5. **Use semantic colors** from the theme palette

Example migration:
```tsx
// Before
<Typography style={{ fontSize: '24px', fontWeight: 'bold' }}>
  Course Title
</Typography>

// After
<Typography variant="h4" gutterBottom>
  Course Title
</Typography>
``` 