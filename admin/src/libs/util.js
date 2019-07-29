import Cookies from 'js-cookie'
const config = {
	cookieExpires: 1 // token在Cookie中存储的天数，默认1天
}
export const TOKEN_KEY = 'token'

export const setToken = (token) => {
	Cookies.set(TOKEN_KEY, token, { expires: config.cookieExpires || 1 })
}

export const getToken = () => {
	const token = Cookies.get(TOKEN_KEY)
	if (token) return token
	else return false
}
