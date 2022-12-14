const util = require('../../util/util')

describe('test util functions', () => {
  it('test allBeNumber - pass', () => {
    const testArray = [1, 2, 3]
    const result = util.allBeNumber(testArray)
    expect(result).toBe(false)
  })

  it('test allBeNumber - fail', () => {
    const testArray = [1, 'test', 3]
    const result = util.allBeNumber(testArray)
    expect(result).toBe(true)
  })

  it('test allBeBoolean - pass', () => {
    const testArray = [1, 0]
    const result = util.allBeBoolean(testArray)
    expect(result).toBe(true)
  })

  it('test allBeBoolean - fail', () => {
    const testArray = [1, 2]
    const result = util.allBeBoolean(testArray)
    expect(result).toBe(false)
  })

  it('test allBeBoolean - fail', () => {
    const testArray = [1, 'test']
    const result = util.allBeBoolean(testArray)
    expect(result).toBe(false)
  })
})