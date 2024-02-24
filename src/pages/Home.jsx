import { useState, useEffect } from "react";
import { Container } from "@mui/material";
import AboutUser from "../components/AboutUser";
import Header from "../components/Header";
import Error from "../components/Error";
import Posts from "../components/Posts";
import ModalForm from "../components/ModalForm"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/config";
import { useUserContext } from "../hooks/useUserContext";
import { motion } from "framer-motion"

const headerVariants = {
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

const bodyVariants = {
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

export default function Home({ darkMode, setDarkMode }) {

    const { user: uid } = useUserContext()
    
    const [users, setUsers] = useState([])
    const [posts, setPosts] = useState([])
    const [currentUserInfo, setCurrentUserInfo] = useState({})
    
    const [dbUsersError, setDbUsersError] = useState(null)
    const [dbPostsError, setDbPostsError] = useState(null)

    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        
        const unsubscribe = onSnapshot(collection(db, "users"), 
        snapshot => {
            const newDocs = snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() }))
            setUsers(newDocs)

            const [currentUser] = newDocs.filter(user => user.uid === uid)
            setCurrentUserInfo(currentUser)
        },
        error => {
            setDbUsersError(error.message)
        }) 

        return () => unsubscribe()

    }, [])

    useEffect(() => {
        
        const collectionRef = collection(db, "posts")
        
        const unsubscribe = onSnapshot(query(collectionRef, orderBy("timestamp", "desc")), 
        snapshot => {
            const newDocs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            setPosts(newDocs)
        },
        error => {
            setDbPostsError(error.message)
        }) 

        return () => unsubscribe()

    }, [])
    
    return (
        <Container maxWidth="sm">

            {showModal && <ModalForm showModal={showModal} setShowModal={setShowModal} currentUser={currentUserInfo} />}

            <motion.div variants={headerVariants} initial="hidden" animate="visible">
                <Header darkMode={darkMode} setDarkMode={setDarkMode} />
                <AboutUser setShowModal={setShowModal} users={users} currentUser={currentUserInfo} posts={posts} />
            </motion.div>
            
            {dbUsersError && <Error message={dbUsersError} />}
            {dbPostsError && <Error message={dbPostsError} />}
            
            <motion.div variants={bodyVariants} initial="hidden" animate="visible">
                <Posts posts={posts} currentUser={currentUserInfo} />
            </motion.div>
        </Container>
    )
}
