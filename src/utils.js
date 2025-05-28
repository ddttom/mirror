/**
 * Utility functions for the Mirror application
 */

import fs from 'fs/promises';
import path from 'path';

/**
 * Parse command line arguments
 * @param {string[]} args - Command line arguments
 * @returns {Object} Parsed arguments
 */
export function parseArgs(args) {
  const parsedArgs = {};
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === '--input' && i + 1 < args.length) {
      parsedArgs.input = args[++i];
    } else if (arg === '--output' && i + 1 < args.length) {
      parsedArgs.output = args[++i];
    }
  }
  
  return parsedArgs;
}

/**
 * Validate required arguments
 * @param {Object} args - Parsed arguments
 * @throws {Error} If required arguments are missing
 */
export function validateArgs(args) {
  if (!args.input) {
    throw new Error('Input directory is required (--input)');
  }
}

/**
 * Ensure a directory exists, create it if it doesn't
 * @param {string} dirPath - Directory path
 */
export async function ensureDirectoryExists(dirPath) {
  try {
    await fs.access(dirPath);
  } catch (error) {
    // Directory doesn't exist, create it
    await fs.mkdir(dirPath, { recursive: true });
  }
}

/**
 * Check if a file is an image based on its extension
 * @param {string} filePath - Path to the file
 * @returns {boolean} True if the file is an image
 */
export function isImageFile(filePath) {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.webp'];
  const ext = path.extname(filePath).toLowerCase();
  return imageExtensions.includes(ext);
}
