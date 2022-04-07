import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Creator from './pages/Creator'
import Finder from './pages/Finder'
import Home from './pages/Home'
import Main from './pages/Main'
import Login from './pages/Login'
import Registration from './pages/Registration'
import { theme } from './Theme'
import Dashboard from "./pages/Dashboard";

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
                        <Route>
                            <Route path='login' element={<Login />} />
                        </Route>
                        <Route>
                            <Route path='registration' element={<Registration />}/>
                        </Route>
                        <Route>
                            <Route path='dashboard' element={<Dashboard />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ChakraProvider>
        </React.StrictMode>
    )
}