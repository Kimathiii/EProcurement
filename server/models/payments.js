const { Schema, model, Types } = require("mongoose");

const paymentSchema = new Schema(
	{
		invoice_id: {
			type: Types.ObjectId, // Reference to the Invoice model
			ref: "Invoice",
			required: true,
		},
		payment_method: {
			type: String,
			required: true,
			maxlength: 50,
			enum: ["bank transfer", "credit card", "cash"], // Optional: restrict to specific methods
		},
		amount: {
			type: Number,
			required: true,
			min: 0, // Ensure amount is non-negative
		},
		transaction_id: {
			type: String,
			required: true,
			unique: true,
			maxlength: 100,
		},
		status: {
			type: String,
			required: true,
			maxlength: 50,
			enum: ["success", "failed", "pending"], // Optional: restrict to specific statuses
		},
		created_at: {
			type: Date,
			default: Date.now,
		},
	},
	{
		timestamps: { createdAt: "created_at" }, // Automatically manage created_at field
	}
);

module.exports = model("Payment", paymentSchema);
