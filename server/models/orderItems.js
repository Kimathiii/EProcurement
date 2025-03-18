const { Schema, model, Types } = require("mongoose");

const orderItemSchema = new Schema(
	{
		order_id: {
			type: Types.ObjectId, // Reference to the Order model
			ref: "Order",
			required: true,
		},
		inventory_id: {
			type: Types.ObjectId, // Reference to the Inventory model
			ref: "Inventory",
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
			min: 1, // Ensure at least one item is ordered
		},
		unit_price: {
			type: Number,
			required: true,
			min: 0, // Ensure price is non-negative
		},
		total_price: {
			type: Number,
			required: true,
			min: 0, // Ensure total price is non-negative
		},
	},
	{
		timestamps: true, // Automatically manage createdAt and updatedAt fields
	}
);

module.exports = model("OrderItem", orderItemSchema);
