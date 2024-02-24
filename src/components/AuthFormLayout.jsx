import { Container, Box, Paper, Stack, useTheme } from "@mui/material"
import { useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import AuthLinks from "./AuthLinks"

const logoVariants = {
    hidden: { 
        y: "-100vh",
        opacity: 0
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "tween",
            duration: 0.8,
            ease: "easeOut",
            opacity: {
                delay: 0.15
            }
        }
    }
}

const formVariants = {
    hidden: { 
        y: "100vh",
        opacity: 0 
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "tween",
            duration: 0.8,
            ease: "easeOut",
            opacity: {
                delay: 0.15
            }
        }
    }
}

export default function AuthFormLayout({ children, darkMode }) {

    const { pathname } = useLocation()
    const { palette } = useTheme()

    return (
        <Container 
            sx={{ paddingBlock: 15}} 
            maxWidth="sm"
        >
            
            <motion.div
                variants={logoVariants}
                initial="hidden"
                animate="visible"
            >
                <Box sx={{ margin: "auto", marginBottom: 6, width: { xs: 150, sm: 250 } }}>
                    <img 
                        src={darkMode ? "/assets/logo_dark.png" : "/assets/logo_light.png"} 
                        alt="Logo" 
                        loading="lazy"
                    />
                </Box>
            </motion.div>

            <motion.div
                variants={formVariants}
                initial="hidden"
                animate="visible"
            >

                <Paper elevation={0}>
                    <Stack direction="row">
                        <AuthLinks pathname={pathname} palette={palette} />
                    </Stack>
                </Paper>

                <Paper 
                    elevation={0} 
                    sx={{ paddingBlock: 6, paddingInline: 4, borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
                >
                    { children }
                </Paper>

            </motion.div>
        </Container>
    )
}
