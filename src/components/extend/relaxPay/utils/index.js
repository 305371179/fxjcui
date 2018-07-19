export function closeRelaxPay(cardList, userInfo){
  // 关闭小额轻松付
  if(cardList.normal && cardList.normal.length > 0){
    // 在当前页面弹过框，不重复获取数据
    return ;
  }
  if(userInfo.userLogonType == "00"){
    // 判断是否完整注册用户
    
  }else{
     //简易注册用户，跳到简易注册加挂卡片页面
     App.Native.pushWindow({
      url: '/cards/cdbank_add_credit/index.html'
    })
  }
}