import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  addDoc,
  where,
  updateDoc,
} from "firebase/firestore";
import app from "./firebase";
import bcrypt from "bcryptjs";

const db = getFirestore(app);


// REFACTOR: Generic reusable Firestore helpers

/** Ambil semua dokumen dari koleksi tertentu */
export async function retrieveCollection(collectionName: string) {
  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

/** Ambil satu dokumen berdasarkan ID */
export async function retrieveDocById(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(db, collectionName, id));
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
}

/** Ambil dokumen berdasarkan field tertentu */
export async function retrieveDocByField(
  collectionName: string,
  field: string,
  value: string
) {
  const q = query(collection(db, collectionName), where(field, "==", value));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

/** Tambah dokumen baru ke koleksi */
export async function addDocument(collectionName: string, data: object) {
  return await addDoc(collection(db, collectionName), data);
}

/** Update dokumen berdasarkan ID */
export async function updateDocument(
  collectionName: string,
  id: string,
  data: object
) {
  return await updateDoc(doc(db, collectionName, id), data);
}


// Alias lama agar backward compatible
export const retrieveProducts = retrieveCollection;
export const retrieveDataByID = retrieveDocById;

// Auth Functions

export async function signIn(email: string) {
  const data = await retrieveDocByField("users", "email", email);
  return data.length > 0 ? data[0] : null;
}

export type UserRole = "member" | "editor" | "admin";

export async function signUp(
  userData: {
    email: string;
    fullname: string;
    password: string;
    role?: UserRole;
  },
  callback: Function
) {
  const existing = await retrieveDocByField("users", "email", userData.email);

  if (existing.length > 0) {
    callback({ status: "error", message: "User already exists" });
    return;
  }

  userData.password = await bcrypt.hash(userData.password, 10);
  userData.role = "member"; // default role

  try {
    await addDocument("users", userData);
    callback({ status: "success", message: "User registered successfully" });
  } catch (error: any) {
    callback({ status: "error", message: error.message });
  }
}

/** Login / registrasi via Google OAuth — menyimpan data ke Firestore */
export async function signInWithGoogle(userData: any, callback: Function) {
  try {
    const existing = await retrieveDocByField("users", "email", userData.email);

    if (existing.length > 0) {
      // User sudah ada — pertahankan role lama lalu update data
      const existingUser: any = existing[0];
      userData.role = existingUser.role as UserRole;
      await updateDocument("users", existingUser.id, userData);
      callback({
        status: true,
        message: "User registered and logged in with Google",
        data: userData,
      });
    } else {
      // User baru — set role default "member"
      userData.role = "member" as UserRole;
      await addDocument("users", userData);
      callback({
        status: true,
        message: "User registered and logged in with Google",
        data: userData,
      });
    }
  } catch (error: any) {
    callback({
      status: false,
      message: "Failed to register user with Google",
    });
  }
}

/** Login / registrasi via GitHub OAuth — menyimpan data ke Firestore */
export async function signInWithGitHub(userData: any, callback: Function) {
  try {
    const existing = await retrieveDocByField("users", "email", userData.email);

    if (existing.length > 0) {
      const existingUser: any = existing[0];
      userData.role = existingUser.role as UserRole;
      await updateDocument("users", existingUser.id, userData);
      callback({
        status: true,
        message: "User registered and logged in with GitHub",
        data: userData,
      });
    } else {
      userData.role = "member" as UserRole;
      await addDocument("users", userData);
      callback({
        status: true,
        message: "User registered and logged in with GitHub",
        data: userData,
      });
    }
  } catch (error: any) {
    callback({
      status: false,
      message: "Failed to register user with GitHub",
    });
  }
}
