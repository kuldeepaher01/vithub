import { Heading, Text, Box, Flex, Link } from "@chakra-ui/react";
import GoogleButton from "react-google-button";
import { UserAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { StyledLogo } from "../components/StyledLogo";
import {
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
} from "@chakra-ui/react";
function Home() {
	const location = useLocation();
	const { googleSignIn, user } = UserAuth();
	const navigate = useNavigate();
	const handleGoogleSignIn = async () => {
		try {
			await googleSignIn();
		} catch (err) {
			<Alert status="error">
				<AlertIcon />
				<AlertTitle>Error occured</AlertTitle>
				<AlertDescription>{err}</AlertDescription>
			</Alert>;
		}
	};
	useEffect(() => {
		if (user != null) {
			if (user.uid != null) {
				navigate("/home");
			}
		}
	}, [user, location]);

	return (
		<Flex direction="column" align="center" justify="center" h="100vh">
			<StyledLogo>VIT HUB</StyledLogo>
			<Text fontSize="xl" color="gray.500">
				A place for all your projects!
			</Text>
			<Box mt={4}>
				<GoogleButton type="light" onClick={handleGoogleSignIn} />
			</Box>
			<Box>
				<Text
					color={"gray.500"}
					_hover={{ backgroundColor: "red.100" }}
					marginTop={4}
					fontSize="sm"
					fontWeight="medium"
				>
					{" "}
					Use your official{" "}
					<Link color="teal.500" href="https://www.vit.edu" isExternal>
						vit.edu
					</Link>{" "}
					mail ID only{" "}
				</Text>
			</Box>
		</Flex>
	);
}

export default Home;
