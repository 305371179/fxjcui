// export const importComponent = (componentName) =>{
//  return ()=>import(`../../examples/${componentName}`)
// }
// let names = []
// export const routesCreator = () =>{
//   let contexts =require.context('../../examples', true, /\.vue/);
//   let result =[]
//   contexts.keys().forEach((key) => {
//     let match = /\.\/(.*)\/index\.vue$/.exec(key); //把包路径名变成导出名
//     if(match){
//       let name = match[1]
//       let func = contexts(key).default;
//       if(typeof(func)!="undefined"){
//         // console.log(name[1])
//         names.push(name)
//         result.push({
//           path:`/${name}`,
//           name: `${name}`,
//           component:importComponent(name)
//         })
//       }
//     }
//   });
//   return result
// }
import actionSheet from '../../examples/actionSheet'
import button from '../../examples/button'
import cell from '../../examples/cell'
import header from '../../examples/header'
import tabFilter from '../../examples/tabFilter'
import tabItem from '../../examples/tabItem'
import tabSelect from '../../examples/tabSelect'
import typographic from '../../examples/typographic'





const names = {
  actionSheet,
  button,
  cell,
  header,
  tabFilter,
  tabItem,
  tabSelect,
  typographic
}
console.log(names)
const cns = []
const keys = []
for(let k in names){
  cns.push({
    name:k,
    path:`/${k}`,
    component: names[k]
  })
  keys.push(k)
}
export const routes = cns
export const componentsName = keys

