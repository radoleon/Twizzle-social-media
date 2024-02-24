import { useState } from "react";
import AuthFormLayout from "../components/AuthFormLayout";
import { Button, TextField } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { useUserContext } from "../hooks/useUserContext";

export default function Login({ darkMode }) {

    const [loginFormData, setLoginFormData] = useState({email: "", password: ""})
    const [loginFormError, setLoginFormError] = useState(false)

    const { error: submitError, isPending, login } = useAuth()

    const { setUser } = useUserContext()

    function handleChange(key, value) {
        setLoginFormError(false)
        setLoginFormData(prevData => ({ ...prevData, [key]: value }))
    }

    function isEmpty(key) {
        if (!loginFormData[key]) {
            return true
        }
        else return false
    }

    async function handleSubmit() {
        
        for (const item of Object.values(loginFormData)) {
            
            if (!item) {
                setLoginFormError(true)
                return
            }
        }

        const uid = await login(loginFormData.email, loginFormData.password)

        if (uid) setUser(uid)
    }

    return (
        isPending ?
        <Loader />
        :
        <AuthFormLayout darkMode={darkMode} >
            <form style={{ textAlign: "center" }}>
                <TextField
                    size="small"
                    label="Email"
                    sx={{ marginBottom: 4}}
                    fullWidth
                    onChange={e => handleChange("email", e.target.value)}
                    error={loginFormError && isEmpty("email")}
                    helperText={loginFormError && isEmpty("email") ? "Incorrect Entry" : ""}
                    value={loginFormData.email}
                />
                <TextField
                    type="password"
                    size="small"
                    label="Password"
                    sx={{ marginBottom: 4}}
                    fullWidth
                    onChange={e => handleChange("password", e.target.value)}
                    error={loginFormError && isEmpty("password")}
                    helperText={loginFormError && isEmpty("password") ? "Incorrect Entry" : ""}
                    value={loginFormData.password}
                />
                <Button 
                    variant="contained"
                    disableElevation
                    size="medium"
                    sx={{ paddingInline: 6 }}
                    onClick={handleSubmit}
                    children="LOG IN"
                />
                {submitError && <Error message={submitError} />}
            </form>
        </AuthFormLayout>
    )
}
