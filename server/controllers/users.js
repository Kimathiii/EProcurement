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
const authenticate = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) {
		return res.status(401).json({ message: "No token provided" });
	}

	jwt.verify(token, SECRET_KEY, (err, user) => {
		if (err) {
			console.log(err.message);
			return res.status(403).json({ message: "Invalid token" });
		}

		req.user = user;
		next();
	});
};

const signIn = async (req, res) => {
	try {
		const { email, password } = req.body;

		// Check if the user exists
		const user = await User.login(email, password);

		const accessToken = generateToken({
			id: user._id,
			role: user.role,
			name: user.name,
			email: user.email,
		});

		res.status(200).json({
			message: "Sign-in successful",
			accessToken,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const signUp = async (req, res) => {
	const { name, password, email } = req.body;

	if (!name || !password || !email) {
		return res.status(400).json({ message: "All fields are required" });
	}

	try {
		await User.create({
			name,
			password_hash: password,
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
		consolelog(user);
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
	authenticate,
};
