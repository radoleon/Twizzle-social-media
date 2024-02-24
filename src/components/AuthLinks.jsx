import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const linkStyles = {
    flex: 1,
    fontSize: "1.125rem", 
    fontWeight: 700, 
    textAlign: "center",
    cursor: "pointer"
}

export default function AuthLinks({ pathname, palette }) {
    return (
        <>
            <motion.div
                whileHover={{ color: palette.primary.main }}
                whileTap={{ color: palette.primary.main }}
                style={{
                    ...linkStyles,
                    color: pathname === "/login" ? palette.primary.main : palette.text.secondary,
                    background: pathname === "/login" ? palette.background.paper : palette.secondary.main,
                    borderRadius: pathname === "/login" ? "10px 0 0 0" : "0 0 0 0"
                }}
            >
                <Link 
                    style={{ paddingBlock: "1.5rem", display: "block" }} 
                    to="/login" 
                    children="LOG IN"
                />
            </motion.div>
            
            <motion.div
                whileHover={{ color: palette.primary.main }}
                whileTap={{ color: palette.primary.main }}
                style={{
                    ...linkStyles,
                    color: pathname === "/signup" ? palette.primary.main : palette.text.secondary,
                    background: pathname === "/signup" ? palette.background.paper : palette.secondary.main,
                    borderRadius: pathname === "/signup" ? "0 10px 0 0" : "0 0 0 0"
                }}
            >
                <Link
                    style={{ paddingBlock: "1.5rem", display: "block" }} 
                    to="/signup"
                    children="SIGN UP"
                />
            </motion.div>
        </>
    )
}
