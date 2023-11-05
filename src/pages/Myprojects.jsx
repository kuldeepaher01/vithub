import React from "react";
import Playground from "../components/NavBar";
import Header from "../components/Header";
import Myspace from "../components/Myspace";

function Myprojects() {
	return (
		<>
			<div className="grid grid-cols-4">
				<div className="col-span-1">
					<Playground />
				</div>
				<div className="col-span-3">
					<Header name="My Projects" />
					<Myspace />
				</div>
			</div>
		</>
	);
}

export default Myprojects;
