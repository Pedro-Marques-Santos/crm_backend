import admin from "firebase-admin";
const serviceAccount = require("../../../firebase.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "projet-crm-firebase.appspot.com",
  });
}

export const bucketFirebaseStorage = admin.storage().bucket();
