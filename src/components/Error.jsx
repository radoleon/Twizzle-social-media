import { Alert } from "@mui/material"
import { red } from "@mui/material/colors"
import { motion } from "framer-motion"

export default function Error({ message }) {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Alert 
                variant="filled" 
                sx={{ width: "100%", marginTop: 4, backgroundColor: red[900], textAlign: "left" }} 
                severity="error"
            >
                {message}
            </Alert>
        </motion.div>
    )
}
