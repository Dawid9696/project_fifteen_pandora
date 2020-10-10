/** @format */

import styled from "styled-components";
import Link from "next/link";

const Navigator: React.FC = () => {
	return (
		<AppNavigator>
			<Link href={"/"} passHref scroll>
				<StyledLink>HOME</StyledLink>
			</Link>
		</AppNavigator>
	);
};

export default Navigator;

const AppNavigator = styled.div`
	margin: 0px;
	padding: 0px;
	box-sizing: border-box;
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;
`;

const StyledLink = styled.a`
	margin: 0px;
	padding: 15px;
	font-size: 20px;
	color: white;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;
	border-radius: 200px;
	transition: 0.25s;
	:hover {
		transition: 0.25s;
		background-color: ${(props) => props.theme.backgroundColor2};
	}
	:active {
		transition: 0.25s;
		transform: scale(0.95);
	}
	@media (max-width: 768px) {
		display: none;
	}
`;
