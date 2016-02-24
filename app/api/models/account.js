var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;



var accountSchema   = new Schema({
	user_Id: {type: Schema.Types.ObjectId, ref: 'userSchema'},
	solde: {type: Number, default: 120},
	adverts_Id: [{ 
            type: Schema.Types.ObjectId, ref: 'advertSchema', required: false
    }],
        starRating: [{type: Number, default: 3}],
	created_at: {type: Date, default: Date.now},
        updated_at: {type: Date, default: Date.now}
},
{
	collection: 'account'
});

module.exports = mongoose.model('account', accountSchema);

