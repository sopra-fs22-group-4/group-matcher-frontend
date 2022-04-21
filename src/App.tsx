import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import '@fontsource/dm-sans/400.css'
import '@fontsource/dm-sans/500.css'
import '@fontsource/dm-sans/700.css'
import 'assets/PrimeReactTheme.css'
import 'primeicons/primeicons.css'
import 'primereact/resources/primereact.min.css'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Error from './pages/Error'
import Home from './pages/Home'
import Login from './pages/Login'
import Matcher from './pages/Matcher'
import MatcherCreator from './pages/MatcherCreator'
import QuestionCreator from './pages/QuestionCreator'
import Register from './pages/Register'
import { theme } from './Theme'

export default function App() {

  return (
      <React.StrictMode>
        <ColorModeScript/>
        <ChakraProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/login' element={<Login />}/>
              <Route path='/register' element={<Register />}/>
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/create-matcher' element={<MatcherCreator />} />
              <Route path='/matchers/:matcherId'>
                <Route index element={<Matcher />} />
                <Route path='create-question' element={<QuestionCreator />} />
              </Route>
              <Route path='*' element={<Error/>}/>
            </Routes>
          </BrowserRouter>
        </ChakraProvider>
      </React.StrictMode>
  )
}