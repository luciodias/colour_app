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
    console.print("Starting build process...",style="yellow")

    # Find all python files recursively starting from the current directory
    # We iterate over all files matching *.py
    for py_file in Path(".").rglob("*.py"):
        # Skip the build script itself if it's in the directory being scanned
        if str(py_file) == "build.py":
            continue
        relative_path = py_file.relative_to(Path("."))
        dir_name = relative_path.parent
        dir_path_str = str(relative_path.parent)
        build_dir = Path("build") / dir_name
        file_name_base = py_file.stem
        mpy_file = build_dir / f"{file_name_base}.mpy"

        # 3. Check if the file already exists (equivalent to [ ! -f "$mpy" ] )
        if mpy_file.exists():
            # cheque se o arquivo mpy e' mais aintigo que o arquivo py
            if mpy_file.stat().st_mtime > py_file.stat().st_mtime:
                console.print(f"Skipping {py_file.name}: mpy icleas newer than py.",style="red")
                continue

        console.print(f"[blue]Processing:[/blue] {relative_path}")
        
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
            
            console.print(f"[green]SUCCESS:[/green] Compiled and saved to [cyan]{mpy_file}[/cyan]")
            # If mpy-cross prints something useful, we might log it, but for simplicity, we assume success if no error is raised.

        except subprocess.CalledProcessError as e:
            console.print(f"[red]ERROR:[/red] Failed to compile {py_file}.")
            console.print(f"  [red]Stderr:[/red]\n{e.stderr}")
        except FileNotFoundError:
            console.print("[red]FATAL ERROR:[/red] 'poetry' or 'mpy-cross' command not found. Ensure Poetry and mpy-cross are installed and in PATH.")
            break

    console.print("\n[green]Build process finished.[/green]")


if __name__ == "__main__":
    build_project()