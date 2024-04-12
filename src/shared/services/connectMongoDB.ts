import mongoose from "mongoose";

function connectToDatabase(): void {
  void mongoose.connect(`${process.env.DATABASE_URL}`);

  const db = mongoose.connection;
  db.on("error", (err) => {
    console.log(err);
  });

  db.once("open", () => {
    console.log("connect mongodatabase");
  });
}

export { connectToDatabase };
