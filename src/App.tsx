import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"
import { hot } from 'react-hot-loader/root'
import Home from './pages'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const App = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <Switch>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </Router>
  </ChakraProvider>
)

export default hot(App)
