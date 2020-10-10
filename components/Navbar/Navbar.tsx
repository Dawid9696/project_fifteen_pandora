/** @format */

import styled from "styled-components";
//COMPONENTS
import Logo from "./Logo";
import Panel from "./Panel";
import Navigator from "./Navigator";

const Navbar: React.FC = () => {
	return (
		<AppNavbar>
			<Logo />
			<Navigator />
			<Panel />
		</AppNavbar>
	);
};

export default Navbar;

const AppNavbar = styled.div`
	position: sticky;
	top: 0;
	margin: 0px;
	padding: 5px;
	box-sizing: border-box;
	width: 100vw;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;
	background-color: grey;
	z-index: 2;
	@media (max-width: 768px) {
		flex-direction: column;
	}
`;
