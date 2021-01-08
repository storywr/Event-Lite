import { createContext } from 'react'

export const AuthContext = createContext({
  user: null,
  login: (user: string) => {},
  logout: () => {}
})
