import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import '@fontsource/open-sans/300.css'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Creator from './pages/Creator'
import Finder from './pages/Finder'
import Home from './pages/Home'
import Main from './pages/Main'
import { theme } from './Theme'

export default function App() {

  return (
      <React.StrictMode>
        <ColorModeScript />
        <ChakraProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home />}>
                <Route path='main' element={<Main />} />
                <Route path='create' element={<Creator />} />
                <Route path='find/:partialName' element={<Finder />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ChakraProvider>
      </React.StrictMode>
  )
}