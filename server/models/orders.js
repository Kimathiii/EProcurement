const { Schema, model, Types } = require("mongoose");

const orderSchema = new Schema(
	{
		order_items: {
			type: Array,
			required: true,
			minlength: 1, // Ensure order items array is not empty
		},
		supplier_id: {
			type: Types.ObjectId, // Reference to the Supplier model
			ref: "Supplier",
			required: true,
		},
		total_amount: {
			type: Number,
			required: true,
			min: 0, // Ensure total amount is non-negative
		},
		status: {
			type: String,
			required: true,
			maxlength: 50,
			enum: ["pending", "completed"], // Optional: restrict status to specific values
			default: "pending",
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

module.exports = model("Order", orderSchema);
