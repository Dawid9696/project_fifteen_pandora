/** @format */

import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

const User = () => {
	return (
		<motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
			<h3>Dane użytkownika</h3>
		</motion.div>
	);
};
export default User;
