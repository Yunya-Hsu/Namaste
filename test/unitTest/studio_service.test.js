const db = require('../../config/mysql')
const { StudioDetail, checkoutInput } = require('../../services/studio_service')


let studio
beforeAll(() => {
  const req = { params: { studioSubdomain: 'yogaWithLucie' } }
  studio = new StudioDetail(req)
})

describe('class StudioDetail', () => {
  it('initialize class with req', () => {
    expect(studio.subdomain).toBe('yogaWithLucie')
  })

  it('test getDataForHomePage function in class', async () => {
    await studio.getDataForHomePage()
    expect(studio.logo).toBe('https://d298mxo82mdv9e.cloudfront.net/images/seeder/yogaWithLucie_logo.png')
  })

  it('test getStudioBySubdomain function in class', async () => {
    await studio.getStudioBySubdomain()
    expect(studio.logo).toBe('https://d298mxo82mdv9e.cloudfront.net/images/seeder/yogaWithLucie_logo.png')
  })

  it ('test getPriceRules function in class', async () => {
    const priceRules = await studio.getPriceRules()
    expect(priceRules.length).toBe(3)
  })

  
})

// describe('studio service unit test', () => {
//   it('validate checkout input - success', () => {
//     const input = new CheckoutInput(5, 1, 1)
//     expect(input.isCorrectCourseDetailId()).toBe(true)
//     expect(input.isCorrectBookOnline()).toBe(true)
//   })

//   it('validate courseDetailId of checkout input - fail', () => {
//     const input = new CheckoutInput('test', 1, 1)
//     expect(input.isCorrectCourseDetailId()).toBe(false)
//   })

//   it('validate isBookOnline of checkout input - fail', () => {
//     const input = new CheckoutInput('test', 'test', 1)
//     expect(input.isCorrectBookOnline()).toBe(false)
//   })

//   it('validate isBookOneOnOne of checkout input - fail', () => {
//     const input = new CheckoutInput('test', 'test', 'test')
//     expect(input.isCorrectBookOneOnOne()).toBe(false)
//   })

// })
