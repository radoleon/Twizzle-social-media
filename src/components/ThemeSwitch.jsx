import { Stack, Switch, useTheme } from "@mui/material"
import { LightMode, DarkMode } from "@mui/icons-material"

export default function ThemeSwitch({ darkMode, setDarkMode }) {

    const { palette } = useTheme()
    
    return (
        <Stack
            direction="row"
            alignItems="center"
            spacing={1}
        >
            <LightMode sx={{color: darkMode ? palette.secondary.main : palette.primary.main}} />
            <Switch 
                onChange={e => setDarkMode(e.target.checked)}
                checked={darkMode}
            />
            <DarkMode sx={{color: darkMode ? palette.primary.main : palette.secondary.main}} />
        </Stack>
    )
}
