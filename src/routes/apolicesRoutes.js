import express from "express";
import ApoliceController from "../controllers/apoliceController.js";

const routes = express.Router();

routes.get("/apolices", ApoliceController.listarApolices);
routes.get("/apolices/:id", ApoliceController.listarApolicePorId);
routes.post("/apolices", ApoliceController.cadastrarApolice);
routes.put("/apolices/:id", ApoliceController.atualizarApolice);
routes.delete("/apolices/:id", ApoliceController.deletarApolice);

export default routes;
