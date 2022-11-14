/* eslint-disable quotes */
const moment = require('moment-timezone')
const currentTime = moment().tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss')
const thisMonday = moment().day('Monday').format('YYYY-MM-DD')
const thisTuesday = moment().day('Tuesday').format('YYYY-MM-DD')
const thisWednesday = moment().day('Wednesday').format('YYYY-MM-DD')
const thisThursday = moment().day('Thursday').format('YYYY-MM-DD')
const thisFriday = moment().day('Friday').format('YYYY-MM-DD')
const thisSaturday = moment().day('Saturday').format('YYYY-MM-DD')
const thisSunday = moment().day('Monday').add(6, 'days').format('YYYY-MM-DD')


const SEED_ROLES = [
  { role: 0 }, // super admin
  { role: 10 }, // studio owner
  { role: 11 }, // studio assistant
  { role: 20 }, // teacher
  { role: 50 } // users
]





const PASSWORD = 'test1234'
const SEED_USERS_SUPER_ADMIN = [
  {
    role_id: 1,
    name: 'Root',
    email: 'root@test.com'
  }
]
const SEED_USERS_STUDIO_OWNER = [
  {
    role_id: 2,
    name: 'Lucie',
    email: 'lucie@test.com'
  },
  {
    role_id: 2,
    name: 'Paula',
    email: 'paula@test.com'
  },
  {
    role_id: 2,
    name: 'Marie',
    email: 'marie@test.com'
  },
  {
    role_id: 2,
    name: 'April',
    email: 'april@test.com'
  },
  {
    role_id: 2,
    name: 'Eva',
    email: 'eva@test.com'
  }
]
const SEED_USERS_STUDIO_ASSISTANT = [
  {
    role_id: 3,
    name: 'Rita',
    email: 'rita@test.com'
  },
  {
    role_id: 3,
    name: 'Jackie',
    email: 'jackie@test.com'
  },
  {
    role_id: 3,
    name: 'Ken',
    email: 'ken@test.com'
  },
  {
    role_id: 3,
    name: 'Bobby',
    email: 'bobby@test.com'
  },
  {
    role_id: 3,
    name: 'Stephen',
    email: 'stephen@test.com'
  }
]
const SEED_USERS_TEACHER = [
  {
    role_id: 4,
    name: 'Dora',
    email: 'dora@test.com'
  },
  {
    role_id: 4,
    name: '花花',
    email: 'huahua@test.com'
  },
  {
    role_id: 4,
    name: 'Bella',
    email: 'bella@test.com'
  },
  {
    role_id: 4,
    name: 'Tina',
    email: 'tina@test.com'
  },
  {
    role_id: 4,
    name: 'Kim',
    email: 'kim@test.com'
  },
  {
    role_id: 4,
    name: 'WALI',
    email: 'wali@test.com'
  },
  {
    role_id: 4,
    name: 'Cora',
    email: 'cora@test.com'
  },
  {
    role_id: 4,
    name: 'Hsieh',
    email: 'hsied@test.com'
  },
  {
    role_id: 4,
    name: 'Joe',
    email: 'joe@test.com'
  },
  {
    role_id: 4,
    name: 'Trix',
    email: 'trix@test.com'
  },
  {
    role_id: 4,
    name: 'Derek',
    email: 'derek@test.com'
  },
  {
    role_id: 4,
    name: 'Noe',
    email: 'noe@test.com'
  },
  {
    role_id: 4,
    name: 'Ambee',
    email: 'ambee@test.com'
  },
  {
    role_id: 4,
    name: 'Lydia',
    email: 'lydia@test.com'
  },
  {
    role_id: 4,
    name: 'Sherry',
    email: 'sherry@test.com'
  },
  {
    role_id: 4,
    name: 'Jina',
    email: 'jina@test.com'
  },
  {
    role_id: 4,
    name: '娃娃',
    email: 'wawa@test.com'
  },
  {
    role_id: 4,
    name: 'Flora',
    email: 'flora@test.com'
  },
  {
    role_id: 4,
    name: 'Nana',
    email: 'nana@test.com'
  },
  {
    role_id: 4,
    name: '布布',
    email: 'bubu@test.com'
  },
  {
    role_id: 4,
    name: 'Mahi',
    email: 'mahi@test.com'
  },
  {
    role_id: 4,
    name: 'Iris',
    email: 'iris@test.com'
  },
  {
    role_id: 4,
    name: '依依',
    email: 'yiyi@test.com'
  },
  {
    role_id: 4,
    name: 'Gogo',
    email: 'gogo@test.com'
  },
  {
    role_id: 4,
    name: '布丁',
    email: 'puding@test.com'
  },
  {
    role_id: 4,
    name: 'Vanessa',
    email: 'vanessa@test.com'
  },
  {
    role_id: 4,
    name: 'Shannon',
    email: 'shannon@test.com'
  }
]
const SEED_USERS_STUDENT = [
  {
    role_id: 5,
    name: '子佑',
    email: 'tzuyu@test.com'
  },
  {
    role_id: 5,
    name: '良逸',
    email: 'david@test.com'
  },
  {
    role_id: 5,
    name: '硯竹',
    email: 'yenchu@test.com'
  },
  {
    role_id: 5,
    name: '仰兌',
    email: 'timmy@test.com'
  },
  {
    role_id: 5,
    name: '冠豪',
    email: 'kuan-hao@test.com'
  },
  {
    role_id: 5,
    name: '宣揚',
    email: 'cks@test.com'
  },
  {
    role_id: 5,
    name: '品珊',
    email: 'ps@test.com'
  },
  {
    role_id: 5,
    name: 'shane',
    email: 'shane@test.com'
  }
]





const SEED_PERMISSION = [
  { permission: 'create studio(s)' }, // #1
  { permission: 'delete studio(s)' }, // #2
  { permission: 'update studio(s)' }, // #3
  { permission: 'update dedicated studio information' }, // #4
  { permission: 'create studio price rules' }, // #5
  { permission: 'update studio price rules' }, // #6
  { permission: 'delete studio price rules' }, // #7
  { permission: 'create studio teacher' }, // #8
  { permission: 'update studio teacher' }, // #9
  { permission: 'delete studio teacher' }, // #10
  { permission: 'create studio course/ course_detail' }, // #11
  { permission: 'update studio course/ course_detail' }, // #12
  { permission: 'delete studio course/ course_detail' } // #13
]
const SEED_ROLE_PERMISSION = [
  // super admin
  { role_id: 1, permission_id: 1 },
  { role_id: 1, permission_id: 2 },
  { role_id: 1, permission_id: 3 },
  // studio owner
  { role_id: 2, permission_id: 4 },
  { role_id: 2, permission_id: 5 },
  { role_id: 2, permission_id: 6 },
  { role_id: 2, permission_id: 7 },
  { role_id: 2, permission_id: 8 },
  { role_id: 2, permission_id: 9 },
  { role_id: 2, permission_id: 10 },
  { role_id: 2, permission_id: 11 },
  { role_id: 2, permission_id: 12 },
  { role_id: 2, permission_id: 13 },
  // studio assistant
  { role_id: 3, permission_id: 4 },
  { role_id: 3, permission_id: 8 },
  { role_id: 3, permission_id: 9 },
  { role_id: 3, permission_id: 10 },
  { role_id: 3, permission_id: 11 },
  { role_id: 3, permission_id: 12 },
  { role_id: 3, permission_id: 13 },
  // teacher
  { role_id: 4, permission_id: 9 }
]





