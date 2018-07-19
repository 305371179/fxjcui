export default {
	/**
	 * @desc  字段匹配
	 */ 
	 sourceString(moduleId) {
		switch(moduleId) {
		  case "cdbank_bill_instalment":
			return  'billInstalmenBonusInstalment';
			break;
		  case "cdbank_expense_instalment":
			return  'expense_instalmentBonusInstalment';
			break;
		  case "cdbank_eppc_general":
			return  'eppcGeneralBonusInstalment';
			break;
		}
	},
	/**
	 * @desc 获取模块对应营销平台的code码
	 */
	returnCode(id) {
		let code = '';
		switch (id) {
			//每次新增一个模块,要新增
			case 'cdbank_eppc_general':
				{ //模块名
				return	code = '1001'; //营销平台MHYC35对应的模块ID
					break;
				};
			case 'cdbank_eppc_share':
				{
				return	code = '1002';
					break;
				};
			case 'cdbank_expense_instalment':
				{
				return	code = '1003';
					break;
				};
			case 'cdbank_automatic_instalment':
				{
				return	code = '1004';
					break;
				};
			case 'cdbank_quick_repay':
				{
				return	code = '1005';
					break;
				};
			case 'cdbank_bill_instalment':
				{
				return	code = '1006';
					break;
				};
			case 'cdbank_limit_apply':
				{
				return	code = '1007';
					break;
				};
			case 'cdbank_card_activate':
				{
				return	code = '1008';
					break;
				};
			case 'cdbank_phone_recharging':
				{
				return	code = '1009';
					break;
				};
			case 'cdbank_donate_integral':
				{
				return	code = '1010';
					break;
				};
			case 'cdbank_donate_fund':
				{
				return	code = '1011';
					break;
				};
			case 'cdbank_card_newactivate':
				{ 
				return	code = '1015';
					break;
				};
			case 'cdbank_my_grade':
				{
				return	code = '1016';
					break;
				};
			case 'cdbank_dimension_code':
				{
				return	code = '1017';
					break;
				};
				/* case 'cdbank_card_newactivate01' : {  //简易注册用户首次绑卡新增广告位-董寒冰
			 code = '1033';
			 break;
		 }	*/
			default:
				{
					break;
				}

		}
	},
	/**
	 * @desc 未知作用，照搬代码
	 */
	Pos: class Pos {
    constructor() {
      this.pagePos = 0;
    }
	setPos(val) {
		this.pagePos = val;
	}
	getPos() {
		return this.pagePos
	}
  },
}