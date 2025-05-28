/**
 * Image processing functionality for the Mirror application
 */

import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { isImageFile } from './utils.js';

/**
 * Process all images in the input directory and save mirrored versions to the output directory
 * @param {string} inputDir - Path to the input directory
 * @param {string} outputDir - Path to the output directory
 * @returns {Object} Statistics about processed files
 */
export async function processImages(inputDir, outputDir) {
  const stats = {
    processed: 0,
    skipped: 0,
    errors: 0
  };

  try {
    // Read all files in the input directory
    const files = await fs.readdir(inputDir);
    
    // Process each file
    for (const file of files) {
      const inputPath = path.join(inputDir, file);
      
      // Get file stats to check if it's a file or directory
      const fileStat = await fs.stat(inputPath);
      
      // Skip directories
      if (fileStat.isDirectory()) {
        continue;
      }
      
      // Skip non-image files
      if (!isImageFile(inputPath)) {
        stats.skipped++;
        continue;
      }
      
      try {
        // Process the image
        await mirrorImage(inputPath, path.join(outputDir, file));
        stats.processed++;
      } catch (error) {
        console.error(`Error processing ${file}: ${error.message}`);
        stats.errors++;
      }
    }
    
    return stats;
  } catch (error) {
    throw new Error(`Failed to process images: ${error.message}`);
  }
}

/**
 * Mirror an image horizontally and save it to the output path
 * @param {string} inputPath - Path to the input image
 * @param {string} outputPath - Path to save the mirrored image
 */
async function mirrorImage(inputPath, outputPath) {
  try {
    // Load the image
    const image = sharp(inputPath);
    
    // Get image metadata
    const metadata = await image.metadata();
    
    // Flip the image horizontally
    const flippedImage = await image.flop();
    
    // Save the flipped image
    await flippedImage.toFile(outputPath);
    
    console.log(`Mirrored: ${path.basename(inputPath)}`);
  } catch (error) {
    throw new Error(`Failed to mirror image: ${error.message}`);
  }
}
