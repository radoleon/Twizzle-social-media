import { useContext } from 'react'
import { UserContext } from "../context/UserContext"

export function useUserContext() {
    const context = useContext(UserContext)

    return context
}
