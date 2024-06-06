import admin from "firebase-admin";
const serviceAccount = require("../../../firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://projet-crm-firebase.appspot.com",
});

const uid = "server-admin";

const additionalClaims = {
  admin: true,
};

admin.auth().createCustomToken(uid, additionalClaims);

export const bucketFirebaseStorage = admin.storage().bucket();
