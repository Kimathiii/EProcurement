const { Schema, model } = require("mongoose");

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			maxlength: 100,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			maxlength: 100,
		},
		password_hash: {
			type: String,
			required: true,
			maxlength: 255,
		},
		role: {
			type: String,
			required: true,
			maxlength: 50,
			enum: ["admin", "supplier", "officer"], // Optional: restrict roles to specific values
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

module.exports = model("User", userSchema);
