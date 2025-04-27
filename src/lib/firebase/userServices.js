import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./setup";

export async function createUser(user) {
  try {
    const userRef = doc(db, "users", String(user.userId));
    await setDoc(userRef, user);
  } catch (error) {
    console.log("Error creating user", error);
  }
}
export async function getUserInfo(userId) {
  try {
    const userRef = doc(db, "users", String(userId));
    const userSnapshot = await getDoc(userRef);
    const user = userSnapshot.data();
    // console.log(user);
    return user;
  } catch (error) {
    console.log("Error fetching user details", error);
  }
}
