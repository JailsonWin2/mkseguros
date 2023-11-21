import comissao from "../models/Comissao.js";
import { apolice } from "../models/Apolice.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

class ComissaoController {
  static async listarComissoes(req, res, next) {
    try {
      const listaComissoes = await comissao.find({});
      res.status(200).json(listaComissoes);
    } catch (erro) {
      next(erro);
    }
  }

  static async listarComissaoPorId(req, res, next) {
    try {
      const comissaoEncontrada = await comissao.findById(req.params.id);
      if (!comissaoEncontrada) {
        return res.status(404).json({ mensagem: "Comissao não encontrada" });
      }
      res.status(200).json(comissaoEncontrada);
    } catch (erro) {
      next(erro);
    }
  }

  static async cadastrarComissao(req, res, next) {
    const novaComissao = req.body;
    try {
      const apoliceEncontrada = await apolice.findById(novaComissao.apolice);
      const comissaoCompleta = {
        ...novaComissao,
        apolice: { ...apoliceEncontrada._doc },
      };
      const comissaoCriada = await comissao.create(comissaoCompleta);
      res.status(201).json({
        mensagem: "Comissao cadastrada com sucesso!",
        comissao: comissaoCriada,
      });
    } catch (erro) {
      next(erro);
    }
  }

  static async atualizarComissao(req, res, next) {
    const id = req.params.id;
    try {
      const comissaoAtualizada = await comissao.findOneAndUpdate(
        { _id: id },
        req.body,
        { new: true }
      );
      if (!comissaoAtualizada) {
        new NaoEncontrado("ID de Comissao não localizada!").enviarResposta(res);
      } else {
        res
          .status(200)
          .json(
            `Comissao atualizada com sucesso! - Comissao: ${comissaoAtualizada}`
          );
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async deletarComissao(req, res, next) {
    try {
      const id = req.params.id;
      const comissaoDeletada = await comissao.findByIdAndDelete({ _id: id });
      if (!comissaoDeletada) {
        new NaoEncontrado("ID de Comissao não localizada!").enviarResposta(res);
      } else {
        res.status(200).json("Comissao deletada com sucesso!");
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async listarComissoesPorApolice(req, res, next) {
    const apoliceId = req.query.apolice;
    const apoliceEncontrada = await apolice.findById(apoliceId);

    try {
      const comissoesPorApolice = await comissao.find({
        apolice: apoliceEncontrada,
      });
      res.status(200).json(comissoesPorApolice);
    } catch (erro) {
      console.log(erro);
      next(erro);
    }
  }
}

export default ComissaoController;
