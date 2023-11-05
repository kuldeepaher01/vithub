import React from "react";
import Playground from "../components/NavBar";
import Header from "../components/Header";
import DashUI from "../components/DashUI";

export default function Dashboard() {
	return (
		<div className="bg-[#f3eaf8]">
			<div className="grid grid-cols-4">
				<div className="col-span-1">
					<Playground />
				</div>
				<div className="col-span-3 mt-4">
					<DashUI />
				</div>
			</div>
		</div>
	);
}
