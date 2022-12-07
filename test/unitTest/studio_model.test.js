const studioModel = require('../../models/studio_model')


describe('studio model test', () => {
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

  it('get teacher list for studio', async () => {
    const teacherList = await studioModel.getTeachers(1)
    expect(teacherList.length).toBe(6)
  })
})