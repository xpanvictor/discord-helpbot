
import { getFirestore, addDoc, collection } from "firebase/firestore/lite";
import { initializeApp } from "firebase/app";

const firebaseConfig = {

  apiKey: "AIzaSyDxrk_xj4bAKx1qTTKR-BoH0letQw0kLOE",

  authDomain: "helpdesk-bot-1b114.firebaseapp.com",

  projectId: "helpdesk-bot-1b114",

  storageBucket: "helpdesk-bot-1b114.appspot.com",

  messagingSenderId: "520138145499",

  appId: "1:520138145499:web:9020fa8abe82908d60d6fe"

};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export async function createTicket(threadId: string, text: string) {
    try {
        await addDoc(
            collection(db, 'tickets'), {
                threadId,
                text,
                openedAt: Date()
            }
        )
    } catch (err) {
        console.log("Error adding document", err)
    }
}