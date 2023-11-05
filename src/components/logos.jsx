import React from "react";
import { MdFolderZip } from "react-icons/md";
import { FaFilePdf } from "react-icons/fa";
import { BsFiletypePptx } from "react-icons/bs";
export default function Logos() {
	return (
		<div>
			<MdFolderZip className="text-9xl text-[#009fdb]" />
			<FaFilePdf className="text-9xl text-[#009fdb]" />
			<BsFiletypePptx className="text-9xl text-[#009fdb]" />
		</div>
	);
}
