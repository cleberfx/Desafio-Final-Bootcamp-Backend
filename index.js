// import express from 'express';
// import cors from 'cors';
// import mongoose from 'mongoose';
// import { transactionRouter } from './routes/routes.js';
// // import { join } from 'path';
// // import config from 'dotenv';
// import { db } from './models/db.js';
// /**
//  * Faz a leitura do arquivo
//  * ".env" por padrão
//  */
// config();

// const app = express();
// app.use(cors());
// app.use(json());

// /**
//  * Vinculando o React ao app
//  */
// // app.use(static(join(__dirname, 'client/build')));

// /**
//  * Rota raiz
//  */
// app.get('/api/', (_, response) => {
//   response.send({
//     message:
//       'Bem-vindo à API de lançamentos. Acesse /transaction e siga as orientações',
//   });
// });

// /**
//  * Rotas principais do app
//  */
// app.use('/transactions', transactionRouter);

// /**
//  * Conexão ao Banco de Dados
//  */
// // const { DB_CONNECT } = process.env.DB_CONNECTION;

// (async () => {
//   try {
//     await db.mongoose.connect(db.url, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//   } catch (error) {
//     process.exit();
//   }
// })();

// const { connection } = mongoose;

// connection.once('open', () => {
//   connectedToMongoDB = true;
//   console.log('Conectado ao MongoDB');

//   /**
//    * Definição de porta e
//    * inicialização do app
//    */
//   const APP_PORT = process.env.PORT || 3001;
//   app.listen(APP_PORT, () => {
//     console.log(`Servidor iniciado na porta ${APP_PORT}`);
//   });
// });

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { transactionRouter } from './routes/routes.js';

import { db } from './models/db.js';

(async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado ao MongoDB');
  } catch (error) {
    process.exit();
  }
})();

const app = express();

//define dominio de origem para consumo do servico
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use(transactionRouter);

app.get('/', (req, res) => {
  res.send('API em execucao');
});

app.listen(process.env.PORT || 8081, () => {});
