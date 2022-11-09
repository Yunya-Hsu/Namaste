const currentTime = require('moment-timezone')().tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss')

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
    name: 'Root',
    email: 'root@test.com',
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
    name: 'Azole Lai',
    email: 'azole_lai@test.com',
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
    name: '子佑',
    email: 'tzuyu@test.com',
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    name: 'David',
    email: 'david@test.com',
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    name: 'Yenchu',
    email: 'yenchu@test.com',
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    name: 'Timmy',
    email: 'timmy@test.com',
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    name: 'Kuan Hao',
    email: 'kuan-hao@test.com',
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    name: 'cks',
    email: 'cks@test.com',
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    name: 'ps',
    email: 'ps@test.com',
    created_at: currentTime,
    updated_at: currentTime
  },
  {
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
    permission: 'create studio(s)',
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    permission: 'delete studio(s)',
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    permission: 'update studio(s)',
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    permission: 'update dedicated studio information',
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    permission: 'create studio price rules',
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    permission: 'update studio price rules',
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    permission: 'delete studio price rules',
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    permission: 'create studio teacher',
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    permission: 'update studio teacher',
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    permission: 'delete studio teacher',
    created_at: currentTime,
    updated_at: currentTime
  }
]



const SEED_TEACHER = [
  {
    name: '賴賴',
    major: '伸展瑜珈、哈達瑜珈',
    studio_id: '1',
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    name: '賴賴',
    major: '哈達瑜珈',
    studio_id: '2',
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    name: 'Dora',
    major: '哈達瑜珈',
    studio_id: '3',
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    name: 'Dora',
    major: '基礎新手班',
    studio_id: '4',
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    name: 'Johnny',
    major: '孕婦瑜珈',
    studio_id: '2',
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    name: 'Andrew',
    major: '孕婦瑜珈，基礎伸展',
    studio_id: '4',
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    name: 'Stella',
    major: '瑜珈入門',
    studio_id: '1',
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    name: 'Joyce',
    major: '瑜珈入門',
    studio_id: '2',
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    name: 'Joyce',
    major: '體態雕塑、瑜珈入門',
    studio_id: '5',
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    name: 'Min',
    major: '皮拉提斯',
    studio_id: '2',
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    name: 'Min',
    major: '舒壓療癒',
    studio_id: '3',
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    name: 'Min',
    major: '皮拉提斯、墊上療癒',
    studio_id: '5',
    created_at: currentTime,
    updated_at: currentTime
  }
]



const SEED_COURSE = [
  {
    title: '溫和瑜珈',
    studio_id: 1,
    teacher_id: 1,
    user_id: 6,
    point: 3,
    is_published: 1,
    publish_at: currentTime,
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    title: '陰陽瑜珈',
    studio_id: 1,
    teacher_id: 1,
    user_id: 6,
    point: 4,
    is_published: 1,
    publish_at: currentTime,
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    title: '伸展瑜珈',
    studio_id: 1,
    teacher_id: 1,
    user_id: 6,
    point: 3,
    is_published: 1,
    publish_at: currentTime,
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    title: '流動瑜珈',
    studio_id: 1,
    teacher_id: 7,
    user_id: 10,
    point: 4,
    is_published: 1,
    publish_at: currentTime,
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    title: '瑜珈提斯',
    studio_id: 1,
    teacher_id: 7,
    user_id: 10,
    point: 3,
    is_published: 1,
    publish_at: currentTime,
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    title: '流動瑜珈',
    studio_id: 2,
    teacher_id: 2,
    user_id: 6,
    point: 4,
    is_published: 1,
    publish_at: currentTime,
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    title: '流動瑜珈',
    studio_id: 2,
    teacher_id: 2,
    user_id: 6,
    point: 4,
    is_published: 1,
    publish_at: currentTime,
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    title: '修復瑜珈',
    studio_id: 2,
    teacher_id: 5,
    user_id: 8,
    point: 3,
    is_published: 1,
    publish_at: currentTime,
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    title: '手倒立專班',
    studio_id: 2,
    teacher_id: 8,
    user_id: 11,
    point: 5,
    is_published: 1,
    publish_at: currentTime,
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    title: '樂齡瑜珈',
    studio_id: 2,
    teacher_id: 10,
    user_id: 12,
    point: 4,
    is_published: 1,
    publish_at: currentTime,
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    title: '正位瑜珈',
    studio_id: 2,
    teacher_id: 10,
    user_id: 12,
    point: 4,
    is_published: 1,
    publish_at: currentTime,
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    title: '孕婦瑜珈',
    studio_id: 3,
    teacher_id: 3,
    user_id: 7,
    point: 5,
    is_published: 1,
    publish_at: currentTime,
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    title: '皮拉提斯',
    studio_id: 3,
    teacher_id: 11,
    user_id: 12,
    point: 4,
    is_published: 1,
    publish_at: currentTime,
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    title: '初學者瑜珈',
    studio_id: 3,
    teacher_id: 11,
    user_id: 12,
    point: 4,
    is_published: 1,
    publish_at: currentTime,
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    title: '溫和瑜珈',
    studio_id: 4,
    teacher_id: 4,
    user_id: 7,
    point: 3,
    is_published: 1,
    publish_at: currentTime,
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    title: '溫和伸展',
    studio_id: 4,
    teacher_id: 4,
    user_id: 7,
    point: 3,
    is_published: 1,
    publish_at: currentTime,
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    title: '皮拉提斯',
    studio_id: 4,
    teacher_id: 6,
    user_id: 9,
    point: 5,
    is_published: 1,
    publish_at: currentTime,
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    title: '燃脂雕塑',
    studio_id: 4,
    teacher_id: 6,
    user_id: 9,
    point: 5,
    is_published: 1,
    publish_at: currentTime,
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    title: '滾筒療癒',
    studio_id: 5,
    teacher_id: 9,
    user_id: 11,
    point: 4,
    is_published: 1,
    publish_at: currentTime,
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    title: '伸展瑜珈',
    studio_id: 5,
    teacher_id: 12,
    user_id: 12,
    point: 4,
    is_published: 1,
    publish_at: currentTime,
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
  SEED_PERMISSION,
  SEED_TEACHER,
  SEED_COURSE
}
