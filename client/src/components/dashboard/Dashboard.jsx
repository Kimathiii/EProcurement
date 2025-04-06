import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NavBar from "../navigation/NavBar";
import SideNav from "../navigation/SideNav";
import { useAuthContext } from "../../context/AuthContext";
import { useState, useEffect } from "react";

const Dashboard = () => {
	const { user } = useAuthContext();
	const location = useLocation();
	const navigate = useNavigate();
	const [seconds, setSeconds] = useState(user === null ? 5 : 0);

	// Manage countdown timer
	useEffect(() => {
		if (user === null) {
			const interval = setInterval(() => {
				setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
			}, 1000);

			// Cleanup interval on unmount
			return () => clearInterval(interval);
		}
	}, [user]);

	// Navigate to /signin after 5 seconds if user is not logged in
	useEffect(() => {
		if (user === null) {
			const timeout = setTimeout(() => {
				if (location?.pathname !== "/signup") {
					navigate("/signin");
				}
			}, 5000);

			// Cleanup timeout on unmount
			return () => clearTimeout(timeout);
		}
	}, [user, location, navigate]);

	return (
		<div>
			{user === null && location.pathname !== "/signup" && (
				<div className="text-gray-500 absolute text-center bg-red-100 top-[12%] z-50 ml-[50%] p-2 rounded">
					Navigating to signin in {seconds} seconds
				</div>
			)}
			<NavBar />
			<SideNav />
			<Outlet />
		</div>
	);
};

export default Dashboard;
