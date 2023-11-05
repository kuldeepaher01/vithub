import React from "react";
import { useState, useRef } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdFolderZip } from "react-icons/md";
import { FaFilePdf } from "react-icons/fa";
import { BsFiletypePptx } from "react-icons/bs";
import { storage, db } from "../firebase";
import { UserAuth } from "../context/AuthContext";
import { doc, collection, addDoc, updateDoc, setDoc } from "firebase/firestore";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
const fileIcons = {
	zip: <MdFolderZip style={{ color: "blue" }} />,
	pdf: <FaFilePdf style={{ color: "blue" }} />,
	ppt: <BsFiletypePptx style={{ color: "blue" }} />,
	pptx: <BsFiletypePptx style={{ color: "blue" }} />,
};
export default function Addproject() {
	const [selectedFiles, setSelectedFiles] = useState([]);
	const formRef = React.useRef(null);
	const fileInputRef = React.useRef(null);
	const [selectedOption, setSelectedOption] = useState("");
	const [loading, setLoading] = useState(false);
	const Navigate = useNavigate();
	const handleFileChange = (e) => {
		const files = Array.from(e.target.files);
		setSelectedFiles(files);
	};
	const removeFile = (index) => {
		const updatedFiles = [...selectedFiles];
		updatedFiles.splice(index, 1);
		setSelectedFiles(updatedFiles);
	};
	const { user, logOut } = UserAuth();
	function LoadingOverlay({ isLoading }) {
		if (!isLoading) {
			return null;
		}

		return (
			<div className="ml-20 fixed inset-0 flex items-center justify-center z-50">
				<div className=" bg-white opacity-75 rounded-lg w-3/4 h-3/4 flex items-center justify-center">
					<div className="flex items-center space-x-2">
						<div className="w-8 h-8 border-t-2 border-blue-500 rounded-full animate-spin"></div>
						<span>Uploading...</span>
					</div>
				</div>
			</div>
		);
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		let downloadURLs = [];
		// Get the form data
		const projectData = {
			title: e.target.floating_title.value,
			tags: e.target.floating_tags.value,
			guide: e.target.floating_guide.value,
			division: e.target.floating_div.value,
			groupMembers: e.target.floating_grname.value,
			youtubeLink: e.target.floating_yt.value,
			techHardware: e.target["tech-hardware"].value,
			description: e.target.message.value,
			user: user.displayName,
			userID: user.uid,
			fileURLs: downloadURLs,
			createdAt: new Date(),
			projectID: "",
		};

		// Generate a unique ID for the project
		const projectRef = await addDoc(collection(db, "projects"), projectData);
		const projectId = projectRef.id;

		// Add the unique ID to the project data
		projectData.projectID = projectId;

		downloadURLs = await Promise.all(
			selectedFiles.map(async (file) => {
				// Use the unique ID to create a folder for the file
				const fileRef = ref(storage, `Files/${projectId}/${file.name}`);
				await uploadBytes(fileRef, file);
				return await getDownloadURL(fileRef);
			}),
		);

		// Store the project data in a subcollection under the user's document
		try {
			await setDoc(doc(db, "users", user.uid, "projects", projectId), {
				...projectData,
				fileURLs: downloadURLs,
			});
			const projectRef = doc(db, "projects", projectId);
			await updateDoc(projectRef, {
				fileURLs: downloadURLs,
				projectID: projectId,
			});
			setLoading(false);
			formRef.current.reset();
			fileInputRef.current.value = "";
			alert("Project added successfully");
			Navigate("/myprojects");
		} catch (error) {
			console.log("Error adding project: ", error);
			alert("Error adding project: ", error);
		}
	};

	return (
		<div className="flex">
			<LoadingOverlay isLoading={loading} />

			<div className="w-2/5 -ml-8">
				<div className="mt-8 flex items-center -ml-12">
					<AiOutlineCloudUpload className="text-5xl text-[#009fdb]" />
					<h1 className="font-bold text-3xl ml-2">
						Add your project details here
					</h1>
				</div>

				<div className="mt-4 justify-start -ml-12 mr-10">
					<p className="text-2xl font-bold mb-2">Instructions:</p>
					<ol className="text-xl text list-decimal list-inside mt-2">
						<li className="my-2">
							Fill out the title of your project in the first field.
						</li>
						<li className="my-2">
							In the second field, add tags of technology frameworks used. E.g
							#React, #Node, #Django, #OpenCV
						</li>
						<li className="my-2">
							In the third field, add a brief guide on how to use your project.
						</li>
						<li className="my-2">
							Upload the zip file of your project, research paper, and PPT in
							the file upload field.
						</li>
					</ol>
				</div>

				<div className="mt-8 -ml-12 mr-12">
					<label
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						htmlFor="multiple_files"
					>
						Upload Zip file of your project and other documents here
					</label>
					<input
						ref={fileInputRef}
						className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
						id="multiple_files"
						type="file"
						accept=".zip,.ppt,.pptx,.pdf,.jpg, .png, .jpeg, .xls, .xlsx, .doc, .docx, .py, .cpp, .java"
						multiple
						required
						onChange={handleFileChange}
					/>
					{selectedFiles.length > 0 && (
						<div className="mt-2">
							<strong>Selected Files:</strong>
							<ul>
								{selectedFiles.map((file, index) => (
									<li key={index}>
										<span style={{ display: "flex", alignItems: "center" }}>
											{fileIcons[file.name.split(".").pop().toLowerCase()]}{" "}
											<span style={{ marginLeft: "5px", color: "blue" }}>
												{file.name}
											</span>
											<button
												onClick={() => removeFile(index)}
												style={{
													marginLeft: "10px",
													background: "none",
													border: "none",
													color: "red",
													cursor: "pointer",
												}}
											>
												Remove
											</button>
										</span>
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
			</div>
			<div className="w-3/5 mt-10 mr-10">
				<form ref={formRef} onSubmit={handleSubmit}>
					<div className="relative z-0 w-full mb-6 group">
						<input
							type="text"
							name="floating_title"
							id="floating_title"
							className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
							placeholder=" "
							required
						/>
						<label
							htmlFor="floating_title"
							className="peer-focus:font-medium absolute text-m text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
						>
							Title of your project
						</label>
					</div>
					<div className="relative z-0 w-full mb-6 group">
						<input
							type="text"
							name="floating_tags"
							id="floating_tags"
							className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder:text-gray-500"
							placeholder=""
							required
						/>
						<label
							htmlFor="floating_tags"
							className="peer-focus:font-medium absolute text-m text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
						>
							# Tags of tech used
						</label>
					</div>
					<div className="grid md:grid-cols-2 md:gap-6">
						<div className="relative z-0 w-full mb-6 group">
							<input
								type="text"
								name="floating_guide"
								id="floating_guide"
								className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
								placeholder=" "
								required
							/>
							<label
								htmlFor="floating_guide"
								className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
							>
								Guide name
							</label>
						</div>
						<div className="relative z-0 w-full mb-6 group">
							<input
								type="text"
								name="floating_div"
								id="floating_div"
								className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
								placeholder=" "
								required
							/>
							<label
								htmlFor="floating_div"
								className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
							>
								Division (Ex. TY-ET-C)
							</label>
						</div>
					</div>
					<div className="grid md:grid-cols-2 md:gap-6">
						<div className="relative z-0 w-full mb-6 group">
							<input
								type="text"
								name="floating_grname"
								id="floating_grname"
								className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
								placeholder=" "
								required
							/>
							<label
								htmlFor="floating_grname"
								className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
							>
								Group members (Full name separated by commas)
							</label>
						</div>
						<div className="relative z-0 w-full mb-6 group">
							<input
								type="text"
								name="floating_yt"
								id="floating_yt"
								className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
								placeholder=" "
								required
							/>
							<label
								htmlFor="floating_yt"
								className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
							>
								YouTube Link (E.g. https://youtu.be/2zYm-l3wY7g)
							</label>
						</div>
					</div>

					<label
						htmlFor="tech-hardware"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Select an option
					</label>
					<select
						id="tech-hardware"
						className=" mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						value={selectedOption}
						onChange={(e) => setSelectedOption(e.target.value)}
					>
						<option value="">Choose technology / hardware</option>
						<option value="Hardware">Hardware / Electronics</option>
						<option value="IoT">Arduino / Embedded</option>
						<option value="AI">AI / ML</option>
						<option value="WEBD">Web Development</option>
						<option value="WEB3">Web 3.0</option>
						<option value="APPD">App Development</option>
						<option value="Mech">Mechanical</option>
					</select>

					<div>
						<label className="sr-only" htmlFor="message">
							message
						</label>

						<textarea
							maxLength={1000}
							className="w-full rounded-lg border-gray-200 p-3 text-sm"
							placeholder="Description of project in 100 words"
							rows="8"
							id="message"
							required
						></textarea>
					</div>
					{/* <div className="relative z-0 w-full mb-6 group">
						<input
							maxLength={1000}
							type="text"
							name="floating_description"
							id="floating_description"
							className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
							placeholder=" "
							required
						/>
						<label
							htmlFor="floating_description"
							className="peer-focus:font-medium absolute text-m text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
						>
							Description of project in 100 words
						</label>
					</div> */}

					<button
						type="submit"
						className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
}
