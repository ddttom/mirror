# Mirror

A Node.js application that reads images from an input folder and flips them horizontally to create mirror images. The application processes images recursively through subdirectories while maintaining the original folder structure.

## Features

- Processes all images in a specified input directory **recursively**
- Maintains the original folder structure in the output directory
- Creates horizontally flipped (mirrored) versions of each image
- Supports common image formats (JPG, PNG, GIF, BMP, TIFF, WebP)
- Preserves original image quality and metadata
- Skips non-image files and directories

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

## Recursive Processing

The application automatically processes images in all subdirectories of the input folder. For example, if your input directory structure is:

```
input/
├── photo1.jpg
├── vacation/
│   ├── beach.png
│   └── mountains/
│       └── sunset.jpg
└── documents/
    └── scans/
        └── receipt.png
```

The output will maintain the same structure:

```
output/
├── photo1.jpg (mirrored)
├── vacation/
│   ├── beach.png (mirrored)
│   └── mountains/
│       └── sunset.jpg (mirrored)
└── documents/
    └── scans/
        └── receipt.png (mirrored)
```

## Quick Start

1. Place your images in the 'input' directory (including subdirectories)
2. Run the application:

```bash
node index.js --input input --output output
```

3. Find your mirrored images in the 'output' directory with the same folder structure

## Testing

Run the comprehensive test that creates sample images in nested directories:

```bash
npm test
```

This will create test images in various subdirectories and demonstrate the recursive processing capability.

## License

MIT
