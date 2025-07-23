const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  createBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  name: { type: String, required: true },
  description:String
}, { timestamps: true });

module.exports = mongoose.model('Category', CategorySchema);