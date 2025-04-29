import { Link, useNavigate } from "react-router-dom";
import Introduction from "./Introduction";
import { useState } from "react";
import usePost from "../../hooks/usePost";
import SubmitBtn from "./SubmitBtn";

const Signup = () => {
	const [userDetails, setUserDetails] = useState({
		name: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const url = "/auth/signup";
	const { post, loading } = usePost(url);

	const handleChange = (e) => {
		setUserDetails({
			...userDetails,
			[e.target.name]: e.target.value,
		});
		// Clear error when user starts typing
		if (error) setError("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(""); // Clear previous errors
		
		try {
			await post(userDetails);
			navigate("/signin");
		} catch (error) {
			console.log(error);
			if (error.message) {
				setError(error.message);
			} else {
				setError("Failed to create account. Please try again.");
			}
		}
	};

	return (
		<div className="justify-between items-center mt-28 mx-auto w-1/3 p-4 bg-white rounded-lg">
			<Introduction />
			<form className="p-4" onSubmit={handleSubmit}>
				{/* Display error message if it exists */}
				{error && (
					<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
						{error}
					</div>
				)}
				<div className="flex space-x-3 w-full">
					<input
						type="text"
						name="name"
						placeholder="name"
						onChange={handleChange}
						className="border border-neutral-400 mb-4 p-3 rounded-lg w-full focus:outline-none"
						required
					/>
				</div>
				<input
					type="text"
					name="email"
					placeholder="email"
					onChange={handleChange}
					className="border border-neutral-400 mb-4 p-3 rounded-lg w-full focus:outline-none"
					required
				/>
				<input
					type="password"
					name="password"
					placeholder="password"
					minLength={8}
					onChange={handleChange}
					className="border border-neutral-400 mb-4 p-3 rounded-lg w-full focus:outline-none"
					required
				/>
				<SubmitBtn loading={loading} />
			</form>
			<p className="mt-3 ml-4 text-gray-400">
				Already have an account? <Link to="/signin">Signin</Link>
			</p>
		</div>
	);
};

export default Signup;