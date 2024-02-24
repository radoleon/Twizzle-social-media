import { useState } from 'react'
import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebase/config"

export function useFirestore() {
    
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    
    async function createDocument(collection, id, data) {
        setError(null)
        setIsPending(true)

        try {
            await setDoc(doc(db, collection, id), data)
            setIsPending(false)

            return true
        }
        
        catch (error) {
            setError(error.message)
            setIsPending(false)

            return false
        }
    }

    async function deleteDocument(collection, id) {
        setError(null)
        setIsPending(true)

        try {
            await deleteDoc(doc(db, collection, id))
        }

        catch (error) {
            setError(error.message)
        }

        setIsPending(false)
    }

    async function updateDocument(collection, id, property, data) {
        setError(null)
        setIsPending(true)

        try {
            await updateDoc(doc(db, collection, id), {
                [property]: data
            })

            setIsPending(false)
            return true
        }

        catch (error) {
            setError(error.message)
            setIsPending(false)
            
            return false
        }
    }
    
    return { error, isPending, createDocument, deleteDocument, updateDocument }
}
