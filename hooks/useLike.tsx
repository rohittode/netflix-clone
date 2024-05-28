import { collection, DocumentData, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { Movie } from "../typings";

function useLike(uid: string | undefined) {
  const [like, setLike] = useState<DocumentData[] | Movie[]>([]);

  useEffect(() => {
    if (!uid) return;

    return onSnapshot(
      collection(db, "customers", uid, "myLike"),
      (snapshot) => {
        setLike(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      }
    );
  }, [db, uid]);

  return like;
}

export default useLike;
