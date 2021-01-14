const ls = {
  clear: () => window.localStorage.clear(),
  get: (key: string) => window.localStorage.getItem(key),
  remove: (key: string) => window.localStorage.removeItem(key),
  set: (key: string, value: any) => window.localStorage.setItem(key, value)
}

export default ls