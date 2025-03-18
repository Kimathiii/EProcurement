const { Schema, model, Types } = require("mongoose");

const invoiceSchema = new Schema(
	{
		order_id: {
			type: Types.ObjectId, // Reference to the Order model
			ref: "Order",
			required: true,
		},
		invoice_number: {
			type: String,
			required: true,
			unique: true,
			maxlength: 50,
		},
		amount: {
			type: Number,
			required: true,
			min: 0, // Ensure amount is non-negative
		},
		status: {
			type: String,
			required: true,
			maxlength: 50,
			enum: ["unpaid", "paid"], // Optional: restrict status to specific values
		},
		due_date: {
			type: Date,
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

module.exports = model("Invoice", invoiceSchema);
