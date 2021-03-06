/** @format */

import styled from "styled-components";

import Navbar from "./Navbar/Navbar";
import Footer from "./Footer";

const Layout: React.FC = ({ children }) => {
	return (
		<AppLayout>
			<Navbar />
			{children}
			{/* <Footer /> */}
		</AppLayout>
	);
};

export default Layout;

const AppLayout = styled.div`
	margin: 0px;
	padding: 0px;
	box-sizing: border-box;
	width: 100vw;
	min-height: 100vh;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: column;
`;
