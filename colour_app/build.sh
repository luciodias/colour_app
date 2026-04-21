#!/bin/bash

# Loop through all directories and their Python files
find . -type f -name "*.py" | while read -r py_file; do
    # Output for poetry run cross-mpy
    file=$(basename "$py_file" .py)
    dir="..build/$(dirname "$py_file")"
    echo $file $dir
    # echo "Building ${file} to ../build/${dir}"
    mkdir -p ../build/$dir
    poetry run mpy-cross "$py_file" -o "../build/${dir}/${file}.mpy"
done