import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

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