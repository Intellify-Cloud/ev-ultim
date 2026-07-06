# Image Compression & Sizing Guidelines

## Directory Structure
```
assets/
├── img/
│   ├── hero/          # Hero banner images
│   ├── team/          # Team member photos
│   ├── clients/       # Client logos
│   ├── portfolio/     # Portfolio/project images
│   └── textblock/     # Inline content images
```

## Image Formats

| Format | Use Case | Quality |
|--------|----------|---------|
| **WebP** (preferred) | All content images | 80% |
| **PNG** | Logos, images requiring transparency | Original |
| **JPEG** | Photos (fallback), large images | 80% |

## Sizing Guidelines

### Hero Images
- **Width**: 2400px max (retina: 4800px)
- **Height**: 800-1200px
- **Aspect Ratio**: 21:9 or 16:9
- **File Size Target**: < 200KB

### Team Photos
- **Width**: 450px
- **Height**: 450px
- **Aspect Ratio**: 1:1 (square)
- **File Size Target**: < 50KB

### Client Logos
- **Width**: 200-400px max (height proportional)
- **Aspect Ratio**: Varies
- **Background**: Transparent PNG preferred
- **File Size Target**: < 30KB

### Portfolio Images
- **Width**: 1200px max
- **Height**: 800px max
- **File Size Target**: < 150KB

### Inline Textblock Images
- **Width**: 600px max
- **Height**: Auto (proportional)
- **File Size Target**: < 80KB

## Optimization Process

The `npm run prebuild` script automatically:
1. Converts PNG/JPG to WebP (80% quality)
2. Resizes images wider than 2400px
3. Preserves original files as fallback

## Manual Optimization

```bash
# Generate favicons from favicon.png
npm run favicon:generate

# Optimize all images
npm run optimize-images
```

## Best Practices

- Use WebP for all new images
- Include `width` and `height` attributes on `<img>` tags
- Use `loading="lazy"` for below-fold images
- Provide descriptive `alt` text
- Optimize before committing (prebuild hook runs automatically)