import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

function ProjectCard({
	title,
	description,
	hashtags,
	guideName,
	timestmp,
	students,
	Key,
	Owner,
	projectID,
}) {
	const hashtagArray = hashtags.split(",");
	const studentsArray = students.split(",");
	// Calculate days ago timestamp
	const today = new Date();
	const uploadedDate = timestmp.seconds * 1000 + timestmp.nanoseconds;

	const timeDiff = Math.abs(today.getTime() - uploadedDate);
	const daysAgo = Math.ceil(timeDiff / (1000 * 3600 * 24));

	return (
		<div key={Key}>
			<article className="mb-8 rounded-xl bg-white p-4 ring ring-blue-200 hover:ring-[#1557CD] sm:p-6 lg:p-4 hover:shadow-xl transition-shadow duration-300">
				<div className="flex flex-col justify-between">
					<div className="flex items-start sm:gap-8">
						<div
							className="hidden sm:grid sm:h-20 sm:w-20 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2 sm:border-[#1557CD] "
							aria-hidden="true"
						>
							<div className="flex items-center gap-1">
								<span className="h-8 w-0.5 rounded-full bg-[#1557CD]"></span>
								<span className="h-6 w-0.5 rounded-full bg-[#1557CD]"></span>
								<span className="h-4 w-0.5 rounded-full bg-[#1557CD]"></span>
								<span className="h-6 w-0.5 rounded-full bg-[#1557CD]"></span>
								<span className="h-8 w-0.5 rounded-full bg-[#1557CD]"></span>
							</div>
						</div>

						<div>
							{/* Hashtags */}
							{hashtagArray.map((hashtag, index) => (
								<strong
									key={index}
									className="mr-4 rounded border border-[#0098e5] bg-[#0098e5] px-3 py-1.5 text-[12px] font-medium text-white"
								>
									<a className="  hover:text-gray-700">{hashtag}</a>
								</strong>
							))}

							<h3 className="mt-4 text-lg font-medium sm:text-xl">
								<a className=" text-2xl  hover:text-blue-800">{title}</a>
							</h3>

							<p className="mt-1 text-sm text-gray-700 overflow-hidden line-clamp-4">
								{description}
							</p>

							<div className="flex mt-4 sm:flex sm:items-center sm:gap-2">
								<div className="flex items-center gap-1 text-gray-500">
									<svg
										className="h-4 w-4"
										fill="none"
										stroke="#0098e5"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
										></path>
									</svg>

									<p className="text-[#0098e5] text-xs font-medium">
										{daysAgo} days ago
									</p>
								</div>

								<span className="hidden sm:block" aria-hidden="true">
									&middot;
								</span>
								<p className="mt-8 text-xs font-bold text-gray-500 sm:mt-0">
									Project by{" "}
									<a href="#" className="font-medium hover:text-gray-700">
										{Owner} &middot;
									</a>
								</p>

								<p className="mt-2 text-xs font-medium text-gray-500 sm:mt-0">
									{" "}
									{studentsArray.map((student, index) => (
										<a href="#" className=" hover:text-gray-700" key={index}>
											{student} &middot;
										</a>
									))}
								</p>

								<p className="mt-2 text-xs font-bold text-gray-500  sm:mt-0">
									Guided by{""}
									<a href="#" className="font-medium hover:text-gray-700">
										{" "}
										{guideName}
									</a>
								</p>
							</div>
						</div>
					</div>
					<h1 className="mr-12 justify-end flex items-center cursor-pointer hover:scale-110 text-blue-700 font-bold  rounded-full transition duration-300 ease-in-out">
						<Link to={`/project/${projectID}`}>View Project</Link>
						<FiArrowRight className="ml-2" size={20} />
					</h1>
				</div>
			</article>
		</div>
	);
}

export default ProjectCard;
