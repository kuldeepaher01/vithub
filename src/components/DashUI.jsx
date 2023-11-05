import React from "react";
import { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { FiSearch } from "react-icons/fi";
import {
	getCountFromServer,
	getFirestore,
	collection,
} from "firebase/firestore";
import { FiFolder, FiUpload } from "react-icons/fi";
import { MdRateReview } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { PiShootingStarFill } from "react-icons/pi";
import Card from "./card";
import { Avatar } from "@chakra-ui/react";
import Banner from "../assets/banner.svg";
import Kuldeep from "../assets/dev1.png";
import Dev3 from "../assets/dev3.jpeg";
import Dev2 from "../assets/dev2.jpeg";
import Welcome from "./Welcome";

export default function DashUI() {
	const { user, logOut } = UserAuth();
	const [projectCount, setProjectCount] = useState(0);
	const handleSignOut = async () => {
		try {
			await logOut();
		} catch (err) {
			console.log(err);
		}
	};
	const profileLink = user?.photoURL
		? user?.photoURL
		: "https://www.gravatar.com/avatar/00";
	const userName = user?.displayName ? user?.displayName : "User";
	useEffect(() => {
		async function fetchProjectCount() {
			if (user && user.uid) {
				const firestore = getFirestore();
				const userProjectCollectionReference = collection(
					firestore,
					"users",
					user.uid,
					"projects",
				);
				const userProjectCollectionSnapshot = await getCountFromServer(
					userProjectCollectionReference,
				);
				setProjectCount(userProjectCollectionSnapshot.data().count);
			}
		}
		fetchProjectCount();
	}, [user]);
	return (
		<div className="">
			<div className="grid grid-cols-4 gap-4 -ml-24">
				<div className="col-span-3">
					<div className="hover:border-2 hover:border-blue-900  relative flex justify-between flex-col border bg-[#f5f7fc] border-gray-400 rounded-lg p-4 hover:shadow-xl transition-shadow duration-300 ">
						<PiShootingStarFill size={36} color="#0098e5" />
						<h1 className="text-3xl font-bold mb-2 mt-2">Get Started!</h1>
						<p className="text-gray-800 mt-2 ml-2 text-xl">
							Welcome to our all-in-one project platform for VIT students!
						</p>
						<ol className="list-decimal ml-12 text-xl">
							<li>Share your projects with fellow VITians.</li>
							<li>Connect with peers and learn together.</li>
						</ol>
						<p className="text-gray-800 mt-2 ml-2 text-xl">
							Experience collaborative learning at its best. Start now, upload
							your project!
						</p>
						<Welcome />
					</div>
					<div className=" grid grid-cols-3 gap-4 mt-2">
						<Card
							title={"Project"}
							description={"View your projects and upload new ones!"}
							link={"/myprojects"}
							button={"View Projects"}
							icon={FiFolder}
						/>
						<Card
							title={"Explore"}
							description={"Explore projects uploaded by other students!"}
							link={"/explore"}
							button={"Explore Projects"}
							icon={FiSearch}
						/>
						<Card
							title={"New Project"}
							description={"Upload a new project to the database!"}
							link={"/newprojects"}
							button={"Upload Project"}
							icon={FiUpload}
						/>
					</div>
				</div>

				<div className=" hover:border-2 hover:border-blue-900  col-span-1 border border-gray-400 bg-[#f5f7fc] rounded-lg p-4 hover:shadow-xl transition-shadow duration-300 mr-4">
					<div className="felx flex-auto items-center">
						<Avatar
							size="full"
							name={userName}
							src={profileLink}
							className="mr-4"
						/>
						<div className="">
							<h1 className="text-center text-l font-bold mt-2 text-blue-500">
								Welcome, {user.displayName} &#128075;
							</h1>
							<p className="text-center text-blue-950 text-m font-semibold">
								{user.email}
							</p>
						</div>
					</div>

					<div className="mt-4 p-4 bg-gray-200 rounded-lg ">
						<h1 className="text-l text-center font-semibold">
							Projects Uploaded:
						</h1>
						<h1 className="text-center">{projectCount}</h1>
					</div>
					<div className=" mt-4 flex flex-col items-center">
						<button
							type="button"
							className="flex bg-white-700 hover:bg-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							onClick={handleSignOut}
						>
							Sign Out
						</button>
					</div>
				</div>
			</div>
			<div className="grid grid-cols-4 gap-4 mt-2 -ml-24 ">
				<Card
					className="col-span-1"
					title={"Rate Us"}
					description={"Rate us and give us your valuable feedback!"}
					link={"/rate"}
					icon={MdRateReview}
					button={"Rate Us"}
				/>
				<div className="flex col-span-2 border-4 border-blue-900 border-gray-400 bg-[#f5f7fc] rounded-lg hover:shadow-xl transition-shadow duration-300 relative">
					<img className="flex-auto rounded-md" src={Banner} alt="banner" />
					<div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
						<p className="text-blue-100 text-2xl font-bold">
							VIT HUB, One Stop for all your project files!!
						</p>
					</div>
				</div>
				<div className="border  border-gray-400  bg-[#f5f7fc] rounded-lg hover:shadow-xl transition-shadow duration-300 p-4 mr-4 h-52">
					<h1 className="text-xl font-bold">Meet Developers</h1>
					<div className="flex flex-auto items-center mt-1 hover:font-bold">
						<Avatar
							name="Kuldeep Aher"
							bgColor={"linkedin.400"}
							textColor={"white"}
							src={Kuldeep}
						/>
						<a
							href="https://www.linkedin.com/in/kuldeep-aher"
							target="_blank"
							rel="noopener noreferrer"
						>
							<h1 className="ml-2 text-center text-l hover:font-semibold">
								Kuldeep Aher
							</h1>
						</a>
					</div>

					<div className="flex flex-auto items-center mt-1 hover:font-semibold">
						<Avatar
							name="Shrirang Mahankaliwar"
							bgColor={"facebook.500"}
							textColor={"white"}
							src={Dev2}
						/>
						<a
							href="https://www.linkedin.com/in/shrirang-mahankaliwar-85792b240/"
							target="_blank"
							rel="noopener noreferrer"
						>
							<h1 className="ml-2 text-center text-l hover:cursor-pointer">
								Shrirang Mahankaliwar
							</h1>
						</a>
					</div>
					<div className="flex flex-auto items-center mt-1 hover:font-semibold">
						<Avatar
							size={"md"}
							name="Swaya Mahale"
							bgColor={"whatsapp.500"}
							textColor={"white"}
							src={Dev3}
						/>
						<a
							href="https://www.linkedin.com/in/swayamprakash-mahale-10b1a5235/"
							target="_blank"
							rel="noopener noreferrer"
						>
							<h1 className="ml-2 text-center text-l hover:cursor-pointer">
								Swayamprakash Mahale
							</h1>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
