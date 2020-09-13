// const mongoose = require('mongoose');
// const ObjectId = mongoose.Types.ObjectId;

// // Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// // com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// // o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// // descobrir esse erro :-/
// const TransactionModel = require('../models/TransactionModel');

import { db } from '../models/db.js';
import { logger } from '../config/logger.js';

const Transaction = db.transaction;

const create = async (req, res) => {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let yearMonth = (function () {
    let date = new Date();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (month < 10) {
      month = '0' + month;
    }
    if (year < 10) {
      year = '0' + day;
    }

    let yM = year + '-' + month;
    return yM;
  })();

  let yearMonthDay = (function () {
    let date = new Date();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let day = date.getDate();
    if (year < 10) {
      year = '0' + year;
    }
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }

    let yMD = year + '-' + month + '-' + day;
    return yMD;
  })();

  const transaction = new Transaction({
    description: req.body.description,
    value: req.body.value,
    category: req.body.category,
    year: req.body.year,
    month: req.body.month,
    day: req.body.day,
    yearMonth: req.body.yearMonth,
    yearMonthDay: req.body.yearMonthDay,
    type: req.body.type,
  });
  try {
    const data = await transaction.save();
    res.send(data);
    logger.info(`POST /transaction`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /transaction - ${JSON.stringify(error.message)}`);
  }
};

const findAllByDescription = async (req, res) => {
  const name = req.query.name;

  //condicao para o filtro no findAll
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {};

  try {
    const data = await Transaction.find(condition);

    if (!data) {
      res.status(404).send({ message: 'Nao encontrado nenhuma registro' });
    } else {
      res.send(data);
    }
    logger.info(`GET /transaction`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /transaction - ${JSON.stringify(error.message)}`);
  }
};
const findAllByDate = async (req, res) => {
  const yearMonth = req.params.yearMonth;
  console.log(yearMonth);
  try {
    const data = await Transaction.find({ yearMonth: yearMonth });

    if (!data) {
      res.status(404).send({ message: 'Nao encontrado nenhuma registro' });
    } else {
      res.send(data);
    }
    logger.info(`GET /transaction`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /transaction - ${JSON.stringify(error.message)}`);
  }
};

const findAllByYear = async (req, res) => {
  let year = req.params.year;
  let strYear = year.toString();
  console.log(strYear);
  try {
    const data = await Transaction.find({ year: strYear });

    if (!data) {
      res.status(404).send({ message: 'Nao encontrado nenhuma registro' });
    } else {
      res.send(data);
    }
    logger.info(`GET /transaction`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /transaction - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Transaction.findById({ _id: id });

    if (!data) {
      res
        .status(404)
        .send({ message: 'Nao encontrado nenhuma registro com id: ' + id });
    } else {
      res.send(data);
    }

    logger.info(`GET /transaction - ${id}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Transaction id: ' + id });
    logger.error(`GET /transaction - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }

  const id = req.params.id;

  try {
    const data = await Transaction.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    if (!data) {
      res
        .status(404)
        .send({ message: 'Nao encontrado nenhuma registro para atualizar' });
    } else {
      res.send(data);
    }

    logger.info(`PUT /transaction - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Erro ao atualizar a Transaction id: ' + id });
    logger.error(`PUT /transaction - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Transaction.findByIdAndRemove({ _id: id });

    if (!data) {
      res
        .status(404)
        .send({ message: 'Nao encontrado nenhuma registro para excluir' });
    } else {
      res.send('Registro excluido com sucesso');
    }

    logger.info(`DELETE /transaction - ${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Transaction id: ' + id });
    logger.error(`DELETE /transaction - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  try {
    const data = await Transaction.deleteMany();

    if (!data) {
      res
        .status(404)
        .send({ message: 'Nao encontrada nenhuma registro para excluir' });
    } else {
      res.send('Registros excluidas com sucesso');
    }

    logger.info(`DELETE /transaction`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Transactions' });
    logger.error(`DELETE /transaction - ${JSON.stringify(error.message)}`);
  }
};

export default {
  create,
  findAllByDescription,
  findOne,
  update,
  remove,
  removeAll,
  findAllByDate,
  findAllByYear,
};
