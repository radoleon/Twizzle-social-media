import { Routes, Route, Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { createTheme, ThemeProvider } from "@mui/material"
import { useUserContext } from "./hooks/useUserContext"
import { auth } from "./firebase/config"
import Loader from "./components/Loader"
import { onAuthStateChanged } from "firebase/auth"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

import { teal, grey } from "@mui/material/colors"

const themeLight = createTheme({
    palette: {
        primary: teal,
        secondary: { main: "#fff" },
        background: {
            default: grey[400],
            paper: grey[200]
        },
        text: {
            primary: "#000",
            secondary: "rgba(0, 0, 0, 0.5)",
            icon: "#000"
        }
    }
})

const themeDark = createTheme({
    palette: {
        primary: teal,
        secondary: { main: grey[900] },
        background: {
            default: grey[600],
            paper: grey[800]
        },
        text: {
            primary: "#fff",
            secondary: "rgba(255, 255, 255, 0.5)",
            icon: "#fff"
        }
    }
})

export default function App() {

    const [darkMode, setDarkMode] = useState(() => {
        if (localStorage.getItem("DARK_THEME") !== null) {
            return JSON.parse(localStorage.getItem("DARK_THEME"))
        }
        else return false
    })

    const [authIsPending, setAuthIsPending] = useState(true)
    const { user, setUser } = useUserContext()

    useEffect(() => {
        localStorage.setItem("DARK_THEME", JSON.stringify(darkMode))
    }, [darkMode])

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) setUser(user.uid)
            setAuthIsPending(false)
            
            unsubscribe()
        })
    }, [])
    
    return (
        <div 
            style={{ 
                minHeight: "100vh", 
                background: darkMode ? themeDark.palette.secondary.main : themeLight.palette.secondary.main
            }}
        >
            <ThemeProvider theme={darkMode ? themeDark : themeLight}>

                {
                    authIsPending
                    ?
                    <Loader />
                    :
                    <Routes>
                        <Route path="/" element={
                            user ? <Home darkMode={darkMode} setDarkMode={setDarkMode} /> : <Navigate to="/login"  />
                        } />
                        <Route path="/login" element={
                            !user ? <Login darkMode={darkMode} /> : <Navigate to="/" />
                        } />
                        <Route path="/signup" element={
                            !user ? <Signup darkMode={darkMode} /> : <Navigate to="/" />
                        } />
                    </Routes>
                }

            </ThemeProvider>
        </div>
    )
}
