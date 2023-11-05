import React from "react";
import { HiFire } from "react-icons/hi";

function Project({ project }) {
	const hashtagArray = project.tags.split(",");

	function toTitleCase(str) {
		str = str.toLowerCase().split(" ");
		for (var i = 0; i < str.length; i++) {
			str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
		}
		return str.join(" ");
	}

	return (
		<div className="mt-4">
			<div>
				<p className="flex text-2xl font-medium items-center justify-center text-blue-900 gap-2 ">
					Project done under guidance of {project.guide} in the domain of{" "}
					{project.techHardware} in {project.division}
				</p>
			</div>
			<div className="mt-4 w-full p-2 rounded-lg shadow-lg sm:p-8  border hover:border-blue-900 hover:border-2 ">
				<div className=" flex gap-4">
					<HiFire color="red" size={42} />
					<h1 className="text-3xl text-blue-800 font-bold">{project.title}</h1>
					<div className="flex items-center justify-end">
						{hashtagArray.map((hashtag, index) => (
							<strong
								key={index}
								className="mr-4  border justify-center shadow hover:shadow-lg rounded-3xl  border-gray-400  px-3 py-1.5 text-[12px] font-medium text-black hover:bg-blue-700 hover:text-white"
							>
								<a className="  hover:">{hashtag}</a>
							</strong>
						))}
					</div>
				</div>
				<h1 className="flex text-xl justify-end mt-4">
					By{" "}
					<p className=" hover:font-medium">
						&middot; {toTitleCase(project.user)} &middot;
					</p>
					{project.groupMembers.split(",").map((member, index) => (
						<span key={index} className="text-xl  hover:font-medium">
							{member} &middot;
						</span>
					))}
				</h1>
				<p className="text-xl font-semibold">Abstract: </p>
				<p>{project.description}</p>
			</div>
		</div>
	);
}

export default Project;
