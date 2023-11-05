import React, { useRef } from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

function Welcome() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			<button
				onClick={onOpen}
				className=" self-end rounded-full hover:bg-blue-500 hover:text-white text-blue-500 font-bold py-2 px-4  mt-2"
			>
				Start Welcome Tutorial
			</button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Welcome to VITHUB</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<h1 className="text-xl font-medium text-green-800">
							What all works?
						</h1>
						<ol className="p-4 list-decimal list-inside">
							<li>Uploading project</li>
							<li>Viewing uploaded projects</li>
							<li>Viewing others projects</li>
							<li>Deleting projects</li>
						</ol>
						<h1 className="text-xl font-medium text-red-800">
							What all doesn't work?
						</h1>
						<ol className="list-decimal list-inside p-4">
							<li>Editing projects</li>
							<li>Viewing profiles</li>
							<li>Access to non-VITIANS</li>
						</ol>
					</ModalBody>
					<div className="p-2">
						<h1> </h1>
					</div>
				</ModalContent>
			</Modal>
		</>
	);
}

export default Welcome;
