const time = require('../../util/time')


describe('test time functions', () => {
  it('test inputTimeReformat function', () => {
    const testTime = '2022-12-10T23:13:03'
    const result = time.inputTimeReformat(testTime)
    expect(result).toBe('2022-12-10 23:13:03')
  })

  it('test timeFormatToHTML function', () => {
    const testTime = '2022-12-10 23:13:03'
    const result = time.timeFormatToHTML(testTime)
    expect(result).toBe('2022-12-10T23:13:03')
  })

  it('test isISO8061 function - pass', () => {
    const testTime = '2022-12-10T23:13:03'
    const result = time.isISO8601(testTime)
    expect(result).toBe(true)
  })

  it('test isDate function - pass', () => {
    const testTime = '2022-12-10'
    const result = time.isDate(testTime)
    expect(result).toBe(true)
  })


})