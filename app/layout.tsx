/** @format */

import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import { Nunito } from "next/font/google";
// import Modal from "./components/modal/Modal";
import ClientOnly from "./components/ClientOnly";
import RegisterModel from "./components/modal/RegisterModel";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modal/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import ApplyModal from "./components/modal/ApplyModal";
import SearchModal from "./components/modal/SearchModal";
export const metadata = {
	title: "SL - Birth and Death Site",
	description: "Apply for birth and death certificate",
};

const font = Nunito({
	subsets: ["latin"],
});

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const currentUser = await getCurrentUser();

	return (
		<html lang="en">
			<body className={font.className}>
				<ClientOnly>
					<ToasterProvider />
					<ApplyModal />
					<SearchModal />
					<RegisterModel />
					<LoginModal />

					{/* <Modal isOpen /> */}

					<Navbar currentUser={currentUser} />
				</ClientOnly>
				<div className="pb-20 pt-28">{children}</div>
			</body>
		</html>
	);
}
