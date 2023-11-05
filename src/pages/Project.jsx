import React from "react";
import Playground from "../components/NavBar";
import Header from "../components/Header";
import Addproject from "../components/Addproject";

export default function Project() {
	return (
		<>
			<div className="grid grid-cols-4">
				<div className="col-span-1">
					<Playground />
				</div>
				<div className="col-span-3">
					<Header name="Create New Project" />
					<Addproject />
				</div>
			</div>
		</>
	);
}
