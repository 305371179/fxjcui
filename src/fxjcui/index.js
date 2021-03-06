import base from './base/index'
import Vue from 'vue'
Vue.use(base)

const importComponent = (componentName) =>{
  return ()=>import(`./extend/${componentName}`)
}

const Bscroll = importComponent('Bscroll')
const actionSheet = importComponent('actionSheet')
const cell = importComponent('cell')
const cellInput = importComponent('cellInput')
const checkbox = importComponent('checkbox')
const globalBigButton = importComponent('globalBigButton')
const globalButtonMultiple = importComponent('globalButtonMultiple')
const group = importComponent('group')
const inlineSwitch = importComponent('inlineSwitch')
const msgCode = importComponent('msgCode')
const numberKeyboard = importComponent('numberKeyboard')
const selectItem = importComponent('selectItem')
const tabFilter = importComponent('tabFilter')
const tabItem = importComponent('tabItem')
const tabSelect = importComponent('tabSelect')
const tradeButton = importComponent('tradeButton')

export const components={
  Bscroll,
  actionSheet,
  cell,
  cellInput,
  checkbox,
  globalBigButton,
  globalButtonMultiple,
  group,
  inlineSwitch,
  msgCode,
  numberKeyboard,
  selectItem,
  tabFilter,
  tabItem,
  tabSelect,
  tradeButton,
}

export const allIn = {
  install(Vue){
    for(let k in components){
      Vue.component(k,components[k])
    }

  }
}
