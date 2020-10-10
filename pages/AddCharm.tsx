/** @format */

import React from "react";
import Head from "next/head";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

const AddCharm = () => {
	const { register, watch, errors, handleSubmit } = useForm();

	const onSubmit = (data) => console.log(data);

	return (
		<React.Fragment>
			<Head>
				<title>Login</title>
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			</Head>
			<motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
				<StyleForm onSubmit={handleSubmit(onSubmit)}>
					<StyledLabel>Nazwa</StyledLabel>
					<StyledInput placeholder='E-mail ...' name='charmName' ref={register({ required: true, minLength: 3, maxLength: 20 })} />
					<StyledLabel>Cena</StyledLabel>
					<StyledInput type='number' name='charmPrice' ref={register({ required: true, min: 3, max: 1000 })} />
					<StyledLabel>Opis</StyledLabel>
					<StyledInput name='charmDescription' type='textarea' ref={register({ required: true, minLength: 3, maxLength: 20 })} />
					<StyledLabel>Metail</StyledLabel>
					<StyledInput name='charmMetal' ref={register({ required: true, minLength: 3, maxLength: 20 })} />
					{/* 
					{errors.email?.type === "required" && "Your input is required"}
					{errors.email?.type === "minLength" && "Too short"}
					{errors.email?.type === "minLength" && "Too long"}
					{errors.email?.type === "pattern" && "Enter proper format !"} */}

					<button type='submit' style={{ margin: "10px" }}>
						Zaloguj się
					</button>
				</StyleForm>
			</motion.div>
		</React.Fragment>
	);
};
export default AddCharm;

const StyleForm = styled.form`
	margin: 20px;
	padding: 0px;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

const StyledLabel = styled.h5`
	margin: 10px;
	padding: 0px;
	box-sizing: border-box;
	font-size: 30px;
`;

const StyledInput = styled.input`
	margin: 10px;
	padding: 0px;
	box-sizing: border-box;
	background-color: grey;
	width: 30vh;
	height: 40px;
	border: unset;
	text-align: center;
	border-radius: 200px;
	color: white;
`;
