export const importComponent = (componentName) =>{
 return ()=>import(`../../examples/${componentName}`)
}
export const routesCreator = () =>{
  let contexts =require.context('../../examples', true, /\.vue/);
  let result =[]
  contexts.keys().forEach((key) => {
    let match = /\.\/(.*)\/index\.vue$/.exec(key); //把包路径名变成导出名
    if(match){
      let name = match[1]
      let func = contexts(key).default;
      if(typeof(func)!="undefined"){
        // console.log(name[1])
        result.push({
          path:`/${name}`,
          name: `${name}`,
          component:importComponent(name)
        })
      }
    }
  });
  return result
}
// routesCreator()



