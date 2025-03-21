// import axios from "axios";
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import profile from "../../assets/images/user.png";

const Profile = () => {
	const { user } = useAuthContext();

	return (
		<div className="flex space-x-3 p-2 rounded-lg items-center border min-w-[150px] float-right">
			<img src={profile} alt="user profile" className="w-6 h-6" />
			<p>{user?.name}</p>
		</div>
	);
};

export default Profile;
