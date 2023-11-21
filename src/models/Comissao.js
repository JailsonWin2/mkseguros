import mongoose from "mongoose";
import { apoliceSchema } from "./Apolice.js";

const comissaoSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    data_recebimento: {
      type: Date,
      required: [true, "O campo DATA RECEBIMENTO é obrigatório!"],
    },
    valor_recebido: {
      type: Number,
      required: [true, "O campo VALOR RECEBIDO é obrigatório!"],
    },
    apolice: apoliceSchema,
  },
  { versionKey: false }
);

const comissao = mongoose.model("comissao", comissaoSchema); //o primeiro parametro é a coleção do banco de dados MongoDB

export default comissao;
