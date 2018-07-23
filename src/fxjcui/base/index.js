
import vPage from './pageBox'
import vHeader from './header'
import vButton from './button'
import sLogo from './symbolLogo'
import checkedIcon from './checkedIcon'


export default {
    install (Vue){
        Vue.component('vPage', vPage)
        Vue.component('vHeader', vHeader)
        Vue.component('vButton', vButton)
        Vue.component('sLogo', sLogo)
        Vue.component('checkedIcon', checkedIcon)
    }
}
