import {
  initializeFirestore,
  CACHE_SIZE_UNLIMITED,
  getFirestore,
  connectFirestoreEmulator,
  enableNetwork,
  //enableIndexedDbPersistence,
} from "firebase/firestore";

import firebaseApp from "../firebaseInit";

const firebaseDb = initializeFirestore(firebaseApp, { ignoreUndefinedProperties: true, cacheSizeBytes: CACHE_SIZE_UNLIMITED });

const isEmulating = window.location.hostname === "localhost";
if (isEmulating) {
  connectFirestoreEmulator(firebaseDb, "localhost", 8080);
}

// //オフラインキャッシュ有効化
// enableIndexedDbPersistence(firebaseDb).catch((err) => {
//   if (err.code == "failed-precondition") {
//     console.log("オフラインキャッシュは複数タブが開いている場合無効になります");
//   } else if (err.code == "unimplemented") {
//     console.log("ブラウザがオフラインキャッシュをサポートしていません");
//   }
// });

export default firebaseDb;
