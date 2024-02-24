import { useState } from "react"
import { auth, db } from "../firebase/config"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { collection, getDocs } from "firebase/firestore"

export function useAuth() {
    
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)

    async function signup(email, password, username) {
        setError(null)
        setIsPending(true)

        try {

            const snapshot = await getDocs(collection(db, "users"))

            if (snapshot.docs.length > 0) {
                for (const user of snapshot.docs) {
                    const data = user.data()
                    if (username === data.username) {
                        throw new Error("This username is already in use.")
                    }
                }
            }

            const response = await createUserWithEmailAndPassword(auth, email, password)
            setIsPending(false)
            
            return response.user.uid
        }
        
        catch (error) {
            setError(error.message)
            setIsPending(false)
        }
    }

    async function login(email, password) {
        setError(null)
        setIsPending(true)

        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
            
            setIsPending(false)
            return response.user.uid
        }
        catch (error) {
            setError(error.message)
            setIsPending(false)
        }
    }

    async function logout() {
        setError(null)
        setIsPending(true)

        try {
            await signOut(auth)
            setIsPending(false)

            return true
        }
        catch (error) {
            setError(error.message)
            setIsPending(false)

            return false
        }
    }

    return { error, isPending, signup, login, logout }
}
