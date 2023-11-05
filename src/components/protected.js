import React from "react";
import { UserAuth } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

const Protected = ({ children }) => {
	const navigate = useNavigate();
	const { user } = UserAuth();
	if (!user) {
		console.log("user not found");
		navigate("/");
	}
	return children;
};
export default Protected;
