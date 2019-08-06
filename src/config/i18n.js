import Vue from 'vue'
import VueI18n from 'vue-i18n'

const en_US = {
  header: {
    HeadMenu: {
      lang: 'English',
      center: 'user center',
      settings: 'user settings',
      test: 'test',
      logout: 'logout',
      a: 'Good morning',
      b: 'Good morning',
      c: 'Good noon',
      d: 'Good afternoon',
      e: 'Good evening'
    }
  },
  routerName: {
    Home: 'Home',
    Discount: 'Discount',
    DiscountList: 'DiscountList',
    Finance: 'Finance',
    Order: 'Order',
    Goods: 'Goods',
    GoodsList: 'GoodsList',
    GoodsSort: 'GoodsSort',
    Record: 'Record',
    Operation: 'Operation',
    Daily: 'Daily',
    Monthly: 'Monthly',
    Stock: 'Stock',
    StockList: 'StockList',
    Purchase: 'Purchase',
    SelfApply: 'SelfApply',
    OthersApply: 'OthersApply',
    System: 'System',
    Mall: 'Mall',
    Member: 'Member',
    Role: 'Role',
    User: 'User',
    Level: 'Level',
    Access: 'Access'
  },
}

const zh_CN = {
  header: {
    HeadMenu: {
      lang: '简体中文',
      center: '用户中心',
      settings: '账户设置',
      test: 'test',
      logout: '退出登录',
      a: '早上好',
      b: '上午好',
      c: '中午好',
      d: '下午好',
      e: '晚上好'
    }
  },
  routerName: {
    Home: '主页',
    Discount: '优惠',
    DiscountList: '优惠列表',
    Finance: '财务',
    Order: '订单管理',
    Goods: '商品',
    GoodsList: '商品列表',
    GoodsSort: '商品分类',
    Record: '记录',
    Operation: '操作日志',
    Daily: '日报',
    Monthly: '月报',
    Stock: '库存',
    StockList: '库存列表',
    Purchase: '采购',
    SelfApply: '本店申请调拨',
    OthersApply: '他店申请调拨',
    System: '管理',
    Mall: '店铺管理',
    Member: '会员管理',
    Role: '角色管理',
    Level: '会员等级',
    User: '用户管理',
    Access: '权限管理'
  },
}

Vue.use(VueI18n)

const messages = {
  en_US,
  zh_CN
}

// 默认语言
const defaultLanguage = 'zh_CN'

const i18n = new VueI18n({
  locale: defaultLanguage,
  fallbackLocale: defaultLanguage,
  messages
})

export default i18n

// 已经import的语言
const loadedLanguages = [defaultLanguage]

// 使用已经缓存的语言设置
if (defaultLanguage !== localStorage.lang) {
  loadLanguageAsync(localStorage.lang)
}

function setI18nLanguage(lang) {
  i18n.locale = lang
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}

export function loadLanguageAsync(lang = defaultLanguage) {
  return new Promise(resolve => {
    // 缓存语言设置
    localStorage.lang = lang
    if (i18n.locale !== lang) {
      if (!loadedLanguages.includes(lang)) {
        return messages[lang].then(msg => {
          i18n.setLocaleMessage(lang, msg.default)
          loadedLanguages.push(lang)
          return setI18nLanguage(lang)
        })
      }
      return resolve(setI18nLanguage(lang))
    }
    return resolve(lang)
  })
}
