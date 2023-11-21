//import http from "http";
import app from "./src/app.js";
import "dotenv/config";

const PORT = 3005;

app.listen(PORT, () => {
  console.log("Servidor rodando na porta: " + PORT);
});
