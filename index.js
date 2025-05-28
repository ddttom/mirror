#!/usr/bin/env node

/**
 * Mirror - A tool to flip images horizontally
 * 
 * Usage: node index.js --input <inputDir> [--output <outputDir>]
 */

import { processImages } from './src/imageProcessor.js';
import { parseArgs, validateArgs, ensureDirectoryExists } from './src/utils.js';
import path from 'path';
import fs from 'fs';

async function main() {
  try {
    // Parse command line arguments
    const args = parseArgs(process.argv.slice(2));
    
    // Validate required arguments
    validateArgs(args);
    
    // Set default output directory if not provided
    if (!args.output) {
      args.output = path.join(process.cwd(), 'output');
    }
    
    // Ensure input directory exists
    if (!fs.existsSync(args.input)) {
      throw new Error(`Input directory does not exist: ${args.input}`);
    }
    
    // Ensure output directory exists
    await ensureDirectoryExists(args.output);
    
    console.log(`Processing images from: ${args.input}`);
    console.log(`Saving mirrored images to: ${args.output}`);
    
    // Process all images in the input directory
    const result = await processImages(args.input, args.output);
    
    console.log(`Successfully processed ${result.processed} images`);
    if (result.skipped > 0) {
      console.log(`Skipped ${result.skipped} non-image files`);
    }
    if (result.errors > 0) {
      console.log(`Failed to process ${result.errors} files`);
    }
  } catch (error) {
    console.error('Error:', error.message);
    console.log('\nUsage: node index.js --input <inputDir> [--output <outputDir>]');
    process.exit(1);
  }
}

main();
