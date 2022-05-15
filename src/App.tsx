import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import '@fontsource/dm-sans/400.css'
import '@fontsource/dm-sans/500.css'
import '@fontsource/dm-sans/700.css'
import 'assets/PrimeReactTheme.css'
import 'primeicons/primeicons.css'
import 'primereact/resources/primereact.min.css'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/admin/Dashboard'
import Matcher from './pages/admin/Matcher'
import MatcherCreator from './pages/admin/MatcherCreator'
import Matchers from './pages/admin/Matchers'
import Overview from './pages/admin/Overview'
import Profile from './pages/admin/Profile'
import QuestionCreator from './pages/admin/QuestionCreator'
import Students from './pages/admin/Students'
import Error from './pages/Error'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Quiz from './pages/students/Quiz'
import QuizAuth from './pages/students/QuizAuth'
import Verify from './pages/Verify'
import { theme } from './Theme'

export default function App() {

  return (
      <React.StrictMode>
        <ColorModeScript/>
        <ChakraProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/login' element={<Login />}/>
              <Route path='/register' element={<Register />}/>
              <Route path='/verify/:adminId' element={<Verify />}/>
              <Route path='/dashboard' element={<Dashboard />}>
                <Route index element={<Overview />} />
                <Route path='profile' element={<Profile />} />
                <Route path='matchers' element={<Matchers />} />
                <Route path='matchers/create' element={<MatcherCreator />} />
                <Route path='matchers/:matcherId'>
                  <Route index element={<Matcher />} />
                  <Route path='students' element={<Students />} />
                  <Route path='questions/create' element={<QuestionCreator />} />
                </Route>
              </Route>
              <Route path='/matchers/:matcherId' element={<QuizAuth />} />
              <Route path='/matchers/:matcherId/quiz' element={<Quiz />} />
              <Route path='*' element={<Error/>}/>
            </Routes>
          </BrowserRouter>
        </ChakraProvider>
      </React.StrictMode>
  )
}