const SEED_STUDIO = [
  {
    name: 'Yoga with Lucie',
    logo: 'images/seeder/yogaWithLucie_logo.png',
    introduction_title: 'Yoga with Lucie everywhere',
    introduction_detail: '歡迎來到 Yoga with Lucie， 我認為練習瑜伽最大的改變是：看清楚自己！每個人都有最喜歡的樣貌，盡全力擁抱這個目標吧！',
    introduction_photo: 'images/seeder/yogaWithLucie_intro_photo.jpg',
    subdomain: 'yogaWithLucie',
    manager: 2,
    address: '台北市中山區民生東路6號',
    address_description: '搭乘公車—至「行天宮站」或「民權松江路口」。​搭乘捷運​—「行天宮站」３號出口上來後右轉直行3分鐘',
    phone: '02-23520621',
    tappay_app_key: 'app_42ceHW1wUPSiQznRnLMD34waQICtPxQuVd4BZNwJSzEyaptnudvZZ3vd1gqD',
    tappay_partner_key: 'partner_yHFgi94z4JAhTNh2kJcYLV4qgIDRgIBeCYRx9Km1PuD5JWTwarBagA1H',
    tappay_id: 'yunyahsu_CTBC',
    tappay_app_id: '125713'
  },
  {
    name: 'Today Yoga',
    logo: 'images/seeder/todayYoga_logo.png',
    introduction_title: '讓妳重新愛上鏡中的自己',
    introduction_detail: '瑜珈像是一個起點，串起新的生命旅程，無關乎好壞或對錯，把心專注於當下，Inner peace is the new success!',
    introduction_photo: 'images/seeder/todayYoga_intro_photo.jpg',
    subdomain: 'todayYoga',
    manager: 3,
    address: '臺北市士林區中社路3號',
    address_description: '捷運芝山站2號出口步行約 5 分鐘',
    phone: '02-23058274',
    tappay_app_key: 'app_42ceHW1wUPSiQznRnLMD34waQICtPxQuVd4BZNwJSzEyaptnudvZZ3vd1gqD',
    tappay_partner_key: 'partner_yHFgi94z4JAhTNh2kJcYLV4qgIDRgIBeCYRx9Km1PuD5JWTwarBagA1H',
    tappay_id: 'yunyahsu_CTBC',
    tappay_app_id: '125713'
  },
  {
    name: 'SPACE Wellness',
    logo: 'images/seeder/spaceWellness_logo.png',
    introduction_title: "Let's hang out! Aerial and Yoga Playground",
    introduction_detail: 'Hang in there, hangout with me! 在這裡，我們專注在身心的鍛鍊和平衡、享受與內心自我對話的時刻，結交擁有共同興趣的好友，發掘人生其他的可能。',
    introduction_photo: 'images/seeder/spaceWellness_intro_photo.jpg',
    subdomain: 'spaceWellness',
    manager: 4,
    address: '台北市內湖區潭美街18號',
    address_description: '近成美右岸河濱公園',
    phone: '02-56661622',
    tappay_app_key: 'app_42ceHW1wUPSiQznRnLMD34waQICtPxQuVd4BZNwJSzEyaptnudvZZ3vd1gqD',
    tappay_partner_key: 'partner_yHFgi94z4JAhTNh2kJcYLV4qgIDRgIBeCYRx9Km1PuD5JWTwarBagA1H',
    tappay_id: 'yunyahsu_CTBC',
    tappay_app_id: '125713'
  },
  {
    name: 'AppleTree Studio',
    logo: 'images/seeder/appleTreeStudio_logo.png',
    introduction_title: '馬戲角落新型態的空中體驗',
    introduction_detail: "活在當下，讓千千萬萬的念頭順著走，便能體會到屬於自身的能量與滿滿生命力，Let's yoga together",
    introduction_photo: 'images/seeder/appleTreeStudio_intro_photo.jpg',
    subdomain: 'appleTreeStudio',
    manager: 5,
    address: '台北市大安區芳蘭路23號',
    address_description: '近台大及台科大，捷運「公館」站步行約 15 分鐘',
    phone: '02-39229268',
    tappay_app_key: 'app_42ceHW1wUPSiQznRnLMD34waQICtPxQuVd4BZNwJSzEyaptnudvZZ3vd1gqD',
    tappay_partner_key: 'partner_yHFgi94z4JAhTNh2kJcYLV4qgIDRgIBeCYRx9Km1PuD5JWTwarBagA1H',
    tappay_id: 'yunyahsu_CTBC',
    tappay_app_id: '125713'
  },
  {
    name: 'Amazing Factory',
    logo: 'images/seeder/amazingFactory_logo.png',
    introduction_title: 'Reignite your Yoga Practice with us',
    introduction_detail: '融合古典瑜伽智慧與現代的身心科學並發展出兼具力度、柔軟度、全方位平衡與科學性的瑜伽體系。',
    introduction_photo: 'images/seeder/amazingFactory_intro_photo.jpg',
    subdomain: 'amazingFactory',
    manager: 6,
    address: '台北市文山區開元街12號',
    address_description: '文化三路二段看到月芽月子餐右轉進入，就在富貴森林公園上',
    phone: '02-23491043',
    tappay_app_key: 'app_42ceHW1wUPSiQznRnLMD34waQICtPxQuVd4BZNwJSzEyaptnudvZZ3vd1gqD',
    tappay_partner_key: 'partner_yHFgi94z4JAhTNh2kJcYLV4qgIDRgIBeCYRx9Km1PuD5JWTwarBagA1H',
    tappay_id: 'yunyahsu_CTBC',
    tappay_app_id: '125713'
  }
]

