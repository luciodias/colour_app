import { describe, it, expect } from 'vitest'
import {
  channel_name, channel_wl, counts, sensor_offset, sensor_factor,
  reconstruction_wl, xN, yN, zN, correction_matrix,
  calcularCCTMcCamy, processarAS7341, multiply
} from '../../colour_app/static/js/calibration.js'

describe('calibration data', () => {
  it('has 10 named channels', () => {
    expect(channel_name).toHaveLength(10)
    expect(channel_wl).toHaveLength(10)
    expect(counts).toHaveLength(10)
    expect(sensor_offset).toHaveLength(10)
    expect(sensor_factor).toHaveLength(10)
  })

  it('channel wavelengths are ascending integers', () => {
    expect(channel_wl).toEqual([410, 440, 470, 510, 550, 583, 620, 670, 750, 900])
  })

  it('channel names are correct labels', () => {
    expect(channel_name).toEqual(['F1','F2','F3','F4','F5','F6','F7','F8','Clear','NIR'])
  })

  it('sensor_offset values are small positive numbers', () => {
    for (const v of sensor_offset) {
      expect(v).toBeGreaterThan(0)
      expect(v).toBeLessThan(0.01)
    }
  })

  it('sensor_factor values are near 1.0', () => {
    for (const v of sensor_factor) {
      expect(v).toBeGreaterThan(1)
      expect(v).toBeLessThan(1.3)
    }
  })

  it('reconstruction_wl covers 380-1100', () => {
    expect(reconstruction_wl).toHaveLength(721)
    expect(reconstruction_wl[0]).toBe(380)
    expect(reconstruction_wl[reconstruction_wl.length - 1]).toBe(1100)
  })

  it('xN, yN, zN have 401 elements each (380-780nm CIE 1931)', () => {
    expect(xN).toHaveLength(401)
    expect(yN).toHaveLength(401)
    expect(zN).toHaveLength(401)
  })

  it('correction_matrix is a flat array of 7200 numbers (10 channels x 720)', () => {
    expect(correction_matrix).toHaveLength(7200)
    for (const v of correction_matrix) {
      expect(typeof v).toBe('number')
    }
  })
})

describe('calcularCCTMcCamy', () => {
  it('returns ~6500K for D65 illuminant (x=0.3127, y=0.3290)', () => {
    const cct = calcularCCTMcCamy(0.3127, 0.3290)
    expect(cct).toBeGreaterThan(6300)
    expect(cct).toBeLessThan(6700)
  })

  it('returns ~2856K for illuminant A (x=0.4476, y=0.4074)', () => {
    const cct = calcularCCTMcCamy(0.4476, 0.4074)
    expect(cct).toBeGreaterThan(2800)
    expect(cct).toBeLessThan(3000)
  })

  it('returns 0 when denominator is zero (y = 0.1858)', () => {
    expect(calcularCCTMcCamy(0.3, 0.1858)).toBe(0)
  })

  it('increases with x when y < 0.1858 (positive denominator)', () => {
    const yFixed = 0.10
    const cct1 = calcularCCTMcCamy(0.33, yFixed)
    const cct2 = calcularCCTMcCamy(0.34, yFixed)
    const cct3 = calcularCCTMcCamy(0.35, yFixed)
    expect(cct1).toBeLessThan(cct2)
    expect(cct2).toBeLessThan(cct3)
  })
})

describe('processarAS7341', () => {
  const dadosExemplo = {
    'F1': 0.044107, 'F2': 0.115193, 'F3': 0.140455, 'F4': 0.149534,
    'F5': 0.382473, 'F6': 0.418209, 'F7': 0.446454, 'F8': 0.119507,
    'Clear': 0.661343, 'NIR': 0.078555,
  }

  it('returns an object with all expected keys', () => {
    const res = processarAS7341(dadosExemplo)
    const expectedKeys = ['X', 'Y', 'Z', 'x', 'y', 'z', 'Lux', 'u_prime', 'v_prime', 'CCT', 'CCT_Status']
    for (const key of expectedKeys) {
      expect(res).toHaveProperty(key)
    }
  })

  it('produces positive X, Y, Z for valid input', () => {
    const res = processarAS7341(dadosExemplo)
    expect(res.X).toBeGreaterThan(0)
    expect(res.Y).toBeGreaterThan(0)
    expect(res.Z).toBeGreaterThan(0)
  })

  it('computes chromaticity coordinates x+y+z ≈ 1', () => {
    const res = processarAS7341(dadosExemplo)
    const sum = res.x + res.y + res.z
    expect(sum).toBeCloseTo(1.0, 1)
  })

  it('Lux equals 683 * Y', () => {
    const res = processarAS7341(dadosExemplo)
    expect(res.Lux).toBeCloseTo(683.0 * res.Y, 2)
  })

  it('accepts custom config (offsets, fatoresEscala, matrizXYZ)', () => {
    const config = {
      offsets: { 'F1': 0, 'F2': 0, 'F3': 0, 'F4': 0, 'F5': 0, 'F6': 0, 'F7': 0, 'F8': 0, 'Clear': 0, 'NIR': 0 },
      fatoresEscala: { 'F1': 1, 'F2': 1, 'F3': 1, 'F4': 1, 'F5': 1, 'F6': 1, 'F7': 1, 'F8': 1, 'Clear': 1, 'NIR': 1 },
    }
    const res = processarAS7341(dadosExemplo, config)
    expect(res.CCT).toBeGreaterThan(0)
  })
})

describe('multiply', () => {
  it('multiplies two 2x2 matrices', () => {
    const a = [1, 2, 3, 4]
    const b = [5, 6, 7, 8]
    const result = multiply(a, 2, b, 2)
    expect(result).toEqual([19, 22, 43, 50])
  })

  it('throws on incompatible dimensions', () => {
    const a = [1, 2, 3]
    const b = [4, 5, 6]
    expect(() => multiply(a, 3, b, 3)).toThrow(
      'Número de colunas de A deve ser igual ao número de linhas de B'
    )
  })

  it('multiplies a 3x2 by a 2x3 matrix', () => {
    const a = [1, 2, 3, 4, 5, 6]
    const b = [7, 8, 9, 10, 11, 12]
    const result = multiply(a, 2, b, 3)
    expect(result).toEqual([27, 30, 33, 61, 68, 75, 95, 106, 117])
  })

  it('multiplies a 1x3 vector by a 3x3 matrix', () => {
    const a = [1, 2, 3]
    const b = [4, 5, 6, 7, 8, 9, 1, 2, 3]
    const result = multiply(a, 3, b, 3)
    expect(result).toEqual([21, 27, 33])
  })
})
