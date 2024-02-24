import { Avatar, Paper, Stack, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion"

export default function SignupPreview({ color, username }) {
    
    const { palette } = useTheme()
    
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Paper 
                elevation={0} 
                sx={{
                    width: "fit-content", 
                    margin: "auto", 
                    marginBottom: 4, 
                    padding: 2,
                    background: palette.secondary.main
                }}
            >
                <Typography textAlign="left" mb={2} color="textSecondary">Preview</Typography>
                
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
                    <Avatar sx={{ background: color, color: "#000" }}>{ username[0] }</Avatar>
                    <Typography fontWeight={500}>{username}</Typography>
                </Stack>
                
            </Paper>
        </motion.div>
    )
}