const SEED_TEACHER = [
  // studio 1, total 6 teachers
  {
    name: 'DORA',
    major: '平衡伸展、基礎瑜珈',
    studio_id: 1,
    introduction: 'RYS500. E-RYT200. YACEP美國瑜珈聯盟五百小時、資深兩百小時、繼續教育提供者註冊導師',
    avatar: 'images/seeder/dora.jpg'
  },
  {
    name: '花花',
    major: '核心慢流動、肩胸開展',
    studio_id: 1,
    introduction: 'Association for Yoga and Meditation 瑞詩凱詩最古老瑜珈學校AYM 三百小時認證',
    avatar: 'images/seeder/hua.jpg'
  },
  {
    name: 'BELLA',
    major: '皮拉提斯',
    studio_id: 1,
    introduction: '印度進階瑜珈哲學研習 with Dr. Bhanu',
    avatar: 'images/seeder/bella.jpg'
  },
  {
    name: 'TINA',
    major: '哈達瑜珈',
    studio_id: 1,
    introduction: '印度瑜珈歷史聖地靈修研習 Sattva Retreat & Meditation, India',
    avatar: 'images/seeder/tina.jpg'
  },
  {
    name: 'KIM',
    major: '自我覺察與流動',
    studio_id: 1,
    introduction: '美國YogaFit®瑜珈療法Yoga TherapyI第一級認證、美國YogaFit®修復瑜珈Restorative Yoga第一級認證',
    avatar: 'images/seeder/kim.jpg'
  },
  {
    name: 'WALI',
    major: '正位修復、椅子修復',
    studio_id: 1,
    introduction: '美國In-Trinity Matrix 引全能體課程 亞洲區總教練',
    avatar: 'images/seeder/wali.jpg'
  },





  // studio 2, total 7 teachers
  {
    name: 'Cara',
    major: '寰宇瑜珈',
    studio_id: 2,
    introduction: '2013取得美國瑜珈聯盟Yoga Alliance RYT200合格、2013葆體瑜珈/哈達瑜珈師資研習合格',
    avatar: 'images/seeder/cara.jpg'
  },
  {
    name: 'Hsieh',
    major: '瑜珈提斯',
    studio_id: 2,
    introduction: '美國有氧體適能協會AFAA 墊上核心認證、美國YogaFit Level 1-3合格認證 巴里島',
    avatar: 'images/seeder/hsieh.jpg'
  },
  {
    name: 'Joe',
    major: '伸展瑜珈',
    studio_id: 2,
    introduction: '泰國Sivananda & Chakras Meditation Workshop Thailand希瓦難陀脈輪靜心研習',
    avatar: 'images/seeder/joe.jpg'
  },
  {
    name: 'Trix',
    major: '筋膜瑜珈',
    studio_id: 2,
    introduction: '美國YogaFit®兒童瑜珈YogaFit for Kids認證、美國In-Trinity Matrix 引全能體課程 亞洲區總教練',
    avatar: 'images/seeder/trix.jpg'
  },
  {
    name: 'Derek',
    major: '基礎瑜珈、強化伸展',
    studio_id: 2,
    introduction: 'Association for Yoga and Meditation 瑞詩凱詩最古老瑜珈學校AYM 三百小時認證',
    avatar: 'images/seeder/derek.jpg'
  },
  {
    name: 'Noe',
    major: '舒緩伸展',
    studio_id: 2,
    introduction: 'RYS500. E-RYT200. YACEP美國瑜珈聯盟五百小時、資深兩百小時、繼續教育提供者註冊導師',
    avatar: 'images/seeder/noe.jpg'
  },
  {
    name: 'Ambee',
    major: '舒緩伸展',
    studio_id: 2,
    introduction: '中華民國瑜珈協會瑜珈師資、印度YAI200小時hatha yoga師資',
    avatar: 'images/seeder/ambee.jpg'
  },





  // studio 3, total 5 teachers
  {
    name: 'Noe', // #14
    major: '舒緩伸展、基礎瑜珈',
    studio_id: 3,
    introduction: 'Balletone:Sole Synthesis MBA、Balletone :Standing Flow MBA',
    avatar: 'images/seeder/noe.jpg'
  },
  {
    name: '花花', // #15
    major: '肩胸開展',
    studio_id: 3,
    introduction: 'Yoga Alliance國際認證200小時老師(RYT 200)',
    avatar: 'images/seeder/hua.jpg'
  },
  {
    name: 'Lydia', // #16
    major: '空中瑜珈、舞綢',
    studio_id: 3,
    introduction: 'Iyengar yoga(Peter Scott)200小時、Foundation of yoga Thrap(JamesNewman)',
    avatar: 'images/seeder/lydia.jpg'
  },
  {
    name: 'Sherry', // #17
    major: '空中瑜伽、舞綢、空中環',
    studio_id: 3,
    introduction: 'Ausara yoga 200小時',
    avatar: 'images/seeder/sherry.jpg'
  },
  {
    name: 'Jina', // #18
    major: '原始瑜珈、寰宇瑜珈',
    studio_id: 3,
    introduction: '印度Sri S.Kamal瑜珈師資培訓, Sivanada yoga 30小時、Yoga Fit L1,L2及孕婦瑜珈研習',
    avatar: 'images/seeder/jina.jpg'
  },





  // studio 4, total 6 teachers
  {
    name: '娃娃', // #19
    major: '花式空瑜、空中芭蕾',
    studio_id: 4,
    introduction: '200hrs Teacher Training with Stephen Thomas and Naichin Tang',
    avatar: 'images/seeder/wawa.jpg'
  },
  {
    name: 'Jina', // #20
    major: '地板瑜珈、親子瑜珈',
    studio_id: 4,
    introduction: '印度Sri S.Kamal瑜珈師資培訓, Sivanada yoga 30小時、Yoga Fit L1,L2及孕婦瑜珈研習',
    avatar: 'images/seeder/jina.jpg'
  },
  {
    name: 'Flora', // #21
    major: '和緩流動',
    studio_id: 4,
    introduction: '傳統整復職業工會192小時臨床經驗整復師合格認證、AFAA美國有氧體適能協會墊上核心訓練MAT 證書',
    avatar: 'images/seeder/flora.jpg'
  },
  {
    name: 'Nana', // #22
    major: '瑜珈提斯',
    studio_id: 4,
    introduction: '英國IFA國際芳療師協會認證芳療師、美國 NAHA 國家整體芳療協會芳療師執照',
    avatar: 'images/seeder/nana.jpg'
  },
  {
    name: 'Derek', // #23
    major: '哈達正位、阿斯坦加',
    studio_id: 4,
    introduction: '亞洲體研Pilates師資培訓班研習、樂活瑜珈醫學研習LevelⅠ/ LevelⅡ研習結業',
    avatar: 'images/seeder/derek.jpg'
  },
  {
    name: '布布', // #24
    major: '倒立主題課、火箭瑜珈',
    studio_id: 4,
    introduction: '美國瑜珈聯盟（Yoga Alliance）認可瑜珈指導師 （RYT）200 小時訓練 Dec./2012',
    avatar: 'images/seeder/bubu.jpg'
  },





  // studio 5, total 7 teachers
  {
    name: 'Mahi', // #25
    major: '入門阿斯坦加、陰瑜珈',
    studio_id: 5,
    introduction: '2016/11 200 Hours Hatha Vinyasa Movement Yoga Teacher Training Course (The Yoga Mandala Teacher Training School, Singapore) 新加坡200小時美國瑜伽聯盟師資訓練合格(RYT200)',
    avatar: 'images/seeder/mahi.jpg'
  },
  {
    name: 'Iris', // #26
    major: '哈達瑜珈',
    studio_id: 5,
    introduction: '2016/3 200 Hours Level One Yoga Teacher Training Retreat (Himalayan Yoga Tradition- Teacher Training Program, India)印度喜馬拉雅瑜珈學院(RYS) 200小時師資訓練結業',
    avatar: 'images/seeder/iris.jpg'
  },
  {
    name: '依依', // #27
    major: '核心皮拉提斯',
    studio_id: 5,
    introduction: '美國瑜珈聯盟200小時認證 RYS200 JUN./2008',
    avatar: 'images/seeder/yiyi.jpg'
  },
  {
    name: 'Gogo', // #28
    major: '低空伸展療癒',
    studio_id: 5,
    introduction: '2013 中華民國瑜珈協會 瑜珈教師證照、2014 AFAA MAT 墊上核心證照',
    avatar: 'images/seeder/gogo.jpg'
  },
  {
    name: '布丁', // #29
    major: '脊椎提斯',
    studio_id: 5,
    introduction: "2012-November: Iyengar Yoga workshop with karin O'bannon. 2013-February: Deep Sivananda Yoga Immersion.",
    avatar: 'images/seeder/puding.jpg'
  },
  {
    name: 'Vanessa', // #30
    major: '芳療瑜珈',
    studio_id: 5,
    introduction: '美國瑜珈聯盟200小時認證、Johnny G Spinning 飛輪有氧 三星認證',
    avatar: 'images/seeder/venessa.jpg'
  },
  {
    name: 'Shannon', // #31
    major: '陰陽瑜珈、伸展瑜珈',
    studio_id: 5,
    introduction: 'Sculpt+ 肌力體適能訓練證書 Jan/2017',
    avatar: 'images/seeder/shannon.jpg'
  }
]

