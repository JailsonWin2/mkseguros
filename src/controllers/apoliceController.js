import NaoEncontrado from "../erros/NaoEncontrado.js";
import { apolice } from "../models/Apolice.js";

class ApoliceController {
  static async listarApolices(req, res, next) {
    try {
      const listaApolices = await apolice.find({});
      res.status(200).json(listaApolices);
    } catch (erro) {
      next(erro);
    }
  }

  static async listarApolicePorId(req, res, next) {
    try {
      const apoliceEncontrada = await apolice.findById(req.params.id);

      if (!apoliceEncontrada) {
        next(new NaoEncontrado("ID de apolice não localizado!"));
      } else {
        res.status(200).json(apoliceEncontrada);
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async cadastrarApolice(req, res, next) {
    try {
      const novaApolice = await apolice.create(req.body);
      res.status(201).json({
        mensagem: "Apolice cadastrado com sucesso!",
        apolice: novaApolice,
      });
      return;
    } catch (erro) {
      console.error("Erro ao cadastrar apolice: ", erro);
      res.status(500).json({
        mensagem: "Erro ao cadastrar apolice",
        erro: erro.message,
      });
      next(erro);
      return;
    }
  }

  static async atualizarApolice(req, res, next) {
    try {
      const id = req.params.id;
      const apoliceAtualizada = await apolice.findOneAndUpdate(
        { _id: id },
        req.body,
        { new: true }
      );
      if (!apoliceAtualizada) {
        next(new NaoEncontrado("ID de Apolice não localizada!"));
      } else {
        res
          .status(200)
          .json(
            ` Apolice atualizada com sucesso! - Apolice: ${apoliceAtualizada}`
          );
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async deletarApolice(req, res, next) {
    try {
      const id = req.params.id;
      const apoliceDeletada = await apolice.findByIdAndDelete({ _id: id });
      if (!apoliceDeletada) {
        next(new NaoEncontrado("ID de apolice não localizado!"));
      }
      res.status(200).json("Apolice deletada com sucesso!");
    } catch (erro) {
      next(erro);
    }
  }
}

export default ApoliceController;
