/**
 * Test script for the Mirror application
 * This script creates a sample image in the input directory and then runs the application
 */

import fs from 'fs/promises';
import path from 'path';
import { execSync } from 'child_process';

// Create a simple test image using Sharp
async function createTestImage() {
  try {
    // Import Sharp dynamically to avoid issues if someone runs this without dependencies
    const sharp = (await import('sharp')).default;
    
    // Create a simple gradient image
    const width = 300;
    const height = 200;
    
    // Create a simple gradient image
    const testImage = sharp({
      create: {
        width,
        height,
        channels: 3,
        background: { r: 255, g: 0, b: 0 }
      }
    })
    .linear(1.0, 0) // Apply a gradient effect
    .png();
    
    // Ensure input directory exists
    await fs.mkdir('input', { recursive: true });
    
    // Save the test image
    await testImage.toFile('input/test-image.png');
    
    console.log('Created test image: input/test-image.png');
  } catch (error) {
    console.error('Error creating test image:', error.message);
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

// Main function
async function main() {
  console.log('Mirror Application Test');
  console.log('======================\n');
  
  await createTestImage();
  runApplication();
  
  console.log('\nTest completed successfully!');
  console.log('Check the output directory for the mirrored image.');
}

main();
