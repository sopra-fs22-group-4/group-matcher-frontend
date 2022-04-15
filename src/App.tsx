import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import '@fontsource/dm-sans/400.css'
import '@fontsource/manrope/400.css'
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
              <Route path='create-question' element={<QuestionCreator />} />
              <Route path='/matchers/:matcherId'>
                <Route index element={<Matcher />} />
              </Route>
              <Route path='*' element={<Error/>}/>
            </Routes>
          </BrowserRouter>
        </ChakraProvider>
      </React.StrictMode>
  )
}