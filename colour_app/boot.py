# This file is executed on every boot (including wake-boot from deepsleep)
import esp          # pyright: ignore[reportMissingImports]
import network      # pyright: ignore[reportMissingImports]
import requests     # pyright: ignore[reportMissingImports]
import utime        # pyright: ignore[reportMissingImports]
import webrepl      # pyright: ignore[reportMissingImports]

from env import AP_CONFIG, HOST, KNOWN_NETWORKS, NOTIFICATION_API

esp.osdebug(0, esp.LOG_DEBUG)
network.hostname(HOST)
webrepl.start()


def setup_interfaces():
    # 1. Ativar Interface Access Point (AP)
    ap_if = network.WLAN(network.AP_IF)
    ap_if.active(True)
    ap_if.config(
        essid=AP_CONFIG.get("SSID"),
        password=AP_CONFIG.get("PASS"),
        authmode=network.AUTH_WPA_WPA2_PSK,
    )

    # 2. Ativar Interface Station (STA) para Scan
    sta_if = network.WLAN(network.STA_IF)
    sta_if.active(True)

    print("\n[STA] Escaneando redes WiFi disponíveis...")
    scan_results = sta_if.scan()

    best_ssid = None
    best_rssi = -100  # Valor de sinal muito baixo para início

    # Organizar resultados do scan: (ssid, bssid, channel, RSSI, authmode, hidden)
    for res in scan_results:
        ssid = res[0].decode("utf-8")
        rssi = res[3]

        if ssid in KNOWN_NETWORKS:
            print(f" -> Encontrada: {ssid} (Sinal: {rssi}dBm)")
            if rssi > best_rssi:
                best_rssi = rssi
                best_ssid = ssid

    # 3. Tentar conexão com a melhor rede encontrada
    if best_ssid:
        print(f"\n[STA] Conectando à melhor rede: {best_ssid} ({best_rssi}dBm)...")
        sta_if.connect(best_ssid, KNOWN_NETWORKS[best_ssid])

        # Timeout de 10 segundos para conexão
        attempt = 0
        while not sta_if.isconnected() and attempt < 10:
            print(".", end="")
            utime.sleep(1)
            attempt += 1

        if sta_if.isconnected():
            msg = f"Conectado com sucesso!\nIP: {sta_if.ifconfig()[0]}"
            print(msg)
            requests.post(
                NOTIFICATION_API,
                data=msg.encode(),
            )
        else:
            print("\n[STA] Falha ao conectar (timeout).")
    else:
        print("\n[STA] Nenhuma rede conhecida encontrada no alcance.")


# Executar a rotina
setup_interfaces()
