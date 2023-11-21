import express from "express";

import apolice from "./apolicesRoutes.js";
import comissao from "./comissoesRoutes.js";

const routes = (app) => {
  app.route("/").get((req, res) => res.status(200).send("MK Seguros"));

  app.use(express.json(), comissao, apolice);
};

export default routes;
