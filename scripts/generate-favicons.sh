#!/bin/bash

# Favicon Generator Script for mohitp.me
# This script helps create all required favicon and PWA icons

echo "🎨 Favicon Generator for mohitp.me"
echo "=================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo -e "${RED}❌ ImageMagick not found${NC}"
    echo "Please install ImageMagick to generate favicons:"
    echo "  macOS: brew install imagemagick"
    echo "  Ubuntu: sudo apt-get install imagemagick"
    echo "  Windows: Download from https://imagemagick.org/script/download.php"
    exit 1
fi

# Check if source image exists
if [ ! -f "public/me.jpg" ]; then
    echo -e "${RED}❌ Source image 'public/me.jpg' not found${NC}"
    echo "Please ensure you have a high-quality image at public/me.jpg"
    exit 1
fi

echo -e "${GREEN}✅ ImageMagick found${NC}"
echo -e "${GREEN}✅ Source image found${NC}"
echo ""

# Create favicon directory
mkdir -p public/icons

echo "🔧 Generating favicons..."
echo "========================"

# Generate different sizes
sizes=(16 32 48 64 96 128 192 256 512)

for size in "${sizes[@]}"; do
    echo "Generating ${size}x${size} icon..."
    convert public/me.jpg -resize ${size}x${size} public/icons/icon-${size}x${size}.png
done

# Generate specific favicon files
echo ""
echo "📱 Generating specific favicon files..."
echo "======================================="

# Standard favicon
convert public/me.jpg -resize 32x32 public/favicon-32x32.png
convert public/me.jpg -resize 16x16 public/favicon-16x16.png
convert public/me.jpg -resize 32x32 public/favicon.ico

# Apple touch icon
convert public/me.jpg -resize 180x180 public/apple-touch-icon.png

# Android Chrome icons
convert public/me.jpg -resize 192x192 public/android-chrome-192x192.png
convert public/me.jpg -resize 512x512 public/android-chrome-512x512.png

# PWA icons
convert public/me.jpg -resize 144x144 public/icons/icon-144x144.png
convert public/me.jpg -resize 152x152 public/icons/icon-152x152.png
convert public/me.jpg -resize 384x384 public/icons/icon-384x384.png

echo ""
echo -e "${GREEN}✅ All favicons generated successfully!${NC}"
echo ""
echo "📋 Generated files:"
echo "==================="
echo "• public/favicon.ico"
echo "• public/favicon-16x16.png"
echo "• public/favicon-32x32.png"
echo "• public/apple-touch-icon.png"
echo "• public/android-chrome-192x192.png"
echo "• public/android-chrome-512x512.png"
echo "• public/icons/icon-*.png (various sizes)"
echo ""
echo "🎯 Next steps:"
echo "=============="
echo "1. Review generated icons in public/ directory"
echo "2. Test favicon display in browser"
echo "3. Validate PWA manifest with Chrome DevTools"
echo "4. Consider optimizing icons for better quality"
echo ""
echo "💡 Pro tip: Use online favicon generators for even better results:"
echo "   • https://favicon.io/"
echo "   • https://realfavicongenerator.net/"
echo ""
echo "🚀 Your favicons are ready!"
