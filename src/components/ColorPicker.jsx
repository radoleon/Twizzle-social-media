import { Box, Stack, Typography, useTheme } from "@mui/material";
import { pink, deepPurple, blue, yellow, deepOrange, amber, indigo, lightGreen } from "@mui/material/colors"

const colors = [
    pink[500], deepPurple[500], blue[500], yellow[500], deepOrange[500], amber[500], indigo[500], lightGreen[500]
]

export default function ColorPicker({ handleChange, currentColor }) {

    const { palette } = useTheme()

    return (
        <Stack 
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            textAlign="left"
            sx={{ marginBottom: 4 }}
        >
            <Typography sx={{ fontWeight: 700, paddingTop: "3px" }}>Pick a Color:</Typography>
            <Stack direction="row" sx={{ gap: "5px" }} flexWrap="wrap">
                {colors.map(color => (
                    <Box 
                        key={color}
                        sx={{ 
                            width: 30, 
                            height: 30, 
                            background: color, 
                            borderRadius: "100vw",
                            border: 
                                currentColor === color ? 
                                `3px solid ${palette.primary.main}` : `3px solid ${palette.background.paper}`,
                            cursor: "pointer"
                        }}
                        onClick={() => handleChange("color", color)}
                    />
                ))}
            </Stack>
        </Stack>
    )
}
