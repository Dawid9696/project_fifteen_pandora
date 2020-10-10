/** @format */

import Head from "next/head";
import React, { useState } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import styled from "styled-components";
import { motion } from "framer-motion";

interface Props {
	_id: string;
	charmName: string;
	charmPrice: number;
	charmPhotos: [string];
	charmSale: boolean;
	charmAccess: boolean;
	charmDescription: string;
	charmMetal: string;
	charmComments: any;
}

type CharmProps = { charm: Props };

const Charm: React.FC<CharmProps> = ({ charm }) => {
	const router = useRouter();
	const { data }: any = useSWR(`http://vps-3afd9694.vps.ovh.net:5000/Pandora/Charm/${router.query.Charm}`, { initialData: charm });
	const [photo, setPhoto] = useState<number>(0);
	return (
		<React.Fragment>
			<Head>
				<title>{data.charmName}</title>
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			</Head>
			<motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
				<SectionOne>
					<Photos>
						<Photo photo={data.charmPhotos[photo]}></Photo>
						<SmallPhotos>
							{data.charmPhotos.map((photo: string, index: number) => {
								return <SmallPhoto small={photo} onClick={() => setPhoto(index)}></SmallPhoto>;
							})}
						</SmallPhotos>
					</Photos>
					<CharmInfo>
						<Name>{data.charmName}</Name>
						{data.charmAccess ? <Access access={data.charmAccess}>DOSTĘPNY</Access> : <Access access={data.charmAccess}>NIE DOSTĘPNY</Access>}
						<Price>{data.charmPrice},00 PLN</Price>
						<Metal>Metal: {data.charmMetal}</Metal>
						<Button>DODAJ DO KOSZYKA</Button>
					</CharmInfo>
				</SectionOne>
				<SectionTwo>
					<h1>INFORMACJE</h1>
					<Description>{data.charmDescription}</Description>
				</SectionTwo>
				<Comments>{data.charmComments.length == 0 ? <h3>Brak komentarzy</h3> : <p>Komentarz</p>}</Comments>
			</motion.div>
		</React.Fragment>
	);
};

export default Charm;

export const getStaticPaths: GetStaticPaths = async () => {
	const res = await fetch("http://vps-3afd9694.vps.ovh.net:5000/Pandora/Charms");
	const Charms = await res.json();
	const paths = Charms.map((item) => ({
		params: { Charm: item._id },
	}));
	return { paths, fallback: false };
};
export const getStaticProps: GetStaticProps = async ({ params: { Charm } }: any) => {
	const res = await fetch(`http://vps-3afd9694.vps.ovh.net:5000/Pandora/Charm/${Charm}`);
	const charm = await res.json();
	return {
		props: {
			charm,
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

const SectionOne = styled(Properties)`
	margin: 20px;
	width: 80vw;
	flex-direction: row;
	@media (max-width: 768px) {
		width: 100vw;
		flex-direction: column;
	}
`;

const Photos = styled(Properties)`
	position: relative;
	flex-direction: column;
	@media (max-width: 768px) {
		width: 90vw;
	}
`;
type PhotoProps = { photo: string };
const Photo = styled(Properties)<PhotoProps>`
	width: 40vw;
	height: 55vh;
	background-image: ${(props) => `url(${props.photo})`};
	background-size: contain;
	background-repeat: no-repeat;
	background-position: center;
	@media (max-width: 768px) {
		width: 90vw;
		height: 70vh;
	}
`;

const SmallPhotos = styled(Properties)``;
type SmallPhotoProps = { small: string };
const SmallPhoto = styled(Properties)<SmallPhotoProps>`
	margin: 10px;
	width: 5vw;
	height: 10vh;
	background-image: ${(props) => `url(${props.small})`};
	background-size: contain;
	background-repeat: no-repeat;
	background-position: center;
	transition: 0.25s;
	:hover {
		border: 1px solid black;
	}
	:active {
		transition: 0.25s;
		transform: scale(0.9);
	}
	@media (max-width: 768px) {
		width: 20vw;
		height: 17vh;
	}
`;

const CharmInfo = styled(Properties)`
	width: 30%;
	align-self: stretch;
	flex-direction: column;
	-webkit-box-shadow: 10px 10px 14px 0px rgba(0, 0, 0, 0.75);
	-moz-box-shadow: 10px 10px 14px 0px rgba(0, 0, 0, 0.75);
	box-shadow: 10px 10px 14px 0px rgba(0, 0, 0, 0.75);
	@media (max-width: 768px) {
		margin: 10px;
		width: 90vw;
		align-self: center;
	}
`;

const Name = styled(Properties)`
	padding: 15px;
	font-size: 25px;
	text-transform: uppercase;
	font-weight: 600;
	width: 100%;
`;

const Price = styled(Properties)`
	padding: 15px;
	width: 100%;
`;
type AccessProps = { access: Boolean };
const Access = styled(Properties)<AccessProps>`
	padding: 15px;
	margin-bottom: 15px;
	width: 100%;
	color: ${(props) => (props.access ? "Green" : "Red")};
`;

const Metal = styled(Properties)`
	padding: 15px;
	width: 100%;
	color: ${(props) => props.theme.colors.secondary};
`;

const Button = styled(Properties)`
	margin: 15px;
	padding: 10px;
	width: 70%;
	background-color: ${(props) => props.theme.colors.third};
	color: white;
	transition: 0.5s;
	:hover {
		cursor: pointer;
		color: ${(props) => props.theme.colors.secondary};
		background-color: ${(props) => props.theme.backgroundColor2};
	}
	:active {
		transition: 0.5s;
		transform: scale(0.95);
	}
	@media (max-width: 768px) {
		width: 80vw;
	}
`;

const Description = styled(Properties)`
	width: 90%;
	color: ${(props) => props.theme.colors.secondary};
`;

const SectionTwo = styled(Properties)`
	margin: 10px;
	margin-top: 20px;
	width: 80vw;
	flex-direction: column;
	@media (max-width: 768px) {
		width: 100vw;
	}
`;
const Comments = styled(Properties)`
	width: 80vw;
`;