const SEED_COURSE = [
  // studio 1, total 14 courses
  {
    title: '平衡伸展',
    studio_id: 1,
    teacher_id: 1,
    user_id: 2,
    point: 2
  },
  {
    title: '基礎瑜珈',
    studio_id: 1,
    teacher_id: 1,
    user_id: 2,
    point: 1
  },
  {
    title: '伸展瑜珈輪',
    studio_id: 1,
    teacher_id: 2,
    user_id: 2,
    point: 3
  },
  {
    title: '髖開展與流動',
    studio_id: 1,
    teacher_id: 2,
    user_id: 2,
    point: 2
  },
  {
    title: '核心慢流動',
    studio_id: 1,
    teacher_id: 2,
    user_id: 2,
    point: 2
  },
  {
    title: '肩胸開展',
    studio_id: 1,
    teacher_id: 2,
    user_id: 2,
    point: 3
  },
  {
    title: '皮拉提斯',
    studio_id: 1,
    teacher_id: 3,
    user_id: 2,
    point: 4
  },
  {
    title: '哈達瑜珈',
    studio_id: 1,
    teacher_id: 4,
    user_id: 2,
    point: 2
  },
  {
    title: '流動與伸展',
    studio_id: 1,
    teacher_id: 5,
    user_id: 2,
    point: 2
  },
  {
    title: '自我察覺與流動',
    studio_id: 1,
    teacher_id: 5,
    user_id: 2,
    point: 3
  },
  {
    title: '缽音療癒瑜珈',
    studio_id: 1,
    teacher_id: 5,
    user_id: 2,
    point: 3
  },
  {
    title: '輔具伸展',
    studio_id: 1,
    teacher_id: 6,
    user_id: 2,
    point: 3
  },
  {
    title: '正位修復',
    studio_id: 1,
    teacher_id: 6,
    user_id: 2,
    point: 2
  },
  {
    title: '椅子瑜珈',
    studio_id: 1,
    teacher_id: 6,
    user_id: 1,
    point: 4
  },






  // studio 2, total 7 courses
  {
    title: '寰宇瑜珈',
    studio_id: 2,
    teacher_id: 7,
    user_id: 3,
    point: 5
  },
  {
    title: '瑜珈提斯',
    studio_id: 2,
    teacher_id: 8,
    user_id: 3,
    point: 3
  },
  {
    title: '伸展瑜珈',
    studio_id: 2,
    teacher_id: 9,
    user_id: 3,
    point: 2
  },
  {
    title: '筋膜瑜珈',
    studio_id: 2,
    teacher_id: 10,
    user_id: 3,
    point: 3
  },
  {
    title: '基礎瑜珈',
    studio_id: 2,
    teacher_id: 11,
    user_id: 3,
    point: 1
  },
  {
    title: '強化伸展',
    studio_id: 2,
    teacher_id: 11,
    user_id: 3,
    point: 2
  },
  {
    title: '舒緩伸展',
    studio_id: 2,
    teacher_id: 12,
    user_id: 3,
    point: 2
  },





  // studio 3, total 9 courses
  {
    title: '舞綢',
    studio_id: 3,
    teacher_id: 16,
    user_id: 4,
    point: 4
  },
  {
    title: '舞綢',
    studio_id: 3,
    teacher_id: 17,
    user_id: 4,
    point: 4
  },
  {
    title: '空中環',
    studio_id: 3,
    teacher_id: 17,
    user_id: 4,
    point: 4
  },
  {
    title: '花式空瑜',
    studio_id: 3,
    teacher_id: 16,
    user_id: 4,
    point: 4
  },
  {
    title: '花式空瑜',
    studio_id: 3,
    teacher_id: 17,
    user_id: 4,
    point: 4
  },
  {
    title: '原始瑜珈',
    studio_id: 3,
    teacher_id: 18,
    user_id: 4,
    point: 3
  },
  {
    title: '胸肩開展',
    studio_id: 3,
    teacher_id: 15,
    user_id: 4,
    point: 3
  },
  {
    title: '舒緩伸展',
    studio_id: 3,
    teacher_id: 14,
    user_id: 4,
    point: 3
  },
  {
    title: '寰宇瑜珈',
    studio_id: 3,
    teacher_id: 18,
    user_id: 4,
    point: 5
  },






  // studio 4, total 10 courses
  {
    title: '花式空瑜',
    studio_id: 4,
    teacher_id: 19,
    user_id: 5,
    point: 3
  },
  {
    title: '空中芭蕾',
    studio_id: 4,
    teacher_id: 19,
    user_id: 5,
    point: 3
  },
  {
    title: '親子瑜珈',
    studio_id: 4,
    teacher_id: 20,
    user_id: 5,
    point: 3
  },
  {
    title: '地板瑜珈',
    studio_id: 4,
    teacher_id: 20,
    user_id: 5,
    point: 2
  },
  {
    title: '和緩流動',
    studio_id: 4,
    teacher_id: 21,
    user_id: 5,
    point: 2
  },
  {
    title: '瑜珈提斯',
    studio_id: 4,
    teacher_id: 22,
    user_id: 5,
    point: 2
  },
  {
    title: '哈達正位',
    studio_id: 4,
    teacher_id: 23,
    user_id: 5,
    point: 2
  },
  {
    title: '阿斯坦加',
    studio_id: 4,
    teacher_id: 23,
    user_id: 5,
    point: 3
  },
  {
    title: '倒立專班',
    studio_id: 4,
    teacher_id: 24,
    user_id: 5,
    point: 3
  },
  {
    title: '火箭瑜珈',
    studio_id: 4,
    teacher_id: 24,
    user_id: 5,
    point: 3
  },





  // studio 5, total 9 courses
  {
    title: '入門阿斯坦加',
    studio_id: 5,
    teacher_id: 25,
    user_id: 6,
    point: 3
  },
  {
    title: '陰瑜珈',
    studio_id: 5,
    teacher_id: 24,
    user_id: 6,
    point: 2
  },
  {
    title: '哈達瑜珈',
    studio_id: 5,
    teacher_id: 26,
    user_id: 6,
    point: 2
  },
  {
    title: '核心皮拉提斯',
    studio_id: 5,
    teacher_id: 27,
    user_id: 6,
    point: 3
  },
  {
    title: '低空瑜珈',
    studio_id: 5,
    teacher_id: 28,
    user_id: 6,
    point: 2
  },
  {
    title: '脊椎提斯',
    studio_id: 5,
    teacher_id: 29,
    user_id: 6,
    point: 3
  },
  {
    title: '芳療瑜珈',
    studio_id: 5,
    teacher_id: 30,
    user_id: 6,
    point: 3
  },
  {
    title: '陰陽瑜珈',
    studio_id: 5,
    teacher_id: 31,
    user_id: 6,
    point: 2
  },
  {
    title: '伸展瑜珈',
    studio_id: 5,
    teacher_id: 31,
    user_id: 6,
    point: 2
  }
]


