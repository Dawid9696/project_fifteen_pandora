/** @format */

import Head from "next/head";
import React from "react";
import styled from "styled-components";
import { GetStaticProps } from "next";
import Link from "next/link";
import useSWR from "swr";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";

import ShopCard from "../components/Shop/ShopCard";

export interface Props {
	_id: string;
	charmName: string;
	charmPrice: number;
	charmPhotos: [string];
	charmSale: boolean;
}

type ShopProps = { shopData: [Props] };

const Home: React.FC<ShopProps> = ({ shopData }) => {
	const { data }: any = useSWR("http://vps-3afd9694.vps.ovh.net:5000/Pandora/Charms", { initialData: shopData });
	const metalArray = shopData.map((item: any) => {
		return item.charmMetal;
	});
	const uniqueMetalArray = metalArray.filter(function (item, pos) {
		return metalArray.indexOf(item) == pos;
	});
	return (
		<React.Fragment>
			<Head>
				<title>Home</title>
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			</Head>
			<motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
				<Filter>
					<Option>
						Metal
						<Drops>
							{uniqueMetalArray.map((item) => (
								<DropLi>{item}</DropLi>
							))}
						</Drops>
					</Option>
					<Option>
						Cena
						<Drops>
							<DropLi>0 - 50 zł</DropLi>
							<DropLi>50 - 150 zł</DropLi>
							<DropLi>150 - 500 zł</DropLi>
						</Drops>
					</Option>
				</Filter>
				<ShopContainer>
					{data.map((card: Props) => {
						return (
							<Link as={`/Charm/${card._id}`} href='/Charm/[Charm]' scroll passHref>
								<ShopCard key={card._id} card={card} />
							</Link>
						);
					})}
				</ShopContainer>
			</motion.div>
		</React.Fragment>
	);
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
	const res = await fetch("http://vps-3afd9694.vps.ovh.net:5000/Pandora/Charms");
	const shopData = await res.json();
	return {
		props: {
			shopData,
		},
		revalidate: 1,
	};
};

const Properties = styled.div`
	margin: 0px;
	padding: 0px;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
`;

const Drops = styled.div`
	margin-top: 15px;
	position: absolute;
	display: flex;
	justify-content: space-around;
	flex-direction: column;
	align-items: center;
	width: 200px;
	background: white;
	left: 0px;
	top: 50px;
	list-style: none;
	border-radius: 5px;
	opacity: 0;
	pointer-events: none;
	transform: translateY(-10px);
	transition: all 0.4s ease;
	z-index: 1;
	box-shadow: 10px 10px 20px 0px rgba(0, 0, 0, 0.75);
`;

const Option = styled.button`
	position: relative;
	z-index: 1;
	margin: 10px;
	padding: 15px;
	/* border: 3px solid grey; */
	text-transform: uppercase;
	min-width: 20vh;
	font-size: 18px;
	border-radius: 200px;
	flex-direction: row;
	transition: 0.25s;
	:active {
		transition: 0.25s;
		transform: scale(0.95);
	}
	:focus ${Drops} {
		opacity: 1;
		pointer-events: all;
		transform: translateY(0px);
	}
	:hover {
		transition: 0.25s;
		cursor: pointer;
		/* background-color: ${(props) => props.theme.backgroundColor2}; */
	}
	@media (max-width: 768px) {
		min-width: 30vh;
		justify-content: center;
	}
`;

const DropLi = styled.div`
	position: relative;
	width: 100%;
	padding: 15px;
	display: flex;
	justify-content: center;
	align-items: center;
	:hover {
		background-color: rgb(197, 173, 181);
	}
`;

const ShopContainer = styled(Properties)`
	width: 80vw;
	align-items: flex-start;
	flex-direction: row;
	flex-wrap: wrap;
	@media (max-width: 768px) {
		border: none;
		width: 100vw;
		flex-direction: column;
		align-items: center;
	}
`;

const Filter = styled(Properties)`
	margin: 10px;
	width: 70vw;
	justify-content: flex-start;
	flex-direction: row;
	border-bottom: 1px solid grey;
	@media (max-width: 768px) {
		width: 90vw;
		justify-content: center;
	}
`;
