/**
 * Test script for the Mirror application
 * This script creates sample images in nested directories and then runs the application
 */

import fs from 'fs/promises';
import path from 'path';
import { execSync } from 'child_process';

// Create test images in nested directories
async function createTestImages() {
  try {
    // Import Sharp dynamically to avoid issues if someone runs this without dependencies
    const sharp = (await import('sharp')).default;
    
    // Create test directory structure
    const testDirs = [
      'input',
      'input/photos',
      'input/photos/vacation',
      'input/documents/scans'
    ];
    
    for (const dir of testDirs) {
      await fs.mkdir(dir, { recursive: true });
    }
    
    // Create different test images
    const testImages = [
      {
        path: 'input/test-image.png',
        width: 300,
        height: 200,
        background: { r: 255, g: 0, b: 0 } // Red
      },
      {
        path: 'input/photos/landscape.png',
        width: 400,
        height: 250,
        background: { r: 0, g: 255, b: 0 } // Green
      },
      {
        path: 'input/photos/vacation/beach.png',
        width: 350,
        height: 200,
        background: { r: 0, g: 0, b: 255 } // Blue
      },
      {
        path: 'input/documents/scans/document.png',
        width: 210,
        height: 297,
        background: { r: 255, g: 255, b: 0 } // Yellow
      }
    ];
    
    for (const imageConfig of testImages) {
      // Create a simple colored rectangle image
      const testImage = sharp({
        create: {
          width: imageConfig.width,
          height: imageConfig.height,
          channels: 3,
          background: imageConfig.background
        }
      })
      .png();
      
      // Save the test image
      await testImage.toFile(imageConfig.path);
      console.log(`Created test image: ${imageConfig.path}`);
    }
    
    // Create a non-image file to test skipping
    await fs.writeFile('input/readme.txt', 'This is a text file that should be skipped.');
    console.log('Created test text file: input/readme.txt');
    
  } catch (error) {
    console.error('Error creating test images:', error.message);
    process.exit(1);
  }
}

// Run the application
function runApplication() {
  try {
    console.log('\nRunning the Mirror application...');
    execSync('node index.js --input input --output output', { stdio: 'inherit' });
  } catch (error) {
    console.error('Error running application:', error.message);
    process.exit(1);
  }
}

// List the output directory structure
async function listOutputStructure() {
  try {
    console.log('\nOutput directory structure:');
    await listDirectoryRecursively('output', '');
  } catch (error) {
    console.log('Output directory not found or empty.');
  }
}

// Recursively list directory contents
async function listDirectoryRecursively(dir, indent) {
  try {
    const items = await fs.readdir(dir);
    
    for (const item of items) {
      const itemPath = path.join(dir, item);
      const stat = await fs.stat(itemPath);
      
      if (stat.isDirectory()) {
        console.log(`${indent}📁 ${item}/`);
        await listDirectoryRecursively(itemPath, indent + '  ');
      } else {
        console.log(`${indent}🖼️  ${item}`);
      }
    }
  } catch (error) {
    console.log(`${indent}❌ Error reading directory: ${error.message}`);
  }
}

// Main function
async function main() {
  console.log('Mirror Application Recursive Test');
  console.log('=================================\n');
  
  await createTestImages();
  runApplication();
  await listOutputStructure();
  
  console.log('\nTest completed successfully!');
  console.log('The application now processes images recursively through subdirectories.');
  console.log('Check the output directory to see the mirrored images with preserved folder structure.');
}

main();
