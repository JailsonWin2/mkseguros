import express from "express";
import conectaNaDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
import manipulador404 from "./middlewares/manipulador404.js";
import cors from "cors";

const conexao = await conectaNaDatabase();

conexao.on("error", (erro) => {
  console.error("Erro de conexao: ", erro);
});

conexao.once("open", () => {
  console.log(
    "\u001b[1;36m |-----------------------------------------------------|"
  );
  console.log(
    "\u001b[1;32m |                   CONEXÃO ABERTA                    |"
  );
  console.log(
    "\u001b[1;36m |-----------------------------------------------------|"
  );
});

const app = express();
app.use(cors());
routes(app);

app.use(manipulador404);
//Função middlewar para interceptar a requisição quando da erro
app.use(manipuladorDeErros);

export default app;
