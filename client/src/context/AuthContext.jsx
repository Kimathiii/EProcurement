/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { isAxiosError } from "axios";

// Create the context with a default value
const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const res = await axiosInstance.get("/auth/profile", {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
					},
				});
				setUser(res.data);
			} catch (error) {
				const timeout = setTimeout(() => {
					if (location?.pathname !== "/signup") navigate("/signin");
				}, 5000);
				return () => clearTimeout(timeout);
			}
		};

		fetchProfile();
	}, []);

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
};

// Custom hook to use the AuthContext
export const useAuthContext = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuthContext must be used within an AuthProvider");
	}
	return context;
};
