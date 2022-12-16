const { StudioDetail } = require('../../services/studio_service')

let studio

beforeEach(async () => {
  const req = { params: { studioSubdomain: 'yogaWithLucie' } }
  studio = new StudioDetail(req)
  await studio.getStudioBySubdomain()
})

afterEach(() => {
  studio = ''
})

describe(`class StudioDetail`, () => {
  it('initialize class with req', () => {
    expect(studio.subdomain).toBe('yogaWithLucie')
  })

  it('test organizeData function', async () => {
    const studioData = {
      id: 1,
      phone: '0912345678'
    }
    studio.organizeData(studioData)
    expect(studio.id).toBe(1)
    expect(studio.phone).toBe('0912345678')
  })

  it('test getStudioBySubdomain function in class', async () => {
    await studio.getStudioBySubdomain()
    expect(studio.logo).toBe('https://d298mxo82mdv9e.cloudfront.net/images/seeder/yogaWithLucie_logo.png')
  })

  it('test getDataForHomePage function in class', async () => {
    await studio.getDataForHomePage()
    expect(studio.logo).toBe('https://d298mxo82mdv9e.cloudfront.net/images/seeder/yogaWithLucie_logo.png')
  })

  it ('test getPriceRules function in class', async () => {
    const priceRules = await studio.getPriceRules()
    expect(priceRules.length).toBe(4)
  })

  it ('test getStudioForCheckout function in class', async () => {
    await studio.getStudioForCheckout()
    expect(studio.tappay_partner_key).toBe('partner_yHFgi94z4JAhTNh2kJcYLV4qgIDRgIBeCYRx9Km1PuD5JWTwarBagA1H')
  })

  it ('test getDedicatedPriceRule function in class', async () => {
    const priceRule = await studio.getDedicatedPriceRule(1)
    expect(priceRule.category).toBe('新手體驗')
  })

  it ('test getStudioForAbout function in class', async () => {
    await studio.getStudioForAbout()
    expect(studio.address).toBe('台北市中山區民生東路6號')
  })

  it ('test getTeachers function in class', async () => {
    const teacherList = await studio.getTeachers()
    expect(teacherList.length).toBe(6)
    expect(teacherList[0].name).toBe('DORA')
    expect(teacherList[0].avatar).toBe('https://d298mxo82mdv9e.cloudfront.net/images/seeder/dora.jpg')
  })

  it ('test getCourseDetail function in class', async () => {
    const courseDetail = await studio.getCourseDetail(1)
    expect(courseDetail.start_time).toBe('09:00:00')
  })
})
