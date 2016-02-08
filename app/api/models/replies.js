/*  ../models/replies.js*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var replySchema = new Schema({
    author: {
        type: String,
        required: true
    }, //{type: Schema.Types.ObjectId, ref: 'user' },
    title: String,
    content: String,

    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    },
    published: Boolean,
    answered: Boolean,
    confirmed: Boolean,
    helper: String
}, {
    collection: 'replies'
});

replySchema.pre('save', function(next) {
    now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
        this.created_at = now;
    }
    next();
});

module.exports = mongoose.model('replySchema', replySchema);