const SEED_COURSE_DETAIL = [
  // studio 1, total 26 course_detilas
  {
    course_id: 1,
    date: thisMonday,
    start_time: '9:00:00',
    duration: 60,
    is_online: 0,
    limitation: 18,
    online_limitation: 0
  },
  {
    course_id: 2,
    date: thisMonday,
    start_time: '11:00:00',
    duration: 60,
    is_online: 1,
    limitation: 0,
    online_limitation: 25
  },
  {
    course_id: 10,
    date: thisMonday,
    start_time: '14:00:00',
    duration: 60,
    is_online: 0,
    limitation: 15,
    online_limitation: 0
  },
  {
    course_id: 4,
    date: thisMonday,
    start_time: '16:00:00',
    duration: 60,
    is_online: 0,
    limitation: 12,
    online_limitation: 0
  },
  {
    course_id: 12,
    date: thisMonday,
    start_time: '19:00:00',
    duration: 60,
    is_online: 0,
    limitation: 14,
    online_limitation: 0
  },
  {
    course_id: 8,
    date: thisMonday,
    start_time: '21:00:00',
    duration: 60,
    is_online: 0,
    limitation: 15,
    online_limitation: 0
  },
  {
    course_id: 3,
    date: thisTuesday,
    start_time: '10:00:00',
    duration: 60,
    is_online: 0,
    limitation: 17,
    online_limitation: 0
  },
  {
    course_id: 14,
    date: thisTuesday,
    start_time: '15:00:00',
    duration: 60,
    is_online: 0,
    limitation: 20,
    online_limitation: 0
  },
  {
    course_id: 5,
    date: thisTuesday,
    start_time: '19:00:00',
    duration: 60,
    is_online: 0,
    limitation: 15,
    online_limitation: 0
  },
  {
    course_id: 1,
    date: thisWednesday,
    start_time: '10:00:00',
    duration: 60,
    is_online: 0,
    limitation: 15,
    online_limitation: 0
  },
  {
    course_id: 2,
    date: thisWednesday,
    start_time: '11:00:00',
    duration: 60,
    is_online: 1,
    limitation: 0,
    online_limitation: 25
  },
  {
    course_id: 11,
    date: thisWednesday,
    start_time: '20:00:00',
    duration: 60,
    is_online: 0,
    limitation: 16,
    online_limitation: 0
  },
  {
    course_id: 7,
    date: thisThursday,
    start_time: '09:00:00',
    duration: 60,
    is_online: 0,
    limitation: 18,
    online_limitation: 0
  },
  {
    course_id: 1,
    date: thisThursday,
    start_time: '10:00:00',
    duration: 60,
    is_online: 0,
    limitation: 12,
    online_limitation: 0
  },
  {
    course_id: 9,
    date: thisThursday,
    start_time: '16:00:00',
    duration: 60,
    is_online: 1,
    limitation: 0,
    online_limitation: 30
  },
  {
    course_id: 12,
    date: thisThursday,
    start_time: '19:00:00',
    duration: 60,
    is_online: 0,
    limitation: 13,
    online_limitation: 0
  },
  {
    course_id: 13,
    date: thisThursday,
    start_time: '21:00:00',
    duration: 60,
    is_online: 1,
    limitation: 20,
    online_limitation: 5
  },
  {
    course_id: 2,
    date: thisFriday,
    start_time: '09:00:00',
    duration: 60,
    is_online: 1,
    limitation: 18,
    online_limitation: 8
  },
  {
    course_id: 4,
    date: thisFriday,
    start_time: '14:00:00',
    duration: 60,
    is_online: 0,
    limitation: 18,
    online_limitation: 0
  },
  {
    course_id: 5,
    date: thisFriday,
    start_time: '20:00:00',
    duration: 60,
    is_online: 0,
    limitation: 13,
    online_limitation: 0
  },
  {
    course_id: 1,
    date: thisSaturday,
    start_time: '09:00:00',
    duration: 60,
    is_online: 0,
    limitation: 12,
    online_limitation: 0
  },
  {
    course_id: 6,
    date: thisSaturday,
    start_time: '16:00:00',
    duration: 60,
    is_online: 1,
    limitation: 16,
    online_limitation: 8
  },
  {
    course_id: 10,
    date: thisSaturday,
    start_time: '19:00:00',
    duration: 60,
    is_online: 0,
    limitation: 18,
    online_limitation: 0
  },
  {
    course_id: 9,
    date: thisSunday,
    start_time: '09:00:00',
    duration: 60,
    is_online: 1,
    limitation: 12,
    online_limitation: 8
  },
  {
    course_id: 14,
    date: thisSunday,
    start_time: '15:00:00',
    duration: 60,
    is_online: 0,
    limitation: 15,
    online_limitation: 0
  },
  {
    course_id: 13,
    date: thisSunday,
    start_time: '21:00:00',
    duration: 60,
    is_online: 1,
    limitation: 18,
    online_limitation: 12
  },





  // studio 2, total 27 course_detilas
  {
    course_id: 15,
    date: thisMonday,
    start_time: '10:00:00',
    duration: 60,
    is_online: 0,
    limitation: 12,
    online_limitation: 0
  },
  {
    course_id: 17,
    date: thisMonday,
    start_time: '14:00:00',
    duration: 60,
    is_online: 0,
    limitation: 16,
    online_limitation: 0
  },
  {
    course_id: 18,
    date: thisMonday,
    start_time: '20:00:00',
    duration: 60,
    is_online: 1,
    limitation: 16,
    online_limitation: 8
  },
  {
    course_id: 21,
    date: thisMonday,
    start_time: '21:00:00',
    duration: 60,
    is_online: 1,
    limitation: 16,
    online_limitation: 4
  },
  {
    course_id: 16,
    date: thisTuesday,
    start_time: '11:00:00',
    duration: 60,
    is_online: 0,
    limitation: 15,
    online_limitation: 0
  },
  {
    course_id: 15,
    date: thisTuesday,
    start_time: '15:00:00',
    duration: 60,
    is_online: 1,
    limitation: 12,
    online_limitation: 3
  },
  {
    course_id: 16,
    date: thisTuesday,
    start_time: '16:00:00',
    duration: 60,
    is_online: 1,
    limitation: 15,
    online_limitation: 5
  },
  {
    course_id: 18,
    date: thisTuesday,
    start_time: '20:00:00',
    duration: 60,
    is_online: 1,
    limitation: 16,
    online_limitation: 8
  },
  {
    course_id: 15,
    date: thisWednesday,
    start_time: '10:00:00',
    duration: 60,
    is_online: 0,
    limitation: 16,
    online_limitation: 0
  },
  {
    course_id: 17,
    date: thisWednesday,
    start_time: '14:00:00',
    duration: 60,
    is_online: 0,
    limitation: 12,
    online_limitation: 0
  },
  {
    course_id: 20,
    date: thisWednesday,
    start_time: '16:00:00',
    duration: 60,
    is_online: 0,
    limitation: 12,
    online_limitation: 0
  },
  {
    course_id: 19,
    date: thisWednesday,
    start_time: '19:00:00',
    duration: 60,
    is_online: 0,
    limitation: 8,
    online_limitation: 0
  },
  {
    course_id: 16,
    date: thisThursday,
    start_time: '09:00:00',
    duration: 60,
    is_online: 0,
    limitation: 18,
    online_limitation: 0
  },
  {
    course_id: 15,
    date: thisThursday,
    start_time: '15:00:00',
    duration: 60,
    is_online: 1,
    limitation: 12,
    online_limitation: 8
  },
  {
    course_id: 20,
    date: thisThursday,
    start_time: '16:00:00',
    duration: 60,
    is_online: 0,
    limitation: 13,
    online_limitation: 0
  },
  {
    course_id: 21,
    date: thisThursday,
    start_time: '21:00:00',
    duration: 60,
    is_online: 1,
    limitation: 18,
    online_limitation: 8
  },
  {
    course_id: 15,
    date: thisFriday,
    start_time: '10:00:00',
    duration: 60,
    is_online: 0,
    limitation: 12,
    online_limitation: 0
  },
  {
    course_id: 17,
    date: thisFriday,
    start_time: '14:00:00',
    duration: 60,
    is_online: 0,
    limitation: 15,
    online_limitation: 0
  },
  {
    course_id: 19,
    date: thisFriday,
    start_time: '19:00:00',
    duration: 60,
    is_online: 0,
    limitation: 16,
    online_limitation: 0
  },
  {
    course_id: 16,
    date: thisSaturday,
    start_time: '11:00:00',
    duration: 60,
    is_online: 0,
    limitation: 13,
    online_limitation: 0
  },
  {
    course_id: 15,
    date: thisSaturday,
    start_time: '15:00:00',
    duration: 60,
    is_online: 1,
    limitation: 13,
    online_limitation: 7
  },
  {
    course_id: 16,
    date: thisSaturday,
    start_time: '16:00:00',
    duration: 60,
    is_online: 1,
    limitation: 18,
    online_limitation: 4
  },
  {
    course_id: 18,
    date: thisSaturday,
    start_time: '20:00:00',
    duration: 60,
    is_online: 0,
    limitation: 16,
    online_limitation: 0
  },
  {
    course_id: 16,
    date: thisSunday,
    start_time: '11:00:00',
    duration: 60,
    is_online: 0,
    limitation: 12,
    online_limitation: 0
  },
  {
    course_id: 16,
    date: thisSunday,
    start_time: '16:00:00',
    duration: 60,
    is_online: 1,
    limitation: 12,
    online_limitation: 8
  },
  {
    course_id: 18,
    date: thisSunday,
    start_time: '20:00:00',
    duration: 60,
    is_online: 0,
    limitation: 16,
    online_limitation: 0
  },
  {
    course_id: 21,
    date: thisSunday,
    start_time: '21:00:00',
    duration: 60,
    is_online: 0,
    limitation: 15,
    online_limitation: 0
  },





  // studio 3, total 23 course_detilas
  {
    course_id: 22,
    date: thisMonday,
    start_time: '10:00:00',
    duration: 60,
    is_online: 0,
    limitation: 16,
    online_limitation: 0
  },
  {
    course_id: 24,
    date: thisMonday,
    start_time: '14:00:00',
    duration: 60,
    is_online: 0,
    limitation: 12,
    online_limitation: 0
  },
  {
    course_id: 25,
    date: thisMonday,
    start_time: '19:00:00',
    duration: 60,
    is_online: 0,
    limitation: 18,
    online_limitation: 0
  },
  {
    course_id: 27,
    date: thisTuesday,
    start_time: '09:00:00',
    duration: 60,
    is_online: 0,
    limitation: 14,
    online_limitation: 0
  },
  {
    course_id: 23,
    date: thisTuesday,
    start_time: '11:00:00',
    duration: 60,
    is_online: 0,
    limitation: 14,
    online_limitation: 0
  },
  {
    course_id: 29,
    date: thisTuesday,
    start_time: '15:00:00',
    duration: 60,
    is_online: 0,
    limitation: 16,
    online_limitation: 0
  },
  {
    course_id: 26,
    date: thisTuesday,
    start_time: '20:00:00',
    duration: 60,
    is_online: 0,
    limitation: 14,
    online_limitation: 0
  },
  {
    course_id: 27,
    date: thisWednesday,
    start_time: '09:00:00',
    duration: 60,
    is_online: 0,
    limitation: 12,
    online_limitation: 0
  },
  {
    course_id: 22,
    date: thisWednesday,
    start_time: '10:00:00',
    duration: 60,
    is_online: 0,
    limitation: 16,
    online_limitation: 0
  },
  {
    course_id: 28,
    date: thisWednesday,
    start_time: '14:00:00',
    duration: 60,
    is_online: 1,
    limitation: 12,
    online_limitation: 8
  },
  {
    course_id: 24,
    date: thisWednesday,
    start_time: '16:00:00',
    duration: 60,
    is_online: 0,
    limitation: 16,
    online_limitation: 0
  },
  {
    course_id: 26,
    date: thisWednesday,
    start_time: '20:00:00',
    duration: 60,
    is_online: 0,
    limitation: 16,
    online_limitation: 0
  },
  {
    course_id: 23,
    date: thisThursday,
    start_time: '11:00:00',
    duration: 60,
    is_online: 0,
    limitation: 18,
    online_limitation: 0
  },
  {
    course_id: 24,
    date: thisThursday,
    start_time: '16:00:00',
    duration: 60,
    is_online: 0,
    limitation: 15,
    online_limitation: 0
  },
  {
    course_id: 25,
    date: thisThursday,
    start_time: '19:00:00',
    duration: 60,
    is_online: 0,
    limitation: 12,
    online_limitation: 0
  },
  {
    course_id: 22,
    date: thisFriday,
    start_time: '10:00:00',
    duration: 60,
    is_online: 1,
    limitation: 18,
    online_limitation: 6
  },
  {
    course_id: 30,
    date: thisFriday,
    start_time: '15:00:00',
    duration: 60,
    is_online: 0,
    limitation: 14,
    online_limitation: 0
  },
  {
    course_id: 25,
    date: thisFriday,
    start_time: '19:00:00',
    duration: 60,
    is_online: 0,
    limitation: 18,
    online_limitation: 0
  },
  {
    course_id: 23,
    date: thisSaturday,
    start_time: '11:00:00',
    duration: 60,
    is_online: 1,
    limitation: 18,
    online_limitation: 6
  },
  {
    course_id: 26,
    date: thisSaturday,
    start_time: '20:00:00',
    duration: 60,
    is_online: 0,
    limitation: 16,
    online_limitation: 0
  },
  {
    course_id: 30,
    date: thisSunday,
    start_time: '10:00:00',
    duration: 60,
    is_online: 0,
    limitation: 12,
    online_limitation: 0
  },
  {
    course_id: 28,
    date: thisSunday,
    start_time: '14:00:00',
    duration: 60,
    is_online: 1,
    limitation: 15,
    online_limitation: 5
  },
  {
    course_id: 26,
    date: thisSunday,
    start_time: '20:00:00',
    duration: 60,
    is_online: 0,
    limitation: 18,
    online_limitation: 0
  },





  // studio 4, total 26 course_detilas
  {
    course_id: 34,
    date: thisMonday,
    start_time: '10:00:00',
    duration: 60,
    is_online: 0,
    limitation: 12,
    online_limitation: 0
  },
  {
    course_id: 33,
    date: thisMonday,
    start_time: '16:00:00',
    duration: 60,
    is_online: 1,
    limitation: 14,
    online_limitation: 4
  },
  {
    course_id: 31,
    date: thisMonday,
    start_time: '19:00:00',
    duration: 60,
    is_online: 0,
    limitation: 16,
    online_limitation: 0
  },
  {
    course_id: 35,
    date: thisTuesday,
    start_time: '09:00:00',
    duration: 60,
    is_online: 0,
    limitation: 16,
    online_limitation: 0
  },
  {
    course_id: 38,
    date: thisTuesday,
    start_time: '11:00:00',
    duration: 60,
    is_online: 1,
    limitation: 12,
    online_limitation: 6
  },
  {
    course_id: 36,
    date: thisTuesday,
    start_time: '15:00:00',
    duration: 60,
    is_online: 0,
    limitation: 13,
    online_limitation: 0
  },
  {
    course_id: 32,
    date: thisTuesday,
    start_time: '20:00:00',
    duration: 60,
    is_online: 0,
    limitation: 14,
    online_limitation: 0
  },
  {
    course_id: 38,
    date: thisWednesday,
    start_time: '11:00:00',
    duration: 60,
    is_online: 1,
    limitation: 14,
    online_limitation: 4
  },
  {
    course_id: 36,
    date: thisWednesday,
    start_time: '15:00:00',
    duration: 60,
    is_online: 0,
    limitation: 17,
    online_limitation: 0
  },
  {
    course_id: 31,
    date: thisWednesday,
    start_time: '19:00:00',
    duration: 60,
    is_online: 0,
    limitation: 12,
    online_limitation: 0
  },
  {
    course_id: 39,
    date: thisWednesday,
    start_time: '21:00:00',
    duration: 60,
    is_online: 0,
    limitation: 16,
    online_limitation: 0
  },
  {
    course_id: 34,
    date: thisThursday,
    start_time: '10:00:00',
    duration: 60,
    is_online: 0,
    limitation: 16,
    online_limitation: 0
  },
  {
    course_id: 33,
    date: thisThursday,
    start_time: '16:00:00',
    duration: 60,
    is_online: 1,
    limitation: 18,
    online_limitation: 8
  },
  {
    course_id: 32,
    date: thisThursday,
    start_time: '20:00:00',
    duration: 60,
    is_online: 0,
    limitation: 18,
    online_limitation: 0
  },
  {
    course_id: 34,
    date: thisFriday,
    start_time: '10:00:00',
    duration: 60,
    is_online: 0,
    limitation: 16,
    online_limitation: 0
  },
  {
    course_id: 37,
    date: thisFriday,
    start_time: '14:00:00',
    duration: 60,
    is_online: 1,
    limitation: 22,
    online_limitation: 8
  },
  {
    course_id: 37,
    date: thisFriday,
    start_time: '15:00:00',
    duration: 60,
    is_online: 1,
    limitation: 22,
    online_limitation: 8
  },
  {
    course_id: 31,
    date: thisFriday,
    start_time: '19:00:00',
    duration: 60,
    is_online: 0,
    limitation: 12,
    online_limitation: 0
  },
  {
    course_id: 35,
    date: thisSaturday,
    start_time: '09:00:00',
    duration: 60,
    is_online: 0,
    limitation: 13,
    online_limitation: 0
  },
  {
    course_id: 33,
    date: thisSaturday,
    start_time: '16:00:00',
    duration: 60,
    is_online: 0,
    limitation: 18,
    online_limitation: 0
  },
  {
    course_id: 32,
    date: thisSaturday,
    start_time: '20:00:00',
    duration: 60,
    is_online: 0,
    limitation: 18,
    online_limitation: 0
  },
  {
    course_id: 35,
    date: thisSunday,
    start_time: '09:00:00',
    duration: 60,
    is_online: 0,
    limitation: 13,
    online_limitation: 0
  },
  {
    course_id: 40,
    date: thisSunday,
    start_time: '11:00:00',
    duration: 60,
    is_online: 1,
    limitation: 19,
    online_limitation: 5
  },
  {
    course_id: 40,
    date: thisSunday,
    start_time: '14:00:00',
    duration: 60,
    is_online: 1,
    limitation: 19,
    online_limitation: 5
  },
  {
    course_id: 33,
    date: thisSunday,
    start_time: '16:00:00',
    duration: 60,
    is_online: 0,
    limitation: 12,
    online_limitation: 0
  },
  {
    course_id: 39,
    date: thisSunday,
    start_time: '21:00:00',
    duration: 60,
    is_online: 0,
    limitation: 19,
    online_limitation: 0
  },





  // studio 5, total 24 course_detilas
  {
    course_id: 49,
    date: thisMonday,
    start_time: '09:00:00',
    duration: 60,
    is_online: 1,
    limitation: 16,
    online_limitation: 6
  },
  {
    course_id: 43,
    date: thisMonday,
    start_time: '14:00:00',
    duration: 60,
    is_online: 0,
    limitation: 18,
    online_limitation: 0
  },
  {
    course_id: 43,
    date: thisMonday,
    start_time: '15:00:00',
    duration: 60,
    is_online: 0,
    limitation: 18,
    online_limitation: 0
  },
  {
    course_id: 47,
    date: thisMonday,
    start_time: '19:00:00',
    duration: 60,
    is_online: 0,
    limitation: 12,
    online_limitation: 0
  },
  {
    course_id: 41,
    date: thisTuesday,
    start_time: '11:00:00',
    duration: 60,
    is_online: 1,
    limitation: 16,
    online_limitation: 6
  },
  {
    course_id: 45,
    date: thisTuesday,
    start_time: '16:00:00',
    duration: 60,
    is_online: 1,
    limitation: 14,
    online_limitation: 8
  },
  {
    course_id: 46,
    date: thisTuesday,
    start_time: '20:00:00',
    duration: 60,
    is_online: 0,
    limitation: 14,
    online_limitation: 0
  },
  {
    course_id: 46,
    date: thisTuesday,
    start_time: '21:00:00',
    duration: 60,
    is_online: 0,
    limitation: 14,
    online_limitation: 0
  },
  {
    course_id: 49,
    date: thisWednesday,
    start_time: '09:00:00',
    duration: 60,
    is_online: 1,
    limitation: 14,
    online_limitation: 7
  },
  {
    course_id: 41,
    date: thisWednesday,
    start_time: '11:00:00',
    duration: 60,
    is_online: 1,
    limitation: 16,
    online_limitation: 6
  },
  {
    course_id: 47,
    date: thisWednesday,
    start_time: '19:00:00',
    duration: 60,
    is_online: 1,
    limitation: 15,
    online_limitation: 5
  },
  {
    course_id: 42,
    date: thisThursday,
    start_time: '10:00:00',
    duration: 60,
    is_online: 0,
    limitation: 12,
    online_limitation: 0
  },
  {
    course_id: 42,
    date: thisThursday,
    start_time: '15:00:00',
    duration: 60,
    is_online: 0,
    limitation: 12,
    online_limitation: 0
  },
  {
    course_id: 42,
    date: thisThursday,
    start_time: '16:00:00',
    duration: 60,
    is_online: 0,
    limitation: 12,
    online_limitation: 0
  },
  {
    course_id: 42,
    date: thisThursday,
    start_time: '20:00:00',
    duration: 60,
    is_online: 0,
    limitation: 12,
    online_limitation: 0
  },
  {
    course_id: 41,
    date: thisFriday,
    start_time: '11:00:00',
    duration: 60,
    is_online: 0,
    limitation: 16,
    online_limitation: 0
  },
  {
    course_id: 48,
    date: thisFriday,
    start_time: '21:00:00',
    duration: 60,
    is_online: 1,
    limitation: 18,
    online_limitation: 8
  },
  {
    course_id: 49,
    date: thisSaturday,
    start_time: '09:00:00',
    duration: 60,
    is_online: 0,
    limitation: 17,
    online_limitation: 0
  },
  {
    course_id: 41,
    date: thisSaturday,
    start_time: '11:00:00',
    duration: 60,
    is_online: 0,
    limitation: 12,
    online_limitation: 0
  },
  {
    course_id: 45,
    date: thisSaturday,
    start_time: '16:00:00',
    duration: 60,
    is_online: 0,
    limitation: 13,
    online_limitation: 0
  },
  {
    course_id: 48,
    date: thisSaturday,
    start_time: '21:00:00',
    duration: 60,
    is_online: 1,
    limitation: 18,
    online_limitation: 4
  },
  {
    course_id: 49,
    date: thisSunday,
    start_time: '09:00:00',
    duration: 60,
    is_online: 0,
    limitation: 16,
    online_limitation: 0
  },
  {
    course_id: 45,
    date: thisSunday,
    start_time: '16:00:00',
    duration: 60,
    is_online: 0,
    limitation: 19,
    online_limitation: 0
  },
  {
    course_id: 47,
    date: thisSunday,
    start_time: '19:00:00',
    duration: 60,
    is_online: 0,
    limitation: 13,
    online_limitation: 0
  }
]


