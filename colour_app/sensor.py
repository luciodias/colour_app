import asyncio

from libs.as7341.as7341 import AS7341, AS7341_MODE_SPM

try:
    from machine import I2C, Pin  # pyright: ignore[reportMissingImports]
except ImportError as e:
    print(e)

try:
    from micropython import const  # pyright: ignore[reportMissingImports]
except ImportError:
    def const(c):
        return c

class Sensor(AS7341):
    """Classe SENSOR que herda de AS7341 com método para retornar medições formatadas"""

    def __init__(self, i2c=None):
        """Inicializa o sensor com configurações padrão"""
        if i2c is None:
            i2c = I2C(1, scl=Pin(4), sda=Pin(5), freq=100000)
        super().__init__(i2c)
        self.address = " ".join(["0x{:02X}".format(x) for x in self._bus.scan()])

    async def init(self):
        await super().init()
        await self.set_measure_mode(AS7341_MODE_SPM)
        await self.set_atime(29)
        await self.set_astep(599)
        await self.set_again(4)
        return self

    async def start_measure(self, selection: str|None = None) -> None:
        await super().start_measure(selection)

    async def get_measurements(self):
        if not self.isconnected():
            return {"error": "Sensor não conectado"}

        await self.start_measure("F1F4CN")
        f1, f2, f3, f4, clr, nir = self.get_spectral_data()
        await self.start_measure("F5F8CN")
        f5, f6, f7, f8, clr, nir = self.get_spectral_data()
        await self.start_measure("FD")
        *_, fd = self.get_spectral_data()
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
            "fd": fd,
        }