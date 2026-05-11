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

_CFG_0 = const(0xA9)
_CFG_0_LOW_POWER = const(0x20)
_CFG_6 = const(0xAF)
_CFG_6_SMUX_CMD_WRITE = const(0x10)
_CONFIG_INT_MODE_SPM = const(0x00)
_CONFIG_INT_MODE_SYNS = const(0x01)

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

    async def start_measure(self, selection: str|None = None) -> None:
        """select SMUX configuration,
        Optionally select of change channel selection
        prepare and start measurement
        Note: Typically <selection> need not be specified
              when a series of measurements with the same
              channel selection is being performed.
              (then use channel_selection() once)
        """
        self._modify_reg(_CFG_0, _CFG_0_LOW_POWER, False)  # no low power
        self.set_spectral_measurement(False)  # quiesce
        self._write_byte(_CFG_6, _CFG_6_SMUX_CMD_WRITE)  # write mode
        if selection is not None:
            self.channel_select(selection)
        if self._measuremode == _CONFIG_INT_MODE_SPM:
            self.set_smux(True)
        elif self._measuremode == _CONFIG_INT_MODE_SYNS:
            self.set_smux(True)
            self.set_gpio_input(True)
        self.set_spectral_measurement(True)
        if self._measuremode == _CONFIG_INT_MODE_SPM:
            while not self.measurement_completed():
                await asyncio.sleep_ms(15)

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