const { app } = require('../app')
const db = require('../config/mysql')
const request = require('supertest')


// 建立一筆 user 的假資料 
// beforeAll(async () => {
//   await db.execute('INSERT INTO users ()')
// }) 

describe('Integration tests for user API', () => {
  
  it ('GET /user/register - success - show register page', async () => {
    const { statusCode } = await request(app).get('/user/register').send()
    expect(statusCode).toBe(200)
  })

  it('POST /user/register - fail - reject by password validation (too week)', async () => {
    const { statusCode } = await request(app).post('/user/register').send({
      name: 'test@test.com', 
      email: 'test@test.com', 
      password: 'test1234!', 
      confirmedPassword: 'test1234'
    })

    expect(statusCode).toBe(302) // server 將 req 導回註冊頁，要求 user 重新填寫
  })
})



