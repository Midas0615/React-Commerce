const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var menuItemSchema = new Schema({
	itemName: String,
	itemPrice: Number,
	category: String
})

var ticketSchema = new Schema ({
	createdBy: String,
	createdAt: Date,
	customer: String,
	items: [menuItemSchema],
	subTotal:{type: Number, default: 0.00 },
	tax: { type:Number, default: 0.00 },
	discount: { type: Number, default: 0.00 },
	total: { type: Number, default: 0.00 },

	status: String // Open, Fired, Delivered, Void, Paid

});

module.exports.menuSchema = menuItemSchema;
module.exports.ticketSchema = ticketSchema;

