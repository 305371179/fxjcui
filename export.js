const fs = require('fs')
const rm = require('rimraf')
const path = require('path')
const componentsPath = path.resolve('./src','fxjcui','extend')
const indexPath = path.resolve(componentsPath,'../','index.js')
const headerStr =
`import base from './base/index'
import toastPlugin from './extend/toast/plugin'
import Vue from 'vue'
Vue.use(base)
Vue.use(toastPlugin)\n
`
const importComponent = (componentName)=>{

  return `const importComponent = (componentName) =>{
  return ()=>import(\`./extend/${componentName}\`)
}\n\n`
}
const  readComponents = ()=>{
  let files = fs.readdirSync(componentsPath)
  files.forEach(item => {
    console.log(item)
  })
  return files
}
const writeIndex = (files)=>{
  let str = headerStr
  str += importComponent('${componentName}')
  files.forEach(item => {
    // str+=`import ${item} from './extend/${item}'\n`
    str+=`const ${item} = importComponent('${item}')\n`
  })
  str += `\nexport {\n`
  files.forEach(item => {
    str+=`  ${item},\n`
  })
  str = str.substr(0,str.length-1)
  str += `\n}`
  fs.writeFileSync(indexPath,str)
}
let files = readComponents()
writeIndex(files)
let copy = (src, dest) => {
  var source = fs.readFileSync(src);
  fs.writeFileSync(dest, source);
}
