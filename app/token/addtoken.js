const jwt = require('jsonwebtoken');
const serect = 'token'; //密钥，不能丢
module.exports = (userinfo) => {
	const token = jwt.sign(
		{
			email: userinfo.email,
			username: userinfo.username
		},
		serect,
        { expiresIn: '1h' }
        // { expiresIn: 1 * 60 } //暂时设置一分钟时长，用来调试
	);
	return token;
};
