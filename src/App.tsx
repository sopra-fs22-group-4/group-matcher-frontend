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
import Matchers from './pages/admin/Matchers'
import Overview from './pages/admin/Overview'
import Error from './pages/Error'
import Home from './pages/Home'
import Login from './pages/Login'
import MatcherCreator from './pages/MatcherCreator'
import QuestionCreator from './pages/QuestionCreator'
import Register from './pages/Register'
import MatcherQuiz from './pages/students/MatcherQuiz'
import StudentAccess from './pages/students/StudentAccess'
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
                <Route path='create-matcher' element={<MatcherCreator />} />
                <Route path='matchers' element={<Matchers />} />
                <Route path='matchers/:matcherId' element={<Matcher />} />
                <Route path='matchers/:matcherId/create-question' element={<QuestionCreator />} />
              </Route>
              <Route path='/matchers/:matcherId' element={<StudentAccess />} />
              <Route path='/matchers/:matcherId/quiz' element={<MatcherQuiz />} />
              <Route path='*' element={<Error/>}/>
            </Routes>
          </BrowserRouter>
        </ChakraProvider>
      </React.StrictMode>
  )
}
