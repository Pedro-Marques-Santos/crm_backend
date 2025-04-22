import admin from "firebase-admin";
const serviceAccount = require("../../../firebase.json");

// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     storageBucket: "projet-crm-firebase.appspot.com",
//   });
// }

if (!admin.apps.length) {
  console.log("🟡 Inicializando Firebase Admin SDK...");

  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: "projet-crm-firebase.appspot.com",
    });

    console.log("🟢 Firebase Admin iniciado com sucesso");

    // Testar acesso ao bucket
    const bucket = admin.storage().bucket();
    bucket
      .getFiles({ maxResults: 1 })
      .then(() => {
        console.log("✅ Firebase Storage acessível");
      })
      .catch((err) => {
        console.error("❌ Firebase Storage inacessível:", err.message);
      });
  } catch (err) {
    console.error("🔴 Erro ao iniciar Firebase Admin:", err.message);
  }
}

export const bucketFirebaseStorage = admin.storage().bucket();
