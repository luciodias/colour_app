from libs.as7341.as7341 import AS7341, AS7341_MODE_SPM
try:
    from machine import I2C, Pin # pyright: ignore[reportMissingImports]

except ImportError as e:
    print(e)


class Sensor(AS7341):
    """Classe SENSOR que herda de AS7341 com método para retornar medições formatadas"""

    def __init__(self):
        """Inicializa o sensor com configurações padrão"""
        super().__init__(I2C(1, scl=Pin(4), sda=Pin(5), freq=100000))
        self.address = " ".join(["0x{:02X}".format(x) for x in self._bus.scan()])
        super().set_measure_mode(AS7341_MODE_SPM)
        super().set_atime(29)  # 30 ASTEPS
        super().set_astep(599)  # 1.67 ms
        super().set_again(4)  # factor 8 (with pretty much light)

    def get_measurements(self):
        if not self.isconnected():
            return {"error": "Sensor não conectado"}

        self.start_measure("F1F4CN")
        f1, f2, f3, f4, clr, nir = self.get_spectral_data()
        self.start_measure("F5F8CN")
        f5, f6, f7, f8, clr, nir = self.get_spectral_data()
        return {
            "f1": f1,
            "f2": f2,
            "f3": f3,
            "f4": f4,
            "f5": f5,
            "f6": f6,
            "f7": f7,
            "f8": f8,
            "clr": clr,
            "nir": nir,
        }