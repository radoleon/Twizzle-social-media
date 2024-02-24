import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyCh5uk8y6yLkLvKAfXxrFFN9KAK6oxS2mw",
    authDomain: "twizzle-80de5.firebaseapp.com",
    projectId: "twizzle-80de5",
    storageBucket: "twizzle-80de5.appspot.com",
    messagingSenderId: "400994699428",
    appId: "1:400994699428:web:902fef4da9e9682cabbe31"
}

initializeApp(firebaseConfig)

const db = getFirestore()
const auth = getAuth()

export { db, auth }
