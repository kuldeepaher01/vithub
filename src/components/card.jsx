import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Card({
	title,
	description,
	icon,
	link,
	button,
	isWide,
}) {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate(link);
	};
	const Icon = icon;
	const cardClass = isWide
		? "col-span-2 border border-gray-400 bg-[#f5f7fc] rounded-lg hover:shadow-xl transition-shadow duration-300 p-4"
		: "border border-gray-400 bg-[#f5f7fc] rounded-lg hover:shadow-xl transition-shadow duration-300 p-4  ";

	return (
		<div>
			<div className={cardClass}>
				<Icon size={24} color="#0098e5" />

				<h1 className="text-xl font-bold mt-1">{title}</h1>
				<p className="text-gray-700 mt-4 text-m">{description}</p>

				{button && (
					<h1
						onClick={handleClick}
						className=" justify-end flex items-center cursor-pointer hover:scale-110 text-blue-700 font-bold  rounded-full mt-4 transition duration-300 ease-in-out"
					>
						{button}
						<FiArrowRight className="ml-2" size={20} />
					</h1>
				)}
			</div>
		</div>
	);
}
