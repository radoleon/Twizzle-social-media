import { CircularProgress, Hidden, Stack, useTheme } from "@mui/material"
import React from 'react'

export default function Loader() {

    const { palette } = useTheme()

    return (
        <Stack
            alignItems="center"
            justifyContent="center"
            sx={{
                width: "100vw",
                height: "100vh",
                position: "fixed",
                top: 0,
                left: 0,
                background: palette.secondary.main,
                zIndex: 100,
            }}
        >
            <CircularProgress size={60} />
        </Stack>
    )
}
