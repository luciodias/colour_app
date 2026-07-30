import { describe, it, expect } from 'vitest'
import {
  channel_name, channel_wl, counts, sensor_offset, sensor_factor,
  reconstruction_wl, xN, yN, zN, correction_matrix,
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
    expect(channel_name).toEqual(['F1','F2','F3','F4','F5','F6','F7','F8','Clear (peak)','NIR'])
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

  it('reconstruction_wl covers 380–1100', () => {
    expect(reconstruction_wl).toHaveLength(721)
    expect(reconstruction_wl[0]).toBe(380)
    expect(reconstruction_wl[reconstruction_wl.length - 1]).toBe(1100)
  })

  it('xN, yN, zN have 401 elements each (380-780nm CIE 1931)', () => {
    expect(xN).toHaveLength(401)
    expect(yN).toHaveLength(401)
    expect(zN).toHaveLength(401)
  })

  it('correction_matrix is a flat array of 7200 numbers (10 channels × 720)', () => {
    expect(correction_matrix).toHaveLength(7200)
    for (const v of correction_matrix) {
      expect(typeof v).toBe('number')
    }
  })
})
