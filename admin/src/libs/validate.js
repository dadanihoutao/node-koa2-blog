/**
 * @Author: 时洋
 * @Last Modified by: shiyang
 * @Last Modified time: 2019-05-10 14:39:06
 */
export const regular = {
	// 验证自然数
	naturalNumber: /^(([0-9]*[1-9][0-9]*)|0)$/,
	naturalNumberMsg: '请输入自然数',
	// 微信号
	wechat: /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/,
	wechatMsg: '请输入正确的微信号码',
	// 英文
	english: /^.[A-Za-z]+$/,
	englishMsg: '请输入英文字符',
	// 手机
	mobile: /^\d{11}$/,
	mobileMsg: '请输入正确的手机号码',
	// 座机
	telephone: /^\d{3}-\d{7,8}|\d{4}-\d{7,8}$/,
	telephoneMsg: '请输入正确的座机号',
	// 手机和座机
	mobileTel: /^(0[0-9]{2,3}-)?([2-9][0-9]{6,7})+(-[0-9]{1,4})?$|(^\d{5,14}$)/,
	mobileTelMsg: '请输入正确的手机号码或固定电话号码',
	// 银行卡号码
	bankCard: /^[1-9]\d{9,19}$/,
	bankCardMsg: '请输入正确的银行卡号码',
	// 证件号码
	IDNumber: /^[a-z0-9A-Z]{0,50}$/,
	IDNumberMsg: '请输入正确的证件号码',
	// 身份证号码,包括15位和18位的
	IDCard: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{7}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/,
	IDCardMsg: '请输入正确的身份证号码',
	// QQ号码
	qq: /^[1-9]\d{4,11}$/,
	qqMsg: '请输入正确的QQ号码',
	// 网址, 仅支持http和https开头的
	url: /^(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?$/,
	urlMsg: '请输入以http和https开头的网址',
	// 接口地址
	portUrl: /^[/]{1}[a-z0-9A-Z/?=_&]+$/,
	portUrlMsg: '请输入正确的接口地址',
	// 字段
	field: /^[a-z0-9A-Z_-]+$/,
	fieldMsg: '请输入字段格式',
	// 0到10位的中文字符
	cn0to10: /^[\u4E00-\u9FA5]{0,10}$/,
	cn0to10Msg: '请输入10位以内的中文字符',
	// 0到32位的中文字符
	cn2to32: /^[\u4E00-\u9FA5]{0,32}$/,
	cn2to32Msg: '请输入32位以内的中文字符',
	// 0到50位的中文字符
	cn2to50: /^[\u4E00-\u9FA5]{0,50}$/,
	cn2to50Msg: '请输入50位以内的中文字符',
	// 0到10位的英文字符和数字
	enNum0to10: /^[a-z0-9A-Z]{0,10}$/,
	enNum0to10Msg: '请输入10位以内的英文字符和数字',
	// 0到20位的英文字符和数字
	enNum0to20: /^[a-z0-9A-Z]{0,20}$/,
	enNum0to20Msg: '请输入20位以内的英文字符和数字',
	// 0到30位的英文字符和数字
	enNum0to30: /^[a-z0-9A-Z]{0,30}$/,
	enNum0to30Msg: '请输入30位以内的英文字符和数字',
	// 0到32位的英文字符和数字
	enNum0to32: /^[a-z0-9A-Z]{0,32}$/,
	enNum0to32Msg: '请输入32位以内的英文字符和数字',
	// 0到40位的英文字符和数字
	enNum0to40: /^[a-z0-9A-Z]{0,40}$/,
	enNum0to40Msg: '请输入40位以内的英文字符和数字',
	// 1到5位的中英文字符和数字
	cnEnNum1to5: /^[a-z0-9A-Z\u4E00-\u9FA5]{1,5}$/,
	cnEnNum1to5Msg: '请输入5位以内的中英文字符和数字',
	// 1到20位的中英文字符和数字
	cnEnNum1to20: /^[a-z0-9A-Z\u4E00-\u9FA5]{1,20}$/,
	cnEnNum1to20Msg: '请输入20位以内的中英文字符和数字',
	// 1到25位的中英文字符和数字
	cnEnNum1to25: /^[a-z0-9A-Z\u4E00-\u9FA5]{1,25}$/,
	cnEnNum1to25Msg: '请输入25位以内的中英文字符和数字',
	// 2到100位的英文字符和空格
	enSpace2to100: /^[a-zA-Z\s*]{2,100}$/,
	enSpace2to100Msg: '请输入2到100位的英文字符和空格',
	// 2到100位的中英文字符和空格
	cnEnSpace2to100: /^[a-zA-Z\u4E00-\u9FA5\s*]{2,100}$/,
	cnEnSpace2to100Msg: '请输入2到100位的中英文字符和空格',
	// 数字、英文和换行符
	numEnBr: /^[a-z0-9A-Z\n*]+$/,
	numEnBrMsg: '仅支持数字、英文和换行，请重新输入',
	// 数字和换行符
	numLinefeed: /^[0-9\n*]+$/,
	numLinefeedMsg: '请输入数字和换行符',
	// 0到30位的英文字符、数字和下划线
	enNumLine0to30: /^[a-z0-9A-Z_]{0,30}$/,
	enNumLine0to30Msg: '请输入30位以内的英文字符、数字和下划线',
	// 2到30位以内的字符
	char2to30: /^[\s\S]{2,30}$/,
	char2to30Msg: '请输入2到30位以内的字符',
	// 32位以内的字符
	char0to32: /^[\s\S]{0,32}$/,
	char0to32Msg: '请输入32位以内的字符',
	// 50位以内的字符
	char0to50: /^[\s\S]{0,50}$/,
	char0to50Msg: '请输入50位以内的字符',
	// 150位以内的字符
	char0to150: /^[\s\S]{0,150}$/,
	char0to150Msg: '请输入150位以内的字符',
	// 200位以内的字符
	char0to200: /^[\s\S]{0,200}$/,
	char0to200Msg: '请输入200位以内的字符',
	// 255位以内的字符
	char0to255: /^[\s\S]{0,255}$/,
	char0to255Msg: '请输入255位以内的字符',
	// 0到255的数字
	num0to255: /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]?[0-9])$/,
	num0to255Msg: '请输入0到255的数字',
	// 不包含空格
	noSpace: /^((?!\s).)*$/,
	noSpaceMsg: '请输入不包含空格的字符',
	// 特殊字符
	specialChar: /^[^`~!@#$^&*=|{}':;'/\\[\]<>?]*$/,
	specialCharMsg: '请删除特殊字符',
	// 保留两位小数
	twoDecimal: /^(([0-9][0-9]*)|(([0]\.\d{1,2}|[0-9][0-9]*\.\d{1,2})))$/,
	twoDecimalMsg: '小数点保留最多两位',
	// 不以零开头的数字
	mustNumber: /^[1-9]\d*$/,
	mustNumberMsg: '请输入不是零开头的数字'
};
/**
   * @description 排序值验证，排序值不可以大于255
   */
export const validateOrder = function(rule, value, callback) {
	if (parseInt(value) > 255) {
		return callback(new Error('排序值不可以大于255'));
	} else {
		callback();
	}
};
/**
   * @description 字符验证，不能超过50个字符
   */
export const validate50char = function(rule, value, callback) {
	if (value && value.length > 50) {
		return callback(new Error('不能超过50个字符'));
	} else {
		callback();
	}
};
/**
   * @description 字符验证，2到50个字符
   */
export const validate2to50char = function(rule, value, callback) {
	if (value && (value.length > 50 || value.length < 2)) {
		return callback(new Error('请输入2到50个字符'));
	} else {
		callback();
	}
};
