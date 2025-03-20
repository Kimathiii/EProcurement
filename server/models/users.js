const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new Schema(
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
			// required: true,
			maxlength: 50,
			enum: ["admin", "supplier", "officer"], // Optional: restrict roles to specific values
			default: "admin",
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

// Hash the password before saving
UserSchema.pre("save", async function (next) {
	if (!this.isModified("password_hash")) return next();

	const salt = await bcrypt.genSalt(10);
	this.password_hash = await bcrypt.hash(this.password_hash, salt);
	next();
});

UserSchema.statics.login = async function (email, password) {
	try {
		const user = await this.findOne({ email });

		if (user && bcrypt.compareSync(password, user.password_hash)) {
			return user;
		}
		throw new Error("Incorrect credentials");
	} catch (error) {
		throw error;
	}
};

module.exports = model("User", UserSchema);
