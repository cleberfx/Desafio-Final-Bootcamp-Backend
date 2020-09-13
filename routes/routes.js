import express from 'express';
import transaction from '../services/transactionService.js';

const app = express();

app.post('/transaction', transaction.create);
app.get('/transaction', transaction.findAllByDescription);
app.get('/transaction/yearMonth/:yearMonth', transaction.findAllByDate);
app.get('/transaction/year/:year', transaction.findAllByYear);
// app.get('/transation/:id', transation.findOne);
app.put('/transaction/:id', transaction.update);
app.delete('/transaction/:id', transaction.remove);
app.delete('/transaction', transaction.removeAll);

export { app as transactionRouter };
