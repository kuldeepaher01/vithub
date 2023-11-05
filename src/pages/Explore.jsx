import React from "react";
import Playground from "../components/NavBar";
import Header from "../components/Header";
import Fetchproject from "../components/Fetchproject";

function Explore() {
	return (
		<>
			<div className="grid grid-cols-4">
				<div className="col-span-1">
					<Playground />
				</div>
				<div className="col-span-3">
					<Header name="Explore Projects" />
					<Fetchproject />
				</div>
			</div>
		</>
	);
}

export default Explore;
