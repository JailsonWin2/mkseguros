import express from "express";
import ComissaoController from "../controllers/comissaoController.js";

const routes = express.Router();

routes.get("/comissao", ComissaoController.listarComissoes);
routes.get("/comissao/busca", ComissaoController.listarComissoesPorApolice);
routes.get("/comissao/:id", ComissaoController.listarComissaoPorId);
routes.post("/comissao", ComissaoController.cadastrarComissao);
routes.put("/comissao/:id", ComissaoController.atualizarComissao);
routes.delete("/comissao/:id", ComissaoController.deletarComissao);

export default routes;
