const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ModelHandleBook = new Schema({
    masinhvien: { type: String, default: '' },
    nameBook: { type: String, default: '' },
    ngaymuon: { type: String, default: '' },
    ngayhethan: { type: String, default: '' },
    tinhtrang: { type: Boolean, default: false },
});

module.exports = mongoose.model('handleBook', ModelHandleBook);
