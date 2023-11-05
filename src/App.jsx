import { Route, Routes } from "react-router-dom";
import Home from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import Project from "./pages/Project";
import { AuthContextProvider } from "./context/AuthContext";
import Explore from "./pages/Explore";
import ErrorPage from "./pages/Errorpage";
import Protected from "./components/protected";
import Myprojects from "./pages/Myprojects";
import ProjectDetail from "./pages/ProjectDetail";

function App() {
	return (
		<AuthContextProvider>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/home"
					element={
						<Protected>
							<Dashboard />
						</Protected>
					}
				/>
				<Route
					path="/newprojects"
					element={
						<Protected>
							<Project />
						</Protected>
					}
				/>
				<Route
					path="/explore"
					element={
						<Protected>
							<Explore />
						</Protected>
					}
				/>
				<Route
					path="/myprojects"
					element={
						<Protected>
							<Myprojects />
						</Protected>
					}
				/>
				<Route
					path="/project/:projectId"
					element={
						<Protected>
							<ProjectDetail />
						</Protected>
					}
				/>
				<Route path="*" element={<ErrorPage />} />
			</Routes>
		</AuthContextProvider>
	);
}

export default App;
