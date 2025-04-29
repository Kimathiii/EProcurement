import Introduction from "./Introduction";
import usePost from "../../hooks/usePost";
import { useState } from "react";
import SubmitBtn from "./SubmitBtn";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import axiosInstance from "../../utils/axiosInstance";
import { Link } from "react-router-dom";

const Signin = () => {
	const url = "/auth/login"; // URL for the login endpoint
	// URL for the login endpoint
	const { post, loading } = usePost(url);
	const [isDisabled, setIsDisabled] = useState(false);
	const navigate = useNavigate();
	const { setUser } = useAuthContext();
	const [error, setError] = useState(""); // Add error state

	const [userDetails, setUserDetails] = useState({
		email: "",
		password: "",
	});
	
	const handleChange = (e) => {
		setUserDetails({
			...userDetails,
			[e.target.name]: e.target.value,
		});
		// Clear errors when user starts typing again
		if (error) setError("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsDisabled(true);
		setError(""); // Clear previous errors

		try {
			const { token } = await post(userDetails);
			localStorage.setItem("accessToken", token);
			const res = await axiosInstance.get("/auth/profile", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setUser(res.data);
			navigate("/");
		} catch (error) {
			console.log(error);
			// Handle different error types
			if (error.message) {
				setError(error.message);
			} else {
				setError("Authentication failed. Please check your email and password.");
			}
		} finally {
			setIsDisabled(false);
		}
	};

	return (
		<>
			<div className="justify-between items-center mt-28 mx-auto w-1/3 p-4 bg-white rounded-lg">
				<Introduction />
				<form className="px-4 py-8" onSubmit={handleSubmit}>
					{/* Display error message if it exists */}
					{error && (
						<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
							{error}
						</div>
					)}
					<input
						type="text"
						name="email"
						placeholder="email"
						onChange={handleChange}
						className="border mb-4 p-3 rounded-lg w-full focus:outline-none"
						required
					/>
					<input
						type="password"
						name="password"
						placeholder="password"
						onChange={handleChange}
						minLength={8}
						className="border user-invalid:border-red-200 focus:outline-none mb-4 p-3 rounded-lg w-full"
						required
					/>

					<SubmitBtn loading={loading} isDisabled={isDisabled} />
				</form>
				<p className="mt-3 ml-4 text-gray-400">
					Don't have an account? <Link to="/signup">Signup</Link>
				</p>
			</div>
		</>
	);
};

export default Signin;

