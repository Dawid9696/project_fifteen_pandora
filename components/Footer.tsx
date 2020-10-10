/** @format */

import styled from "styled-components";

const Footer: React.FC = () => {
	return <AppFooter>© 2020 Pandora Inc. All rights reserved.</AppFooter>;
};

export default Footer;

const AppFooter = styled.div`
	margin: 10px;
	padding: 0px;
	box-sizing: border-box;
	text-align: center;
	width: 100vw;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;
`;
