import express from 'express';
import transation from '../m';

const app = express();

app.post('/transation', transation.create);
app.get('/transation', transation.findAll);
app.get('/transation/:id', transation.findOne);
app.put('/transation/:id', transation.update);
app.delete('/transation/:id', transation.remove);
app.delete('/transation', transation.removeAll);

export { app as transationRouter };
