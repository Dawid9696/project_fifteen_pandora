/** @format */

import { useRouter } from "next/router";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GetServerSideProps } from "next";
import Cookies from "cookies";
import { motion } from "framer-motion";

const Cart: React.FC<any> = ({ shopData }) => {
	const router = useRouter();
	return (
		<React.Fragment>
			<Head>
				<title>Cart</title>
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			</Head>
			<motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
				{Array.isArray(shopData) ? <p>Zalogowany</p> : <h3>Zaloguj się</h3>}
			</motion.div>
		</React.Fragment>
	);
};

export default Cart;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	const cookies = new Cookies(req, res);
	const response = await fetch("http://vps-3afd9694.vps.ovh.net:5000/Pandora/myprofile", {
		method: "get",
		headers: {
			Accept: "application/json",
			Authorization: "Bearer " + cookies.get("myCookie"),
		},
	});
	const shopData = await response.json();
	return {
		props: {
			shopData,
		},
	};
};
