/** @format */

import styled from "styled-components";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Logo: React.FC = () => {
	const [logo, setLogo] = useState<boolean>(true);
	const handleScroll = () => {
		if (window.scrollY > 50) {
			setLogo(false);
		} else {
			setLogo(true);
		}
	};
	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	});
	return (
		<AppLogo display={logo}>
			<Link href={"/"} passHref scroll>
				<Image>PANDORA</Image>
			</Link>
		</AppLogo>
	);
};

export default Logo;

const AppLogo = styled.div<any>`
	margin: 0px;
	padding: 0px;
	box-sizing: border-box;
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;
	transition: 0.25s;
	@media (max-width: 768px) {
		width: 100vw;
		transition: 0.25s;
		display: ${(props) => !props.display && "none"};
	}
`;

const Image = styled.a`
	margin: 0px;
	padding: 10px;
	font-size: 35px;
	font-weight: 600;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
`;
