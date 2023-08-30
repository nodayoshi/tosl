import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";
//import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
let firebase = initializeApp(firebaseConfig);

//2022/07/22 403 error
// const isEmulating = window.location.hostname === "localhost";
// if (!isEmulating) {
//   firebase = initializeAppCheck(firebase, {
//     provider: new ReCaptchaV3Provider(
//       import.meta.env.VITE_RECAPCHA_API_KEY
//     ),
//     isTokenAutoRefreshEnabled: true,
//   });
// }

export default firebase;
