/**
 * Image processing functionality for the Mirror application
 */

import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { isImageFile, ensureDirectoryExists } from './utils.js';

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
    await processDirectoryRecursively(inputDir, outputDir, inputDir, stats);
    return stats;
  } catch (error) {
    throw new Error(`Failed to process images: ${error.message}`);
  }
}

/**
 * Recursively process a directory and all its subdirectories
 * @param {string} currentDir - Current directory being processed
 * @param {string} outputBaseDir - Base output directory
 * @param {string} inputBaseDir - Base input directory (for relative path calculation)
 * @param {Object} stats - Statistics object to update
 */
async function processDirectoryRecursively(currentDir, outputBaseDir, inputBaseDir, stats) {
  try {
    // Read all files and directories in the current directory
    const items = await fs.readdir(currentDir);
    
    // Process each item
    for (const item of items) {
      const currentPath = path.join(currentDir, item);
      
      // Get file stats to check if it's a file or directory
      const itemStat = await fs.stat(currentPath);
      
      if (itemStat.isDirectory()) {
        // Calculate the relative path from the input base directory
        const relativePath = path.relative(inputBaseDir, currentPath);
        const outputSubDir = path.join(outputBaseDir, relativePath);
        
        // Ensure the corresponding output subdirectory exists
        await ensureDirectoryExists(outputSubDir);
        
        // Recursively process the subdirectory
        await processDirectoryRecursively(currentPath, outputBaseDir, inputBaseDir, stats);
      } else {
        // It's a file, check if it's an image
        if (!isImageFile(currentPath)) {
          stats.skipped++;
          continue;
        }
        
        try {
          // Calculate the relative path and corresponding output path
          const relativePath = path.relative(inputBaseDir, currentPath);
          const outputPath = path.join(outputBaseDir, relativePath);
          
          // Ensure the output directory exists
          await ensureDirectoryExists(path.dirname(outputPath));
          
          // Process the image
          await mirrorImage(currentPath, outputPath);
          stats.processed++;
        } catch (error) {
          console.error(`Error processing ${item}: ${error.message}`);
          stats.errors++;
        }
      }
    }
  } catch (error) {
    throw new Error(`Failed to process directory ${currentDir}: ${error.message}`);
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
    
    // Show relative path for cleaner output
    const relativePath = path.relative(process.cwd(), inputPath);
    console.log(`Mirrored: ${relativePath}`);
  } catch (error) {
    throw new Error(`Failed to mirror image: ${error.message}`);
  }
}
