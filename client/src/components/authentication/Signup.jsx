import { Link, useNavigate } from "react-router-dom";
import Introduction from "./Introduction";
import { useState } from "react";
import usePost from "../../hooks/usePost";
import SubmitBtn from "./SubmitBtn";

const Signup = () => {
	const [userDetails, setUserDetails] = useState(null);
	const handleChange = (e) => {
		setUserDetails({
			...userDetails,
			[e.target.name]: e.target.value,
		});
	};
	const navigate = useNavigate();

	const url = "/auth/signup";
	const { post, loading } = usePost(url);

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(userDetails);

		try {
			await post(userDetails);
			navigate("/signin");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className=" justify-between items-center mt-28 mx-auto w-1/3 p-4 bg-white rounded-lg">
			<Introduction />
			<form className="p-4" onSubmit={handleSubmit}>
				<div className="flex space-x-3 w-full">
					<input
						type="text"
						name="name"
						placeholder="name"
						onChange={handleChange}
						className="border border-neutral-400 mb-4 p-3 rounded-lg w-full focus:outline-none"
					/>
				</div>
				<input
					type="text"
					name="email"
					placeholder="email"
					onChange={handleChange}
					className="border border-neutral-400 mb-4 p-3 rounded-lg w-full focus:outline-none"
				/>
				<input
					type="password"
					name="password"
					placeholder="password"
					minLength={8}
					onChange={handleChange}
					className="border border-neutral-400 mb-4 p-3 rounded-lg w-full focus:outline-none"
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
