/** @format */

import * as React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";
import { motion } from "framer-motion";

type FormData = {
	email: string;
	password: string;
	name?: string;
	surname?: string;
	phone?: string;
};

export default function Register() {
	const router = useRouter();
	const { register, watch, reset, handleSubmit, errors } = useForm<FormData>({
		defaultValues: {
			email: "example@tlen.pl",
			password: "Password1",
		},
	});

	const watchShowOthers = watch("showOthers", true);

	const onSubmit = handleSubmit(({ email, password, name, surname, phone }) => {
		const data = { email, password, name, surname, phone };
		axios
			.post("http://vps-3afd9694.vps.ovh.net:5000/Pandora/register", data)
			.then((res) => router.push("/Login"))
			.catch((err) => window.alert("Mistake"));
	});

	return (
		<React.Fragment>
			<Head>
				<title>Login</title>
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			</Head>
			<motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
				<form onSubmit={onSubmit}>
					<label>E-mail</label>
					<input
						placeholder='e-mail...'
						name='email'
						ref={register({ required: true, minLength: 3, maxLength: 20, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g })}
					/>
					{errors.email?.type === "required" && "Your input is required"}
					{errors.email?.type === "minLength" && "Too short"}
					{errors.email?.type === "minLength" && "Too long"}
					{errors.email?.type === "pattern" && "Enter proper format !"}
					<label>Password</label>
					<input
						placeholder='password...'
						type='password'
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
					<input type='checkbox' name='showOthers' ref={register} />
					{watchShowOthers && (
						<>
							<label>Name</label>
							<input placeholder='name...' name='name' ref={register({ minLength: 3, maxLength: 20 })} />
							<label>Surname</label>
							<input placeholder='surname...' name='surname' ref={register({ minLength: 3, maxLength: 20 })} />
							<label>Phone</label>
							<input placeholder='phone...' name='phone' ref={register({ minLength: 9, maxLength: 11 })} />
						</>
					)}
					<button onClick={() => reset()}>Reset</button>
					<button type='submit'>SetValue</button>
				</form>
			</motion.div>
		</React.Fragment>
	);
}
