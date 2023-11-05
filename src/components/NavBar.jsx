import React from "react";
import {
	Sidebar,
	Menu,
	MenuItem,
	SubMenu,
	menuClasses,
} from "react-pro-sidebar";
import { Switch } from "./Switch";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarFooter } from "./SidebarFooter";

import { FiSearch } from "react-icons/fi";
import { FiFolder, FiHome, FiFolderPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const themes = {
	light: {
		sidebar: {
			backgroundColor: "#ffffff",
			color: "#607489",
		},
		menu: {
			menuContent: "#fbfcfd",
			icon: "#0098e5",
			hover: {
				backgroundColor: "#c5e4ff",
				color: "#44596e",
			},
			disabled: {
				color: "#9fb6cf",
			},
		},
	},
	dark: {
		sidebar: {
			backgroundColor: "#0b2948",
			color: "#8ba1b7",
		},
		menu: {
			menuContent: "#082440",
			icon: "#59d0ff",
			hover: {
				backgroundColor: "#00458b",
				color: "#b6c8d9",
			},
			disabled: {
				color: "#3e5e7e",
			},
		},
	},
};

const hexToRgba = (hex, alpha) => {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

function Playground() {
	const navigate = useNavigate();

	const handleHomeClick = () => {
		navigate("/home");
	};
	const handleExploreClick = () => {
		navigate("/explore");
	};
	const handleProjectClick = () => {
		navigate("/myprojects");
	};
	const handleNewProjectClick = () => {
		navigate("/newprojects");
	};
	const [collapsed, setCollapsed] = React.useState(false);
	const [toggled, setToggled] = React.useState(false);
	const [broken, setBroken] = React.useState(false);
	const [rtl, setRtl] = React.useState(false);
	const [hasImage, setHasImage] = React.useState(false);
	const [theme, setTheme] = React.useState("light");

	// handle on RTL change event
	const handleRTLChange = (e) => {
		setRtl(e.target.checked);
	};

	// handle on theme change event
	const handleThemeChange = (e) => {
		setTheme(e.target.checked ? "dark" : "light");
	};

	// handle on image change event
	const handleImageChange = (e) => {
		setHasImage(e.target.checked);
	};

	const menuItemStyles = {
		root: {
			fontSize: "20px",
			fontWeight: 400,
			hover: {
				fontWeight: 600,
			},
		},
		icon: {
			color: themes[theme].menu.icon,
			[`&.${menuClasses.disabled}`]: {
				color: themes[theme].menu.disabled.color,
			},
		},
		SubMenuExpandIcon: {
			color: "#b6b7b9",
		},
		subMenuContent: ({ level }) => ({
			backgroundColor:
				level === 0
					? hexToRgba(
							themes[theme].menu.menuContent,
							hasImage && !collapsed ? 0.4 : 1,
					  )
					: "transparent",
		}),
		button: {
			[`&.${menuClasses.disabled}`]: {
				color: themes[theme].menu.disabled.color,
			},
			"&:hover": {
				backgroundColor: hexToRgba(
					themes[theme].menu.hover.backgroundColor,
					hasImage ? 0.8 : 1,
				),
				color: themes[theme].menu.hover.color,
			},
		},
		label: ({ open }) => ({
			fontWeight: open ? 600 : undefined,
		}),
	};

	return (
		<div
		// style={{
		//   display: "flex",
		// }}
		>
			<Sidebar
				collapsed={collapsed}
				toggled={toggled}
				onBackdropClick={() => setToggled(false)}
				onBreakPoint={setBroken}
				breakPoint="md"
				backgroundColor={hexToRgba(
					themes[theme].sidebar.backgroundColor,
					hasImage ? 0.9 : 1,
				)}
				rootStyles={{
					color: themes[theme].sidebar.color,
					margin: "15PX",
					height: "96vh",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
					}}
				>
					<SidebarHeader
						className="cursor-pointer "
						collapsed={collapsed}
						style={{ marginBottom: "24px", marginTop: "16px" }}
					/>
					<div style={{ flex: 1, marginBottom: "32px" }}>
						<Menu menuItemStyles={menuItemStyles}>
							<MenuItem onClick={handleHomeClick} icon={<FiHome />}>
								Home
							</MenuItem>
							<MenuItem onClick={handleExploreClick} icon={<FiSearch />}>
								Explore
							</MenuItem>
							<MenuItem onClick={handleProjectClick} icon={<FiFolder />}>
								My Projects
							</MenuItem>

							<MenuItem onClick={handleNewProjectClick} icon={<FiFolderPlus />}>
								New Project
							</MenuItem>
						</Menu>
					</div>
					<SidebarFooter collapsed={collapsed} />
					<div style={{ marginBottom: 16 }}>
						<Switch
							id="collapse"
							checked={collapsed}
							onChange={() => setCollapsed(!collapsed)}
							label="Collapse"
						/>
					</div>
				</div>
			</Sidebar>
		</div>
	);
}
export default Playground;
