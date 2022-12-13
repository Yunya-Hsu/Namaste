const studioModel = require('../../models/studio_model')

describe('studio model test - studio', () => {
  it('get studio by subdomain', async () => {
    const studio = await studioModel.getStudioBySubdomain('yogaWithLucie')
    expect(studio.id).toBe(1)
    expect(studio.logo).toBe('images/seeder/yogaWithLucie_logo.png')
    expect(studio.name).toBe('Yoga with Lucie')
  })

  it('get studio for home page', async () => {
    const studio = await studioModel.getStudioForHomePage('yogaWithLucie')
    expect(studio.id).toBe(1)
    expect(studio.name).toBe('Yoga with Lucie')
    expect(studio.logo).toBe('images/seeder/yogaWithLucie_logo.png')
    expect(studio.introduction_title).toBe('Yoga with Lucie everywhere')
    expect(studio.introduction_detail).toBe("歡迎來到 Yoga with Lucie， 我認為練習瑜伽最大的改變是：看清楚自己！每個人都有最喜歡的樣貌，盡全力擁抱這個目標吧！")
    expect(studio.introduction_photo).toBe('images/seeder/yogaWithLucie_intro_photo.jpg')
  })

  it ('get studio for about page', async () => {
    const studio = await studioModel.getStudioForAbout('yogaWithLucie')
    expect(studio.tappay_app_key).toBe('app_42ceHW1wUPSiQznRnLMD34waQICtPxQuVd4BZNwJSzEyaptnudvZZ3vd1gqD')
  })
})

describe('studio model test - teacher/ price rules/ course', () => {
  it('get teacher list for studio', async () => {
    const teacherList = await studioModel.getTeachers(1)
    expect(teacherList.length).toBe(6)
  })

  it('get price rule list for studio', async () => {
    const priceRuleList = await studioModel.getPriceRules(1, '2022-12-31 11:00:00')
    expect(priceRuleList.length).toBe(4)
  })

  it('get studio info for checkout', async () => {
    const studio = await studioModel.getStudioForCheckout('yogaWithLucie')
    expect(studio.tappay_app_key).toBe('app_42ceHW1wUPSiQznRnLMD34waQICtPxQuVd4BZNwJSzEyaptnudvZZ3vd1gqD')
  })

  it('get dedicated price rule of studio', async () => {
    const priceRule = await studioModel.getDedicatedPriceRule(1, '2022-12-31 11:00:00', 1)
    expect(priceRule.category).toBe('新手體驗')
    expect(priceRule.price).toBe(500)
  })
})