const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const detailSchema = new Schema({
    name: { type: String, required: true },
    total: { type: Number, required: true }
});

const detail = mongoose.model('detail', detailSchema);

module.exports = detail;