const SEED_PRICE_RULES = [
  // studio 1 start from here
  {
    studio_id: 1,
    category: '新手體驗',
    price: 500,
    point: 1,
    remark: '當堂體驗課程',
    term: '15',
    publish_at: currentTime,
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    studio_id: 1,
    category: '10 點',
    price: 4500,
    point: 10,
    remark: '個人卡',
    term: '60',
    publish_at: currentTime,
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    studio_id: 1,
    category: '24 點',
    price: 8800,
    point: 24,
    remark: '個人卡',
    term: '120',
    publish_at: currentTime,
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    studio_id: 1,
    category: '60 點',
    price: 17200,
    point: 60,
    remark: '個人卡',
    term: '300',
    publish_at: currentTime,
    created_at: currentTime,
    updated_at: currentTime
  },
  // studio 2 start from here (瑜珈海洋)
  {
    studio_id: 2,
    category: '短期方案 - 10 點',
    price: 2200,
    point: 10,
    remark: '短期方案',
    term: '60',
    publish_at: currentTime,
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    studio_id: 2,
    category: '短期方案 - 22 點',
    price: 4380,
    point: 22,
    remark: '短期方案',
    term: '90',
    publish_at: currentTime,
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    studio_id: 2,
    category: '密集訓練 - 48 點',
    price: 9380,
    point: 48,
    remark: '密集訓練',
    term: '240',
    publish_at: currentTime,
    created_at: currentTime,
    updated_at: currentTime
  },
  // studio 3 start from here (諾瑪)
  {
    studio_id: 3,
    category: '青卡',
    price: 3999,
    point: 6,
    remark: '',
    term: '180',
    publish_at: currentTime,
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    studio_id: 3,
    category: '赤卡',
    price: 7399,
    point: 12,
    remark: '',
    term: '180',
    publish_at: currentTime,
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    studio_id: 3,
    category: '黃卡',
    price: 13199,
    point: 24,
    remark: '',
    term: '365',
    publish_at: currentTime,
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    studio_id: 3,
    category: '白金卡',
    price: 29999,
    point: 60,
    remark: '',
    term: '365',
    publish_at: currentTime,
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    studio_id: 3,
    category: '極黑卡',
    price: 55888,
    point: 125,
    remark: '',
    term: '545',
    publish_at: currentTime,
    created_at: currentTime,
    updated_at: currentTime
  },
  // studio 4 start from here (Sherry Aerial)
  {
    studio_id: 4,
    category: '單堂體驗 - 2 點',
    price: 399,
    point: 2,
    remark: '可約瑜珈、空瑜課程',
    term: '30',
    publish_at: currentTime,
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    studio_id: 4,
    category: '單堂體驗 - 3 點',
    price: 499,
    point: 3,
    remark: '可約空環、舞綢課程',
    term: '30',
    publish_at: currentTime,
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    studio_id: 4,
    category: '單堂體驗 - 4 點',
    price: 599,
    point: 4,
    remark: '可約 1.5 小時課程',
    term: '30',
    publish_at: currentTime,
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    studio_id: 4,
    category: '點數方案 - 16 點',
    price: 2400,
    point: 16,
    remark: '',
    term: '60',
    publish_at: currentTime,
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    studio_id: 4,
    category: '點數方案 - 36 點',
    price: 5220,
    point: 36,
    remark: '',
    term: '120',
    publish_at: currentTime,
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    studio_id: 4,
    category: '點數方案 - 60 點',
    price: 8400,
    point: 60,
    remark: '',
    term: '180',
    publish_at: currentTime,
    created_at: currentTime,
    updated_at: currentTime
  },
  // studio 5 start from here (壹樓)
  {
    studio_id: 5,
    category: '單堂',
    price: 500,
    point: 1,
    remark: '',
    term: '30',
    publish_at: currentTime,
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    studio_id: 5,
    category: '3 堂',
    price: 1425,
    point: 3,
    remark: '',
    term: '30',
    publish_at: currentTime,
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    studio_id: 5,
    category: '4 堂',
    price: 1800,
    point: 4,
    remark: '',
    term: '30',
    publish_at: currentTime,
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    studio_id: 5,
    category: '6 堂',
    price: 2550,
    point: 6,
    remark: '',
    term: '30',
    publish_at: currentTime,
    created_at: currentTime,
    updated_at: currentTime
  },
  {
    studio_id: 5,
    category: '8 堂',
    price: 3200,
    point: 8,
    remark: '',
    term: '30',
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
  SEED_USERS_STUDIO_ASSISTANT,
  SEED_USERS_TEACHER,
  SEED_USERS_STUDENT,

  SEED_PERMISSION,
  SEED_ROLE_PERMISSION,

  SEED_STUDIO,
  SEED_TEACHER,
  SEED_COURSE,
  SEED_COURSE_DETAIL,
  SEED_PRICE_RULES
}
