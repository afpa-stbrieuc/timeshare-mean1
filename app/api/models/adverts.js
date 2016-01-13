/*  ../models/adverts.js*/

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var advertSchema   = new Schema({
	type: String,
        author : String,//{type: Schema.Types.ObjectId, ref: 'user' },
        title: String,
        content: String,
        media : String,
        loc: String,
        work_date : {type: Date, default: Date.now},
        work_duration_estimated : Number,
        created_at: {type: Date, default: Date.now},
        updated_at: {type: Date, default: Date.now},
        published: Boolean,
        answered: Boolean,    
        confirmed: Boolean,
        helper : String,//{type: Schema.Types.ObjectId, ref: 'user' },
        work_duration_real : Number
        },
        { 
            collection : 'adverts'
        });

module.exports = mongoose.model('timedb', advertSchema);


