import { getAction } from '@/api/manage'
import { ENCRYPTED_STRING } from "@/store/mutation-types"
import Vue from 'vue'

/**
 * 获取加密字符串，并对结果进行缓存
 */
export function getEncryptedString() {
  return getAction("/sys/getEncryptedString",{}).then((res)=>{
    let encryptedString = {};
    encryptedString.key = res.result.key;
    encryptedString.iv = res.result.iv;
    Vue.ls.set(ENCRYPTED_STRING, encryptedString, 7 * 24 * 60 * 60 * 1000);
    return encryptedString;
  });
}

/**
 * AES加密 ：字符串 key iv  返回base64
 */
export function encryption(word, keyStr, ivStr) {

  let key = CryptoJS.enc.Utf8.parse(keyStr)
  let iv = CryptoJS.enc.Utf8.parse(ivStr)

  let srcs = CryptoJS.enc.Utf8.parse(word);
  var encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  });
  // console.log("-=-=-=-", encrypted.ciphertext)
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);

}
