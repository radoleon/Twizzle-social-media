import { useEffect, useState } from "react";
import AuthFormLayout from "../components/AuthFormLayout";
import { TextField, Button } from "@mui/material";
import ColorPicker from "../components/ColorPicker";
import { pink } from "@mui/material/colors"
import SignupPreview from "../components/SignupPreview";
import { AnimatePresence } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import { useFirestore } from "../hooks/useFirestore"
import Loader from "../components/Loader";
import Error from "../components/Error";
import { useUserContext } from "../hooks/useUserContext";

export default function Signup({ darkMode }) {
    
    const [signupFormData, setSignupFormData] = useState({
        username: "",
        email: "", 
        password: "", 
        repeatPassword: "",
        color: pink[500]
    })
    const [signupFormError, setSignupFormError] = useState(false)
    
    const { error: authError, isPending: authIsPending, signup } = useAuth()
    const { error: dbError, isPending: dbIsPending, createDocument } = useFirestore()

    const [submitError, setSubmitError] = useState(null)
    const [isPending, setIsPending] = useState(false)

    const { setUser } = useUserContext()

    useEffect(() => {
        setSubmitError(authError)
    }, [authError])

    useEffect(() => {
        setSubmitError(dbError)
    }, [dbError])

    useEffect(() => {
        if (authIsPending || dbIsPending) {
            setIsPending(true)
        }
        else {
            setIsPending(false)
        }
    }, [authIsPending, dbIsPending])

    function handleChange(key, value) {
        setSignupFormError(false)
        setSignupFormData(prevData => ({ ...prevData, [key]: value }))
    }
    
    function isEmpty(key) {
        if (!signupFormData[key]) {
            return true
        }
        else return false
    }

    async function handleSubmit() {
        setSubmitError(null)

        for (const item of Object.values(signupFormData)) {
            if (!item) {
                setSignupFormError(true)
                return
            }
        }
        
        if (signupFormData.username.length > 10) {
            setSubmitError("Username can't be longer than 10 characters.")
            return
        }

        if (signupFormData.password !== signupFormData.repeatPassword) {
            setSubmitError("Passwords have to be identical.")
            return
        }

        const uid = await signup(signupFormData.email, signupFormData.password, signupFormData.username)
        
        if (uid) {
            const success = await createDocument("users", uid, {
                username: signupFormData.username,
                color: signupFormData.color
            })

            if (success) setUser(uid)
        }
    }

    return (
        isPending 
        ? 
        <Loader />
        :
        <AuthFormLayout darkMode={darkMode} >
            <form style={{ textAlign: "center" }}>
                <TextField
                    size="small"
                    label="Username"
                    sx={{ marginBottom: 4}}
                    fullWidth
                    onChange={e => handleChange("username", e.target.value)}
                    error={signupFormError && isEmpty("username")}
                    helperText={signupFormError && isEmpty("username") ? "Incorrect Entry" : ""}
                    value={signupFormData.username}
                />
                <TextField
                    size="small"
                    label="Email"
                    sx={{ marginBottom: 4}}
                    fullWidth
                    onChange={e => handleChange("email", e.target.value)}
                    error={signupFormError && isEmpty("email")}
                    helperText={signupFormError && isEmpty("email") ? "Incorrect Entry" : ""}
                    value={signupFormData.email}
                />
                <TextField
                    type="password"
                    size="small"
                    label="Password"
                    sx={{ marginBottom: 4}}
                    fullWidth
                    onChange={e => handleChange("password", e.target.value)}
                    error={signupFormError && isEmpty("password")}
                    helperText={signupFormError && isEmpty("password") ? "Incorrect Entry" : ""}
                    value={signupFormData.password}
                />
                <TextField
                    type="password"
                    size="small"
                    label="Repeat Password"
                    sx={{ marginBottom: 4}}
                    fullWidth
                    onChange={e => handleChange("repeatPassword", e.target.value)}
                    error={signupFormError && isEmpty("repeatPassword")}
                    helperText={signupFormError && isEmpty("repeatPassword") ? "Incorrect Entry" : ""}
                    value={signupFormData.repeatPassword}
                />
                
                <ColorPicker currentColor={signupFormData.color} handleChange={handleChange} />
                
                <AnimatePresence>
                    {
                        signupFormData.username && 
                        <SignupPreview color={signupFormData.color} username={signupFormData.username} />
                    }
                </AnimatePresence>
                
                <Button 
                    variant="contained"
                    disableElevation
                    size="medium"
                    sx={{ paddingInline: 6 }}
                    onClick={handleSubmit}
                    children="SIGN UP"
                />

                {submitError && <Error message={submitError} />}
            </form>
        </AuthFormLayout>
    )
}
