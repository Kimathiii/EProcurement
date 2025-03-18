const { Schema, model, Types } = require("mongoose");

const inventorySchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			maxlength: 100,
		},
		description: {
			type: String, // Using String for TEXT equivalent
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
			min: 0, // Ensure quantity is non-negative
		},
		unit_price: {
			type: Number,
			required: true,
			min: 0, // Ensure price is non-negative
		},
		supplier_id: {
			type: Types.ObjectId, // Reference to the Supplier model
			ref: "Supplier",
			required: true,
		},
		created_at: {
			type: Date,
			default: Date.now,
		},
		updated_at: {
			type: Date,
			default: Date.now,
		},
	},
	{
		timestamps: { createdAt: "created_at", updatedAt: "updated_at" }, // Automatically manage timestamps
	}
);

module.exports = model("Inventory", inventorySchema);
