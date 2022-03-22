/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * 登录账号验证  需字母开头 字母结尾 1-11位的包含字母和数字的账号
 * @param {string} str
 * @returns {Boolean}
 */
export function validAgencyAccount(rule, value, callback) {
  const reg = /^[A-Za-z]{1}[A-Za-z0-9]{0,11}$/g;
  if (!reg.test(value)) {
    callback(new Error("需输入以字母开头且包含数字的账号"));
  } else {
    callback();
  }
}

/**
 * @returns {Boolean}
 */
export function validAgencyPwd(rule, value, callback) {
  const reg = /^[A-Za-z0-9]{6,12}$/g;
  if (!reg.test(value.trim())) {
    callback(new Error("请输入6-12位的密码"));
  } else {
    callback();
  }
}

/**
 * @returns {Boolean}
 */
 export function validAgencyPhone(rule, value, callback) {
  const reg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
  if (!reg.test(value)) {
    callback(new Error("请输入正确的11位手机号码"));
  } else {
    callback();
  }
}

