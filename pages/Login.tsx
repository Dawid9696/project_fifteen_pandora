/** @format */

import * as React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";
import cookieCutter from "cookie-cutter";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useToast } from "@chakra-ui/core";

type FormData = {
	email: string;
	password: string;
};

const Login = () => {
	const toast = useToast();
	const router = useRouter();
	const { register, setValue, handleSubmit, errors } = useForm<FormData>();
	const onSubmit = ({ email, password }) => {
		const data = { email, password };
		axios
			.post("http://vps-3afd9694.vps.ovh.net:5000/Pandora/login", data)
			.then((res) => {
				localStorage.setItem("cool-jwt", res.data.token);
				cookieCutter.set("myCookie", res.data.token);
				router.push("/");
			})
			.catch((err) => window.alert("Mistake"));
	};

	return (
		<React.Fragment>
			<Head>
				<title>Login</title>
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			</Head>
			<motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
				<StyleForm onSubmit={handleSubmit(onSubmit)}>
					<StyledLabel>E-mail</StyledLabel>
					<StyledInput
						placeholder='E-mail ...'
						name='email'
						ref={register({ required: true, minLength: 3, maxLength: 20, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g })}
					/>
					{errors.email?.type === "required" && "Your input is required"}
					{errors.email?.type === "minLength" && "Too short"}
					{errors.email?.type === "minLength" && "Too long"}
					{errors.email?.type === "pattern" && "Enter proper format !"}
					<StyledLabel>Password</StyledLabel>
					<StyledInput
						placeholder='Hasło ...'
						name='password'
						ref={register({
							required: true,
							minLength: 3,
							maxLength: 20,
							pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
						})}
					/>
					{errors.password?.type === "required" && "Your input is required"}
					{errors.password?.type === "minLength" && "Too short"}
					{errors.password?.type === "minLength" && "Too long"}
					{errors.password?.type === "pattern" && "Enter proper format !"}

					<button type='submit' style={{ margin: "10px" }}>
						Zaloguj się
					</button>
				</StyleForm>
			</motion.div>
		</React.Fragment>
	);
};

export default Login;

const StyleForm = styled.form`
	margin: 20px;
	padding: 0px;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

const StyledLabel = styled.form`
	margin: 20px;
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
