import {
  createUserWithEmailAndPassword,
  deleteUser,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateEmail,
} from "firebase/auth";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export const ForgotPassword = async (email) => {
  await sendPasswordResetEmail(auth, email.toString());
};

export const LoginWithEmail = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const SignUpWithEmail = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const LoginWithGoogle = async () => {
  const googleProvider = new GoogleAuthProvider();
  return await signInWithPopup(auth, googleProvider);
};

export const LogoutUser = async () => {
  await signOut(auth);
};

export const UpdateEmail = async (user, newEmail) => {
  await updateEmail(user, newEmail);
};

export const ResetPassword = async (email) => {
  return await sendPasswordResetEmail(auth, email);
};

export const DeleteDocument = async (userId) => {
  await deleteDoc(doc(db, "watchlist", userId)).catch((err) => {
    console.log(err.message);
  });
};

export const DeleteAccount = async (user) => {
  await deleteUser(user);
};

export const AddToWatchList = async (coin, user, watchlist) => {
  const coinRef = doc(db, "watchlist", user.uid);
  return await setDoc(coinRef, {
    coins: watchlist ? [...watchlist, coin.id] : [coin?.id],
  });
};

export const RemoveFromWatchlist = async (coin, user, watchlist) => {
  const coinRef = doc(db, "watchlist", user.uid);

  return await setDoc(
    coinRef,
    {
      coins: watchlist.filter((watch) => watch !== coin?.id),
    },
    { merge: "true" }
  );
};
