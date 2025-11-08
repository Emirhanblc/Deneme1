const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// Configuration
const IMAGE_DIRS = ["assets/images", "assets/img"];
const OUTPUT_DIR = "assets/images/optimized";
const QUALITY = 80;
const MAX_WIDTH = 1200;

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Supported image formats
const SUPPORTED_FORMATS = [".jpg", ".jpeg", ".png", ".webp"];

// Find all images in directories
function findImages(directories) {
  const images = [];

  directories.forEach((dir) => {
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir, { recursive: true });

    files.forEach((file) => {
      const ext = path.extname(file).toLowerCase();
      if (SUPPORTED_FORMATS.includes(ext)) {
        images.push(path.join(dir, file));
      }
    });
  });

  return images;
}

// Optimize a single image
async function optimizeImage(inputPath) {
  try {
    const ext = path.extname(inputPath).toLowerCase();
    const name = path.basename(inputPath, ext);
    const outputPath = path.join(OUTPUT_DIR, `${name}.webp`);

    // Skip if already optimized
    if (fs.existsSync(outputPath)) {
      console.log(`✓ Already optimized: ${name}`);
      return;
    }

    const image = sharp(inputPath);
    const metadata = await image.metadata();

    // Resize if too large
    const resizeOptions = {};
    if (metadata.width > MAX_WIDTH) {
      resizeOptions.width = MAX_WIDTH;
    }

    // Convert to WebP format
    await image
      .resize(resizeOptions)
      .webp({ quality: QUALITY })
      .toFile(outputPath);

    const originalSize = fs.statSync(inputPath).size;
    const optimizedSize = fs.statSync(outputPath).size;
    const savings = (
      ((originalSize - optimizedSize) / originalSize) *
      100
    ).toFixed(1);

    console.log(`✓ Optimized: ${name} (${savings}% smaller)`);
  } catch (error) {
    console.error(`✗ Failed to optimize ${inputPath}:`, error.message);
  }
}

// Main optimization function
async function optimizeAllImages() {
  console.log("🔍 Finding images to optimize...");

  const images = findImages(IMAGE_DIRS);

  if (images.length === 0) {
    console.log("📁 No images found to optimize");
    return;
  }

  console.log(`📸 Found ${images.length} images to optimize`);

  // Optimize images sequentially
  for (const image of images) {
    await optimizeImage(image);
  }

  console.log("🎉 Image optimization complete!");
}

// Run optimization
optimizeAllImages().catch(console.error);
