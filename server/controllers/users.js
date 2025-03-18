const User = require("../models/users");
const jwt = require("jsonwebtoken");
const { SECRET_KEY, ACCESS_TOKEN_EXPIRY } = process.env;
const bcrypt = require("bcrypt");

const generateToken = (payload) => {
	const accessToken = jwt.sign(payload, SECRET_KEY, {
		expiresIn: ACCESS_TOKEN_EXPIRY,
		algorithm: "HS256",
	});

	return accessToken;
};

const signIn = async (req, res) => {
	try {
		const { email, password } = req.body;

		// Check if the user exists
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Compare the provided password with the stored hashed password
		const isPasswordValid = await bcrypt.compare(password, user.password_hash);
		if (!isPasswordValid) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		const accessToken = generateToken({ id: user._id, role: user.role });

		res.status(200).json({
			message: "Sign-in successful",
			accessToken,
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
			},
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const signUp = async (req, res) => {
	const { name, password_hash, email } = req.body;

	if (!name || !password_hash || !email) {
		return res.status(400).json({ message: "All fields are required" });
	}

	try {
		await User.create({
			name,
			password_hash,
			email,
		});

		res.status(201).json({ message: "User registered successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getUser = async (req, res) => {
	const { id } = req.params;
	try {
		const user = await User.findById(id);
		if (user) {
			res.status(200).json({ user });
		} else {
			res.status(404).json({ message: "User not found" });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	signUp,
	getUser,
	signIn,
};
