// const mongoose = require('mongoose');
export default (mongoose) => {
  let date = Date.now();
  let year = date.getFullYear;
  let schema = mongoose.Schema({
    description: { type: String, required: true },
    value: { type: Number, required: true },
    category: { type: String, required: true },
    year: {
      type: Number,
      default: year,
    },
    month: {
      type: Number,
      default: () => {
        let date = Date.now;
        let mounth = date.getMounth;
        return mounth;
      },
    },
    day: {
      type: Number,
      default: () => {
        let date = new Date();
        date.getDate;
      },
    },
    yearMonth: {
      type: String,
      default: () => {
        let date = Date.now;
        let ym = date.getFullYear + '/' + date.getMonth;
        return ym.toString();
      },
      required: true,
    },
    yearMonthDay: {
      type: String,
      default: () => {
        let date = Date.now;
        let ymd = date.getFullYear + '/' + date.getMonth + '/' + date.getDate;
        return ymd.toString();
      },
      required: true,
    },
    type: { type: String, required: true },
  });

  schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();

    object.id = _id;

    return object;
  });

  const Transaction = mongoose.model('transaction', schema);

  // module.exports = TransactionModel;
  return Transaction;
};
