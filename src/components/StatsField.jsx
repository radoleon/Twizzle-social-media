import { Stack, Typography } from "@mui/material"
import React from 'react'

export default function StatsField({ value, name, icon }) {
    return (
        <Stack direction="row" alignItems="center" spacing={{ xs: 1, sm: 0.75 }}>
            <Typography 
                fontSize={{ xs: 32, sm: 16 }} 
                fontWeight={700}
            >
                { value }
            </Typography>
            
            <Typography 
                display={{ xs: "none", sm: "block" }} 
                fontSize={16} 
                fontWeight={700}
            >
                { name }
            </Typography>
            
            { icon }
        </Stack>
    )
}
