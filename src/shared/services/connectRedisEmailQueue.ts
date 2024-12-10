import Queue from "bull";

// Configura a conexão com Redis
const emailQueue = new Queue("emailQueue", {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
      ? parseInt(process.env.REDIS_PORT, 10)
      : undefined,
    maxRetriesPerRequest: 1, // Tentativas de reconexão antes de lançar o erro
    connectTimeout: 5000, // Tempo de espera para conexão
  },
});

emailQueue.on("ready", () => {
  console.log("Connected Redis");
});

emailQueue.on("error", (err) => {
  console.error("Redis error:", err);
});

export { emailQueue };