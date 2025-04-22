import mongoose from "mongoose";

function connectToDatabase(): void {
  mongoose.set("debug", true); // loga todas as queries no console

  console.log("🟡 Tentando conectar ao MongoDB...");

  mongoose
    .connect(process.env.DATABASE_URL!, {
      serverSelectionTimeoutMS: 5000, // timeout da tentativa
    })
    .catch((err) => {
      console.error("🔴 Falha na conexão inicial com MongoDB:", err.message);
    });

  const db = mongoose.connection;

  db.on("connected", () => console.log("🟢 MongoDB conectado"));
  db.on("error", (err) => console.error("🔴 Erro MongoDB:", err));
  db.on("disconnected", () => console.warn("🟠 MongoDB desconectado"));
  db.on("reconnectFailed", () =>
    console.error("🔴 Falha na tentativa de reconectar ao MongoDB"),
  );
}

// function connectToDatabase(): void {
//   void mongoose.connect(`${process.env.DATABASE_URL}`);

//   const db = mongoose.connection;
//   db.on("error", (err) => {
//     console.log(err);
//   });

//   db.once("open", () => {
//     console.log("connect mongodatabase");
//   });
// }

export { connectToDatabase };
