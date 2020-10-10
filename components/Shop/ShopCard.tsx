/** @format */

import styled from "styled-components";
import { Props } from "../../pages/index";
import React from "react";

interface LinkButtonProps {
	href?: string;
	onClick: any;
	card: Props;
}

const ShopCard: React.ForwardRefExoticComponent<any & React.RefAttributes<any>> = React.forwardRef(
	({ onClick, card }: LinkButtonProps, ref: React.MutableRefObject<any>) => {
		return (
			<AppShopCard onClick={onClick} ref={ref}>
				<Photo photo={card.charmPhotos[0]}></Photo>
				<Name>{card.charmName}</Name>
				<Price>{card.charmPrice} zł</Price>
			</AppShopCard>
		);
	}
);
export default ShopCard;

const Properties = styled.div`
	margin: 0px;
	padding: 0px;
	box-sizing: border-box;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const AppShopCard = styled(Properties)`
	position: relative;
	margin: 10px;
	width: 18vw;
	justify-content: flex-start;
	align-self: stretch;
	flex-direction: column;
	transition: 0.25s;
	&:before {
		content: "";
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: #00000049;
		opacity: 0;
		transition: 0.25s;
	}
	:hover {
		cursor: pointer;
		&:before {
			opacity: 1;
			transition: 0.25s;
		}
	}
	:active {
		transition: 0.25s;
		transform: scale(1.05);
	}
	@media (max-width: 768px) {
		width: 90vw;
		align-self: center;
	}
`;
type PhotoProp = { photo: string };
const Photo = styled(Properties)<PhotoProp>`
	width: 100%;
	height: 40vh;
	flex-direction: row;
	background-image: ${(props) => `url(${props.photo})`};
	background-size: contain;
	background-position: center;
	background-repeat: no-repeat;
	@media (max-width: 768px) {
		height: 70vh;
	}
`;

const Name = styled(Properties)`
	margin: 10px;
	padding: 0px 5px 0px 5px;
	width: 100%;
	font-size: 20px;
	color: ${(props) => props.theme.colors.main};
`;

const Price = styled(Properties)`
	margin: 10px;
	font-size: 18px;
	font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
	color: ${(props) => props.theme.colors.secondary};
	flex-direction: row;
`;
