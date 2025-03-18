const { Schema, model, Types } = require("mongoose");

const procurementActivitySchema = new Schema(
	{
		activity_type: {
			type: String,
			required: true,
			maxlength: 50,
			enum: ["order created", "payment made"], // Optional: restrict to specific activity types
		},
		description: {
			type: String, // Using String for TEXT equivalent
			required: true,
		},
		user_id: {
			type: Types.ObjectId, // Reference to the User model
			ref: "User",
			required: true,
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

module.exports = model("ProcurementActivity", procurementActivitySchema);
