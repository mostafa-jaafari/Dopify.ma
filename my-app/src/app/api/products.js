import { collection, getDocs } from "firebase/firestore";
import { cache } from "react";
import { db } from "../../../Firebase";

export const fetchProducts = cache(async () => {
  try {
    const docRef = collection(db, 'products');
    const docSnap = (await getDocs(docRef)).docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return docSnap;
  } catch (error) {
    console.error(error);
    return [];
  }
});