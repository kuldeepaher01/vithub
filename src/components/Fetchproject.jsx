import React, { useEffect, useState } from "react";
import {
	collection,
	getDocs,
	query,
	limit,
	startAfter,
} from "firebase/firestore";
import { db } from "../firebase";
import ProjectCard from "./ProjectCard";
import { UserAuth } from "../context/AuthContext";
import { Spinner } from "@chakra-ui/react";

function Fetchproject() {
	const [projects, setProjects] = useState([]);
	const { user, logOut } = UserAuth();
	const [isLoading, setIsLoading] = useState(true);
	const [lastDoc, setLastDoc] = useState(null);
	const pageSize = 2;
	const fetchProjects = async () => {
		try {
			let projectsColl = collection(db, "projects");
			let projectsRef = query(projectsColl, limit(pageSize));

			if (lastDoc) {
				projectsRef = query(projectsColl, startAfter(lastDoc), limit(pageSize));
			}
			const querySnapshot = await getDocs(projectsRef);
			const projectsData = querySnapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));
			setProjects(projectsData);
			setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
			setIsLoading(false);
		} catch (error) {
			console.error("Error fetching projects: ", error);
		}
	};
	useEffect(() => {
		if (user.uid !== undefined) {
			fetchProjects();
		}
	}, [user]);

	return (
		<div className="mt-4 -ml-20 mr-20 mb-8">
			{isLoading ? (
				<div className="flex gap-4 justify-center items-center">
					<Spinner
						thickness="4px"
						speed="0.65s"
						emptyColor="gray.200"
						color="blue.500"
						size="xl"
					/>
					<h1 className="text-xl text-blue-500 ">
						Fetching Projects Hold On....
					</h1>
				</div>
			) : (
				<>
					{projects.map((project, index) => (
						<ProjectCard
							key={project.id || index}
							title={project.title}
							description={project.description}
							hashtags={project.tags}
							students={project.groupMembers}
							guideName={project.guide}
							Owner={project.user}
							timestmp={project.createdAt}
							projectID={project.projectID}
						/>
					))}

					{projects.length === 0 ? (
						<>
							<div
								id="alert-2"
								className=" flex items-center transition duration-500 ease-out p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
								role="alert"
							>
								<svg
									className="flex-shrink-0 w-4 h-4"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
								</svg>
								<span className="sr-only">Info</span>
								<div className="ml-3 text-sm font-medium">
									There are no projects to show,{" "}
									<a
										href="/newprojects"
										className="tfont-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"
									>
										upload
									</a>{" "}
									more projects or dismiss to go to previous page.
								</div>
								<button
									onClick={fetchProjects}
									type="button"
									className="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
									data-dismiss-target="#alert-2"
									aria-label="Close"
								>
									<span className="sr-only">Close</span>
									<svg
										className="w-3 h-3"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 14 14"
									>
										<path
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
										/>
									</svg>
								</button>
							</div>
						</>
					) : (
						<div className="flex justify-end mb-4 ">
							<button
								type="button"
								className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
								onClick={fetchProjects}
							>
								Next Page
							</button>
						</div>
					)}
				</>
			)}
		</div>
	);
}

export default Fetchproject;
