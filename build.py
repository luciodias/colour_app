import subprocess
from pathlib import Path
from rich.console import Console

# Initialize rich console for colored output
console = Console()

def build_project():
    """
    Finds all Python files and compiles them to .mpy format using mpy-cross,
    outputting status updates using rich library.
    """
    print("[bold yellow]Starting build process...[/bold yellow]")

    # Find all python files recursively starting from the current directory
    # We iterate over all files matching *.py
    for py_file in Path(".").rglob("*.py"):
        # Skip the build script itself if it's in the directory being scanned
        if str(py_file) == "build.py":
            continue

        # 1. Determine the relative path structure for the build directory.
        # This mimics the logic: dirname "$py_file"
        relative_path = py_file.relative_to(Path("."))
        
        # Get the directory part of the relative path
        dir_name = relative_path.parent
        
        # Construct the target build directory path (mimicking ../build/...)
        # We assume the build output structure should mirror the source structure under a 'build' folder
        # Adjusting path logic to match the shell script's apparent intent of building into 'build' relative to the source directory.
        # The shell script uses: dir="../build/$(dirname "$py_file")"
        # If $py_file is ./src/module/file.py, dirname is ./src/module.
        # The target path becomes ../build/src/module/
        
        # To simplify and correctly reflect the relative structure for the build output:
        # We will construct the build directory path relative to where the script runs, aiming for ./build/<path_without_root>/
        
        # Get the path relative to the project root ('.')
        # The shell script's use of '..' implies it's running from a directory level above the source code.
        # For portability, let's build everything under ./build/ and mirror the structure *after* the root directory.
        
        # Let's adjust the target structure to be simply 'build'/<path_from_root_excluding_py_file_name>
        
        # Example: If py_file is './src/utils/main.py'
        # relative_path = 'src/utils/main.py'
        # dir_name_str = 'src/utils'
        # target_dir = 'build/src/utils'

        # Replicating the shell script's complex path manipulation for robustness:
        # dirname "$py_file" gets the directory path relative to the current execution context.
        dir_path_str = str(relative_path.parent)
        
        # We need to ensure the structure is under a 'build' directory one level up from the source structure root, 
        # but since we don't know the absolute context, we'll stick to making 'build' a subdirectory mirroring the source structure.
        build_dir = Path("build") / dir_name
        
        # 2. Calculate the output .mpy file path
        file_name_base = py_file.stem
        mpy_file = build_dir / f"{file_name_base}.mpy"

        # 3. Check if the file already exists (equivalent to [ ! -f "$mpy" ] )
        if not mpy_file.exists():
            console.print(f"[bold blue]Processing:[/bold blue] {relative_path}")
            
            # 4. Create directory if it doesn't exist (equivalent to mkdir -p $dir)
            build_dir.mkdir(parents=True, exist_ok=True)

            # 5. Run the compilation command
            command = ["poetry", "run", "mpy-cross", str(py_file), "-o", str(mpy_file)]
            
            console.print(f"  [yellow]-> Running:[/yellow] {' '.join(command)}")
            
            try:
                # Run the subprocess, capturing output or printing it directly
                result = subprocess.run(
                    command, 
                    check=True, 
                    capture_output=True, 
                    text=True
                )
                
                console.print(f"[bold green]SUCCESS:[/bold green] Compiled and saved to [cyan]{mpy_file}[/cyan]")
                # If mpy-cross prints something useful, we might log it, but for simplicity, we assume success if no error is raised.

            except subprocess.CalledProcessError as e:
                console.print(f"[bold red]ERROR:[/bold red] Failed to compile {py_file}.")
                console.print(f"  [red]Stderr:[/red]\n{e.stderr}")
            except FileNotFoundError:
                console.print("[bold red]FATAL ERROR:[/bold red] 'poetry' or 'mpy-cross' command not found. Ensure Poetry and mpy-cross are installed and in PATH.")
                break
        else:
            console.print(f"[dim]Skipping:[/dim] {relative_path} (Already compiled to [cyan]{mpy_file}[/cyan])")

    console.print("\n[bold green]Build process finished.[/bold green]")


if __name__ == "__main__":
    build_project()