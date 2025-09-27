#!/bin/bash

echo "🐍 Installing Python Packages for BD Bible Backend"
echo "=================================================="
echo ""

# Check if pip3 is installed
if ! command -v pip3 &> /dev/null; then
    echo "📦 Installing python3-pip..."
    sudo apt update
    sudo apt install python3-pip -y
else
    echo "✅ pip3 is already installed"
    pip3 --version
fi

echo ""
echo "📚 Installing Python packages..."
echo ""

# Install packages
echo "1. Installing python-pptx (PowerPoint processing)..."
pip3 install python-pptx

echo ""
echo "2. Installing Pillow (image processing)..."
pip3 install pillow

echo ""
echo "3. Installing numpy (numerical operations)..."
pip3 install numpy

echo ""
echo "📋 Verifying installations..."
echo ""

# Verify installations
python3 -c "
import sys
print('Python version:', sys.version)
print()

try:
    import pptx
    print('✅ python-pptx version:', pptx.__version__)
except ImportError:
    print('❌ python-pptx not installed')

try:
    import PIL
    print('✅ Pillow version:', PIL.__version__)
except ImportError:
    print('❌ Pillow not installed')

try:
    import numpy
    print('✅ numpy version:', numpy.__version__)
except ImportError:
    print('❌ numpy not installed')
"

echo ""
echo "🎉 Installation complete!"
echo ""
echo "These packages will enable:"
echo "  • PowerPoint file processing (PPTX)"
echo "  • Image manipulation and processing"
echo "  • Advanced numerical operations"
echo ""
echo "Next steps:"
echo "  1. Create Python scripts for document processing"
echo "  2. Integrate with your Node.js backend"
echo "  3. Process BD Bible PowerPoint presentations"