# colour_app

## Project overview

IoT spectral colour monitoring: **AS7341 sensor + ESP32/MicroPython** serving HTTPS dashboards via **Microdot** framework. Dual-platform: same codebase runs on MicroPython (ESP32) and CPython (dev/test).

## Commands

```bash
uv sync                       # install dev dependencies
uv run task lint              # ruff check
uv run task format            # ruff format (preceded by ruff check --fix)
uv run task typecheck         # ty check
uv run task test              # pytest -s -x --cov=colour_app -vv
uv run task build             # compile .py → .mpy via mpy-cross for ESP32
npm test                      # vitest run (JS tests)
npm run test:watch            # vitest watch mode
uv run python colour_app/app.py   # dev server on https://127.0.0.1:4443/
```

- Single test: `uv run pytest tests/test_file.py::test_name -s -x`
- JS single test: `npx vitest run tests/js/calibration.test.js`
- ESP32 toolchain: `uv run --group esp task build`

## Architecture

- **No `__init__.py`** in `colour_app/` — it's not a package; imports use module-level paths (`from colour_app.app import ...`)
- **Microdot** (not Flask) — routes via `@app.route()`, test client at `libs.microdot.test_client.TestClient`
- **Two TLS cert formats**: `.pem` on MicroPython, `.der` on CPython (switched via `sys.implementation.name`)
- **Templates** use Microdot's uTemplate (not Jinja2); shared markup is include-based
- **Async sensor** — `Sensor.get_measurements()` is async, uses `asyncio.sleep_ms(15)` polling
- **ty** is the type checker/LSP; vendored `colour_app/libs` is excluded, MicroPython imports use `allowed-unresolved-imports`

## Testing quirks

- **Sensor and boot tests require extensive mocking** of MicroPython-only modules (`machine`, `esp`, `network`, `utime`, `webrepl`). Use `unittest.mock.patch` for hardware.
- **`conftest.py` creates a `TestClient`** from `microdot.test_client` — use `await client.get("/path")` for HTTP tests
- **JS source files must export** symbols for vitest imports (e.g. `calibration.js` exports `multiply`)
- pytest config: `asyncio_mode = auto`, coverage omits `tests/*`, `colour_app/libs/*`, `tools/*`, `env.py`

## Gotchas

- **`env.py` is gitignored** — must NOT be created or committed. Contains `AP_CONFIG`, `HOST`, `KNOWN_NETWORKS`, `NOTIFICATION_API` used by `boot.py`
- **No `pre_test` hook** — lint does not auto-run before tests
- **Build skips cached `.mpy`** if source is older than compiled output
- **uTemplate compiles to `templates/*_html.py`** (gitignored); `task build` precompiles them before `mpy-cross`
- **Service worker is served from `/pwa_sw.js`** so its scope covers the whole app; static fallback remains available
- **Tests run from project root** — `config.json` is created/read in CWD during tests
