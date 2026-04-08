import { getFirestore, collection, getDocs, Firestore, getDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

export async function retrieveProducts(collectionName: string): Promise<any[]> {
  const querySnapshot = await getDocs(collection(db, collectionName));

  console.log("Jumlah dokumen:", querySnapshot.size);

  const data: any[] = [];

  querySnapshot.forEach((doc) => {
    console.log("Doc:", doc.id, doc.data());

    data.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return data;
}

export async function retrieveDataByID(collectionName: string, id: string) {
    const snapshot = await getDoc(doc(db, collectionName, id));
    if (!snapshot.exists()) {
        return null;
    }
    const data = {
        id: snapshot.id,
        ...snapshot.data()
    };
    return data;
}