import { Button, Box, Stack } from "@mui/material"
import ThemeSwitch from "./ThemeSwitch"
import { useAuth } from "../hooks/useAuth"
import Error from "./Error"
import { useUserContext } from "../hooks/useUserContext"

export default function Header({ darkMode, setDarkMode }) {

    const { error, logout } = useAuth()

    const { setUser } = useUserContext()

    async function handleClick() {
        const success = await logout()
        
        if (success) {
            setUser(null)
        }
    }

    return (
        <Box>
            <Stack 
                sx={{ paddingBlock: 4, borderBottom: "1px solid #000" }}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Box sx={{ width: { xs: 130, sm: 160 } }}>
                    <img 
                        src={darkMode ? "/assets/logo_dark.png" : "/assets/logo_light.png"}
                        alt="Logo" 
                    />
                </Box>
                <Stack
                    direction={{ xs: "column", sm: "row"}}
                    spacing={{ xs: 0.5, sm: 3 }}
                >
                    <ThemeSwitch darkMode={darkMode} setDarkMode={setDarkMode} />
                    <Button 
                        variant="contained" 
                        disableElevation
                        children="LOG OUT"
                        onClick={handleClick}
                    />
                </Stack>
            </Stack>

            {error && <Error message={error} />}
        </Box>
    )
}
