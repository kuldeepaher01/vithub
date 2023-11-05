import { useContext, createContext, useEffect } from "react";
import { auth } from "../firebase";
import {
	GoogleAuthProvider,
	signInWithPopup,
	signInWithRedirect,
	signOut,
	onAuthStateChanged,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
} from "@chakra-ui/react";

const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
	const navigate = useNavigate();
	const [user, setUser] = useState({});
	const googleSignIn = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider);
	};
	const logOut = () => {
		signOut(auth);
		localStorage.removeItem("user"); // Remove user from localStorage
	};
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			if (currentUser && !currentUser.email.endsWith("@vit.edu")) {
				<Alert status="error">
					<AlertIcon />
					<AlertTitle>Wrong email ID</AlertTitle>
					<AlertDescription>Please use vit.edu mail only :)</AlertDescription>
				</Alert>;

				signOut(auth);
				// console.log(currentUser.email);
				setUser(null);
			} else {
				setUser(currentUser);
				localStorage.setItem("user", JSON.stringify(currentUser)); // Store user in localStorage
			}
		});
		return () => {
			unsubscribe();
		};
	}, []);
	return (
		<AuthContext.Provider value={{ googleSignIn, logOut, user }}>
			{children}
		</AuthContext.Provider>
	);
};

export const UserAuth = () => {
	return useContext(AuthContext);
};
