import { describe, it, expect } from 'vitest'
import { multiply } from '../../colour_app/static/matrix.js'

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
