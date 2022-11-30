const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({

    title:String,
    is_completed:Boolean
});

const TastModel = mongoose.model('task', TaskSchema);

module.exports = TastModel;