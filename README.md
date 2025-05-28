# Mirror

A Node.js application that reads images from an input folder and flips them horizontally to create mirror images.

## Features

- Processes all images in a specified input directory
- Creates horizontally flipped (mirrored) versions of each image
- Supports common image formats (JPG, PNG, GIF, BMP, TIFF, WebP)
- Preserves original image quality and metadata
- Skips non-image files

## Requirements

- Node.js 14.x or higher
- npm or yarn

## Installation

1. Clone this repository or download the source code
2. Install dependencies:

```bash
npm install
```

## Usage

Run the application with the following command:

```bash
node index.js --input <inputDir> [--output <outputDir>]
```

### Parameters

- `--input`: (Required) Path to the directory containing images to process
- `--output`: (Optional) Path to save the mirrored images. If not provided, images will be saved to an 'output' directory in the current working directory.

### Examples

Process images from the 'photos' directory and save to the default output directory:

```bash
node index.js --input photos
```

Process images from the 'photos' directory and save to a custom output directory:

```bash
node index.js --input photos --output mirrored-photos
```

## Quick Start

1. Place your images in the 'input' directory
2. Run the application:

```bash
node index.js --input input --output output
```

3. Find your mirrored images in the 'output' directory

## License

MIT
