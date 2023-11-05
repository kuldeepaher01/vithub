import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, deleteObject, listAll } from "firebase/storage";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import Playground from "../components/NavBar";
import Header from "../components/Header";
import { MdFolderZip, MdDelete } from "react-icons/md";
import { FaFilePdf, FaYoutube } from "react-icons/fa";
import { BsFiletypePptx } from "react-icons/bs";
import { Spinner } from "@chakra-ui/react";
import { Alert, AlertIcon } from "@chakra-ui/react";
import Project from "../components/Project";
import { BsDownload } from "react-icons/bs";
import { BiSolidEditAlt } from "react-icons/bi";

import { UserAuth } from "../context/AuthContext";

const fileIcons = {
	zip: <MdFolderZip size={21} color="navy" />,
	pdf: <FaFilePdf size={21} color="navy" />,
	ppt: <BsFiletypePptx size={21} color="navy" />,
	pptx: <BsFiletypePptx size={21} color="navy" />,
};
function YoutubeEmbed({ url }) {
	const videoId = getYoutubeId(url);
	const embedUrl = `https://www.youtube.com/embed/${videoId}`;

	return (
		<iframe
			className="flex items-center justify-center"
			width="1080"
			height="480"
			src={embedUrl}
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowFullScreen
			title="Embedded YouTube Video"
		/>
	);
}
function getYoutubeId(url) {
	const urlParts = url.split("v=");
	if (urlParts.length > 1) {
		return urlParts[1].substring(0, 11);
	} else {
		return null;
	}
}

function ProjectDetail() {
	const { user, logOut } = UserAuth();
	const navigate = useNavigate();
	const { projectId } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [isFound, setISFound] = useState(true);
	const [isDeleted, setIsDeleted] = useState(false);

	const [project, setProject] = useState(null);
	function getFileName(url) {
		const decodedUrl = decodeURIComponent(url);
		const urlObj = new URL(decodedUrl);
		return urlObj.pathname.split("/").pop();
	}

	useEffect(() => {
		const fetchProject = async () => {
			try {
				const docRef = doc(db, "projects", projectId);
				const docSnap = await getDoc(docRef);

				if (docSnap.exists()) {
					setProject(docSnap.data());

					setIsLoading(false);
				} else {
					setISFound(false);
					setIsLoading(false);
					// navigate("/explore");
				}
			} catch (error) {
				setISFound(false);
				console.error("Error fetching project: ", error);
			}
		};

		fetchProject();
	}, [projectId]);

	function onEdit() {
		navigate(`/edit/${projectId}`);
	}

	async function onDelete() {
		try {
			const confirmDelete = window.confirm(
				"Are you sure you want to delete this project?",
			);
			if (!confirmDelete) {
				return; // stop execution if the user cancelled the delete
			}

			const storage = getStorage();

			// list all files in the directory
			const listResult = await listAll(ref(storage, `Files/${projectId}`));

			// create an array of promises to delete each file
			const deletePromises = listResult.items.map((fileRef) =>
				deleteObject(fileRef),
			);

			// wait for all delete operations to complete
			try {
				await Promise.all(deletePromises);
			} catch (error) {
				console.error("Error deleting files: ", error);
				throw new Error(
					"An error occurred while deleting the files. Please try again.",
				);
			}

			// delete the document in 'projects'
			const projectDocRef = doc(db, "projects", projectId);
			await deleteDoc(projectDocRef);

			// delete the document in 'users'
			const userProjectDocRef = doc(
				db,
				"users",
				user.uid,
				"projects",
				projectId,
			);
			await deleteDoc(userProjectDocRef);
			setIsDeleted(true);
		} catch (error) {
			console.error("Error deleting project: ", error);
			alert("An error occurred while deleting the project. Please try again.");
		}
	}

	return (
		<>
			<div className="grid grid-cols-4">
				<div className="col-span-1">
					<Playground />
				</div>

				<div className="col-span-3">
					<Header name="Explore Projects" />

					{isLoading ? (
						<div className="-ml-20 flex gap-4 justify-center items-center">
							<Spinner
								thickness="4px"
								speed="0.65s"
								emptyColor="gray.200"
								color="blue.500"
								size="xl"
							/>
							<h1 className="text-xl text-blue-500 ">
								Communing with the Digital Spirits 📡: Your project is en
								route...
							</h1>
						</div>
					) : !isFound ? (
						<>
							<Alert className="-ml-20 " status="error">
								<AlertIcon />
								The project you are looking for does not exist.
							</Alert>
							<div className="flex justify-end mr-12 mt-4 ">
								<button
									type="button"
									className="text-blue-700 bg-white hover:bg-blue-700 hover:text-white focus:ring-4  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
									onClick={() => navigate("/explore")}
								>
									Go Back to Explore
								</button>
							</div>
						</>
					) : isDeleted ? (
						<>
							<Alert className="-ml-20" status="success" variant="solid">
								<AlertIcon />
								Project deleted successfully!
							</Alert>

							<div className="flex justify-end mr-12 mt-4 ">
								<button
									type="button"
									className="text-blue-700 bg-white hover:bg-blue-700 hover:text-white focus:ring-4  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
									onClick={() => navigate("/explore")}
								>
									Go Back to Explore
								</button>
							</div>
						</>
					) : (
						<div className="-ml-20 mr-8">
							{project.userID == user.uid ? (
								<div className=" flex gap-4">
									<div className="flex">
										<button
											type="button"
											onClick={onEdit}
											className="flex gap-2 text-black bg-white hover:bg-green-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
										>
											<BiSolidEditAlt size={22} />
											Edit
										</button>
									</div>

									<button
										onClick={onDelete}
										className="flex gap-2 text-black bg-white hover:bg-red-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
									>
										<MdDelete size={22} />
										Delete
									</button>
								</div>
							) : null}

							<Project project={project} />
							<div className="mt-4 w-full p-2 rounded-lg shadow-lg sm:p-8  border  hover:border-blue-800 hover:border-2 ">
								<span className="flex gap-4 items-center">
									<BsDownload color="navy" size={32} />
									<h1 className="text-xl">Download project files</h1>
								</span>
								<ol>
									{project.fileURLs.map((fileURL, index) => (
										<div key={index}>
											<span
												className="mt-4 ml-12 "
												style={{ display: "flex", alignItems: "center" }}
											>
												{
													fileIcons[
														getFileName(fileURL).split(".").pop().toLowerCase()
													]
												}{" "}
												<span style={{ marginLeft: "5px", color: "blue" }}>
													<a
														href={fileURL}
														target="_blank"
														download
														className="hover:font-bold"
													>
														Download {getFileName(fileURL)}
													</a>
												</span>
											</span>
										</div>
									))}
								</ol>
							</div>
							<div className="mt-4 w-full p-2 rounded-lg shadow-lg sm:p-8  border  hover:border-blue-800 hover:border-2 mb-4 ">
								<span className="flex gap-4 items-center mb-4">
									<FaYoutube color="red" size={32} />
									<h1 className=" text-xl">Project demo on yt </h1>
								</span>
								{project && project.youtubeLink && (
									<YoutubeEmbed url={project.youtubeLink} />
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
}

export default ProjectDetail;
