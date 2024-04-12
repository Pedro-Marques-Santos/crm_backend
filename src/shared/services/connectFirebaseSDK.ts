import admin from "firebase-admin";
const serviceAccount = require("../../../firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://projeto-authentication.appspot.com",
});

export const bucketFirebaseStorage = admin.storage().bucket();
