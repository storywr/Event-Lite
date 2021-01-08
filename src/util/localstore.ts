export const ACCESS_TOKEN = 'token'
export const REFRESH_TOKEN = 'refreshToken'

export default {
  clear: () => window.localStorage.clear(),
  get: (key: string) => window.localStorage.getItem(key),
  remove: (key: string) => window.localStorage.removeItem(key),
  set: (key: string, value: any) => window.localStorage.setItem(key, value)
}