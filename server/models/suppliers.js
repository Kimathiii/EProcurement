const { Schema, model } = require("mongoose");

const supplierSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			maxlength: 100,
		},
		items: [
			{
				name: {
					type: String,
					required: true,
				},
				price: {
					type: Number,
					required: true,
					min: 0, // Ensure price is non-negative
				},
			},
		],
		email: {
			type: String,
			required: true,
			unique: true,
			maxlength: 100,
		},
		phone: {
			type: String,
			required: true,
			maxlength: 20,
			unique: true,
		},
		address: {
			type: String, // Using String for TEXT equivalent
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

module.exports = model("Supplier", supplierSchema);
