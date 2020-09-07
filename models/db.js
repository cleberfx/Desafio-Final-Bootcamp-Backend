import mongoose from 'mongoose';
import transactionModel from './TransactionModel.js'

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB;
db.transaction = transactionModel(mongoose);

export { db };