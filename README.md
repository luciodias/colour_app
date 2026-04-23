# Colour Monitoring Application

This project implements a simple IoT data monitoring dashboard using Python with the `microdot` framework. It simulates real-time sensor data (temperature and humidity) and provides a web interface to visualize these metrics, along with an administration page to manage monitoring thresholds.

## 🚀 Features

*   **Real-time Dashboard:** Visualizes simulated sensor readings on line charts (Temperature, Humidity, Alerts).
*   **Data Simulation:** A background thread simulates the arrival of new IoT data points at configured intervals.
*   **Configuration Management:** Allows users to view and update monitoring thresholds (e.g., temperature/humidity limits) via a dedicated `/config` page.
*   **Simple API Endpoints:** Provides RESTful endpoints (`/data`, `/config-data`) for data polling by front-end clients.

## ⚙️ Project Structure

```
.
├── colour_app/
│   ├── app.py              # Core Flask/Microdot application logic
│   └── templates/
│       ├── config.html     # Configuration page template
│       └── dashboard.html  # Main visualization dashboard
├── pyproject.toml          # Project dependencies and metadata
└── README.md               # This file
```

## 🛠️ Setup and Installation

### Prerequisites

Ensure you have Python 3.13+ installed.

### Installation

1.  **Create a Virtual Environment (Recommended):**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Linux/macOS
    # .\\venv\\Scripts\\activate  # On Windows
    ```

2.  **Install Dependencies:**
    The dependencies are managed via `pyproject.toml`. You can install them using Poetry (if Poetry is set up for this project):
    ```bash
    poetry install
    ```
    *(Note: If `poetry install` fails due to package conflicts, you might need to manually install the primary dependency: `pip install microdot`)*

## ▶️ Usage Examples

### 1. Running the Application

The application can be started using the following command (assuming Poetry is used):

```bash
poetry run python colour_app/app.py
```

The application will start running on `http://127.0.0.1:5000/` and will use the `config.json` file in the root directory for persistent settings.

### 2. Accessing Endpoints

Once the application is running, you can interact with the following endpoints:

*   **Dashboard:** Access the main visualization page:
    [http://127.0.0.1:5000/dashboard](http://127.0.0.1:5000/dashboard)

*   **Configuration:** View and update settings:
    [http://127.0.0.1:5000/config](http://127.0.0.1:5000/config)
    *(When submitting a form on this page, the thresholds will be updated in `config.json`)*

*   **Data Polling (Client Side):** The dashboard automatically polls data from this endpoint every 3 seconds:
    *   **GET:** `/data` (Returns `{"temperature": X, "humidity": Y, "alerts": Z}`)

*   **Configuration Retrieval:** Fetch current saved settings:
    *   **GET:** `/config-data`

### 💡 Note on Simulation

The `simulate_data()` function runs in a background thread, constantly updating the `sensor_data` global variable, which drives the front-end charts via polling.

---

**Important:** The application relies on `config.json` existing or being created upon first run to store settings.
