const currentTime = require('moment')().format('YYYY-MM-DD HH:mm:ss')

const SEED_ROLES = [
  {
    role: 0, // super admin
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    role: 10, // studio owner
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    role: 20, // teacher
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    role: 50, // users
    created_at: currentTime,
    updated_at: currentTime
  }
]



const PASSWORD = 'test1234'
const SEED_USERS_SUPER_ADMIN = [
  {
    name: 'Yunya',
    email: 'yunya@test.com',
    created_at: currentTime,
    updated_at: currentTime
  }
]
const SEED_USERS_STUDIO_OWNER = [
  {
    name: 'Lucie',
    email: 'lucie@test.com',
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    name: 'Paula',
    email: 'paula@test.com',
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    name: 'Marie',
    email: 'marie@test.com',
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    name: 'Arabella',
    email: 'arabella@test.com',
    created_at: currentTime,
    updated_at: currentTime
  }
]
const SEED_USERS_TEACHER = [
  {
    name: 'Mimi Lin',
    email: 'mimi_lin@test.com',
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    name: 'Dora Zhang',
    email: 'dora_zhang@test.com',
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    name: 'Johnny Liu',
    email: 'johnny_liu@test.com',
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    name: 'Andrew Fang',
    email: 'andrew_fang@test.com',
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    name: 'Stella Lai',
    email: 'stella_lai@test.com',
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    name: 'Joyce Chen',
    email: 'joyce_chen@test.com',
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    name: 'Min Yang',
    email: 'min_yang@test.com',
    created_at: currentTime,
    updated_at: currentTime
  }
]
const SEED_USERS_STUDENT = [
  {
    role_id: 4,
    name: '子佑',
    email: 'tzuyu@test.com',
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    role_id: 4,
    name: 'David',
    email: 'david@test.com',
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    role_id: 4,
    name: 'Yenchu',
    email: 'yenchu@test.com',
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    role_id: 4,
    name: 'Timmy',
    email: 'timmy@test.com',
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    role_id: 4,
    name: 'Kuan Hao',
    email: 'kuan-hao@test.com',
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    role_id: 4,
    name: 'cks',
    email: 'cks@test.com',
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    role_id: 4,
    name: 'ps',
    email: 'ps@test.com',
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    role_id: 4,
    name: 'shane',
    email: 'shane@test.com',
    created_at: currentTime,
    updated_at: currentTime
  }
]



const SEED_STUDIO = [
  {
    name: 'Yoga with Lucie',
    logo: 'TBC',
    introduction_title: 'Yoga with Lucie everywhere',
    introduction_detail: '歡迎來到 Yoga with Lucie， 我認為練習瑜伽最大的改變是：看清楚自己！ 每個人都有最喜歡的樣貌，盡全力擁抱這個目標吧！',
    introduction_photo: 'TBC',
    subdomain: 'yogaWithLucie',
    address: '台北市中山區民生東路6號',
    address_description: '',
    phone: '02-23520621',
    tappay_app_key: 'app_42ceHW1wUPSiQznRnLMD34waQICtPxQuVd4BZNwJSzEyaptnudvZZ3vd1gqD',
    tappay_partner_key: 'partner_yHFgi94z4JAhTNh2kJcYLV4qgIDRgIBeCYRx9Km1PuD5JWTwarBagA1H',
    tappay_id: 'yunyahsu_CTBC',
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    name: 'Today Yoga',
    logo: 'TBC',
    introduction_title: '讓妳重新愛上鏡中的自己',
    introduction_detail: '瑜珈像是一個起點，串起新的生命旅程，無關乎好壞或對錯，把心專注於當下，Inner peace is the new success!',
    introduction_photo: 'TBC',
    subdomain: 'todayYoga',
    address: '臺北市士林區中社路3號',
    address_description: '',
    phone: '02-23058274',
    tappay_app_key: 'app_42ceHW1wUPSiQznRnLMD34waQICtPxQuVd4BZNwJSzEyaptnudvZZ3vd1gqD',
    tappay_partner_key: 'partner_yHFgi94z4JAhTNh2kJcYLV4qgIDRgIBeCYRx9Km1PuD5JWTwarBagA1H',
    tappay_id: 'yunyahsu_CTBC',
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    name: 'SPACE Wellness',
    logo: 'TBC',
    introduction_title: 'Let us hang out!Aerial and Yoga Playground',
    introduction_detail: 'Hang in there, hangout with me! 在這裡，我們專注在身心的鍛鍊和平衡、享受與內心自我對話的時刻，結交擁有共同興趣的好友，發掘人生其他的可能。',
    introduction_photo: 'TBC',
    subdomain: 'spaceWellness',
    address: '台北市內湖區潭美街18號',
    address_description: '',
    phone: '02-56661622',
    tappay_app_key: 'app_42ceHW1wUPSiQznRnLMD34waQICtPxQuVd4BZNwJSzEyaptnudvZZ3vd1gqD',
    tappay_partner_key: 'partner_yHFgi94z4JAhTNh2kJcYLV4qgIDRgIBeCYRx9Km1PuD5JWTwarBagA1H',
    tappay_id: 'yunyahsu_CTBC',
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    name: 'AppleTree Studio',
    logo: 'TBC',
    introduction_title: '馬戲角落新型態的空中體驗',
    introduction_detail: '活在當下，讓千千萬萬的念頭順著走，便能體會到屬於自身的能量與滿滿生命力，Let us yoga together',
    introduction_photo: 'TBC',
    subdomain: 'appleTreeStudio',
    address: '台北市大安區芳蘭路23號',
    address_description: '',
    phone: '02-39229268',
    tappay_app_key: 'app_42ceHW1wUPSiQznRnLMD34waQICtPxQuVd4BZNwJSzEyaptnudvZZ3vd1gqD',
    tappay_partner_key: 'partner_yHFgi94z4JAhTNh2kJcYLV4qgIDRgIBeCYRx9Km1PuD5JWTwarBagA1H',
    tappay_id: 'yunyahsu_CTBC',
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    name: 'Amazing Factory',
    logo: 'TBC',
    introduction_title: 'Reignite Your Yoga Practice In The Fall',
    introduction_detail: 'Autumn is a wonderful time to begin or deepen your yoga practice. As the weather cools down yoga is a delightful alternative to outdoor activities.',
    introduction_photo: 'TBC',
    subdomain: 'amazingFactory',
    address: '台北市文山區開元街12號',
    address_description: '',
    phone: '02-23491043',
    tappay_app_key: 'app_42ceHW1wUPSiQznRnLMD34waQICtPxQuVd4BZNwJSzEyaptnudvZZ3vd1gqD',
    tappay_partner_key: 'partner_yHFgi94z4JAhTNh2kJcYLV4qgIDRgIBeCYRx9Km1PuD5JWTwarBagA1H',
    tappay_id: 'yunyahsu_CTBC',
    created_at: currentTime,
    updated_at: currentTime
  }
]



const SEED_PERMISSION = [
  {
    permission: 'create, update, delete studio',
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    permission: 'create, update, delete studio information',
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    permission: 'livestream',
    created_at: currentTime,
    updated_at: currentTime
  }
]

module.exports = {
  SEED_ROLES,
  PASSWORD,
  SEED_USERS_SUPER_ADMIN,
  SEED_USERS_STUDIO_OWNER,
  SEED_USERS_TEACHER,
  SEED_USERS_STUDENT,
  SEED_STUDIO,
  SEED_PERMISSION
}
