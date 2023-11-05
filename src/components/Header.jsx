import React from "react";
import { UserAuth } from "../context/AuthContext";

export default function Header(props) {
	const { logOut } = UserAuth();

	const handleSignOut = async () => {
		try {
			await logOut();
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div>
			<header className=" mt-2 bg-white">
				<div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
					<div className="flex h-16 items-center justify-between">
						<div className="flex-1 justify-start -ml-24">
							<h1 className="text-blue-700 text-2xl cursor-pointer font-semibold -ml-4">
								{props.name}
							</h1>
						</div>

						<div className="md:flex md:items-center md:gap-12">
							<div className="flex items-center gap-4">
								<div className="sm:flex sm:gap-4">
									<button
										type="button"
										className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
										onClick={handleSignOut}
									>
										Sign Out
									</button>
								</div>

								<div className="block md:hidden">
									<button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											strokeWidth="2"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M4 6h16M4 12h16M4 18h16"
											/>
										</svg>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
		</div>
	);
}
