import { db} from "./lib/firebase";
import { collection, addDoc } from "firebase/firestore";

// Example function to upload a user to firestore
async function uploadUser() {
    try {
        await addDoc(collection(db, "users"), {
            name: "Alice"
        });
        console.log("Uploading User");
    } catch (e) {
        console.error("Error: ", e)
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("uploadUserButton").addEventListener("click", uploadUser);
})
