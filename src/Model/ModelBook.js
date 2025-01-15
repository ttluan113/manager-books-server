const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ModelBook = new Schema({
    masach: { type: String, default: '' },
    img: { type: String, default: '' },
    tensach: { type: String, default: '' },
    tacgia: { type: String, default: '' },
    nhaxuatban: { type: String, default: '' },
    phienban: { type: String, default: '' },
    danhmuc: { type: String, default: '' },
    namxb: { type: String, default: '' },
    mota: { type: String, default: '' },
    soluong: { type: String, default: '' },
    ngaycapnhat: { type: String, default: '' },
});

module.exports = mongoose.model('book', ModelBook);
