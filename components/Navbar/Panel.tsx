/** @format */

import styled, { keyframes } from "styled-components";
import Link from "next/link";
import axios from "axios";
import React, { useEffect, useState } from "react";
import cookieCutter from "cookie-cutter";
import { useRouter } from "next/router";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { AiOutlineShoppingCart, AiOutlineUser, AiOutlineSearch } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsFilePlus } from "react-icons/bs";

const Panel: React.FC = () => {
	const router = useRouter();
	const [jwt, setJwt] = useState<string>();
	const [burger, setBurger] = useState<boolean>(false);
	useEffect(() => {
		setJwt(localStorage.getItem("cool-jwt"));
	});
	const wyloguj = () => {
		const jwt = localStorage.getItem("cool-jwt");
		axios
			.post(`http://localhost:5000/Pandora/logout`, "", {
				headers: { Authorization: `Bearer ${jwt}` },
			})
			.then((res) => {
				localStorage.removeItem("cool-jwt");
				cookieCutter.set("myCookie", "", { expires: new Date(0) });
				router.push("/Login");
			})
			.catch((err) => console.log("Błąd!" + err.msg));
	};

	return (
		<AppPanel>
			<Input>
				<StyledInput />
				<AiOutlineSearch size='20px' style={{ margin: "5px" }} />
			</Input>
			{jwt ? (
				<React.Fragment>
					<Option>
						<Link href={"/AddCharm"}>
							<BsFilePlus size='30px' color='white' />
						</Link>
					</Option>
					<Option></Option>
					<Option>
						<FiLogOut size='30px' color='white' onClick={wyloguj} />
					</Option>
					<Option>
						<Link href={"/User"}>
							<AiOutlineUser size='30px' color='white' />
						</Link>
					</Option>
					<Option>
						<Link href={"/Cart"}>
							<AiOutlineShoppingCart size='30px' color='white' />
						</Link>
					</Option>
				</React.Fragment>
			) : (
				<Option>
					<Link href={"/Login"}>
						<FiLogIn size='30px' color='white' />
					</Link>
				</Option>
			)}
			<Burger>
				<GiHamburgerMenu color='white' size='35px' onClick={() => setBurger(!burger)} />
			</Burger>
			<MobileMenu display={burger} onClick={() => setBurger(!burger)}>
				<BurgerOption>
					<Link href={"/"}>
						<MobileOption>Home</MobileOption>
					</Link>
				</BurgerOption>
				{jwt ? (
					<React.Fragment>
						<BurgerOption>
							<Link href={"/User"}>
								<MobileOption>Użytkownik</MobileOption>
							</Link>
						</BurgerOption>
						<BurgerOption>
							<Link href={"/Cart"}>
								<MobileOption>Koszyk</MobileOption>
							</Link>
						</BurgerOption>
						<BurgerOption onClick={wyloguj}>
							<MobileOption>Wyloguj się</MobileOption>
						</BurgerOption>
					</React.Fragment>
				) : (
					<BurgerOption>
						<Link href={"/Login"}>
							<MobileOption>Zaloguj sie</MobileOption>
						</Link>
					</BurgerOption>
				)}
			</MobileMenu>
		</AppPanel>
	);
};

export default Panel;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(180deg);
  }
`;

const Properties = styled.div`
	margin: 0px;
	padding: 0px;
	box-sizing: border-box;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;
`;

const BurgerOption = styled(Properties)<any>`
	margin: 5px;
	width: 100%;
	border-bottom: 1px solid grey;
	transition: 0.25s;
	:hover {
		cursor: pointer;
	}
`;

const MobileMenu = styled.div<any>`
	position: fixed;
	margin: 0px;
	padding: 0px;
	width: ${(props) => (props.display ? "70vw" : "0vw")};
	height: 100vh;
	top: 0;
	left: 0;
	box-sizing: border-box;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	background-color: #2c2c2c;
	transition: 0.25s ease-in-out;
	z-index: 9999;
	${BurgerOption} {
		display: ${(props) => !props.display && "none"};
	}
`;

const MobileOption = styled.div<any>`
	margin: 0px;
	padding: 15px;
	width: 100%;
	font-size: 25px;
	box-sizing: border-box;
	text-align: center;
	display: initial;
	color: white;
	overflow: hidden;
`;

const Burger = styled.div`
	margin: 10px;
	display: none;
	:hover {
		cursor: pointer;
		color: ${(props) => props.theme.colors.fourth};
		animation: ${rotate} 0.25s linear 1;
	}

	@media (max-width: 768px) {
		display: flex;
	}
`;

const AppPanel = styled(Properties)`
	flex: 1;
	width: 100vw;
	padding: 10px;
	@media (max-width: 768px) {
		justify-content: flex-end;
	}
`;

const Input = styled(Properties)`
	margin: 5px;
	border: unset;
	background-color: ${(props) => props.theme.backgroundColor2};
	height: 30px;
	border-radius: 15px;
	@media (max-width: 768px) {
		display: none;
	}
`;

const StyledInput = styled.input.attrs((props) => ({
	placeholder: "Szukaj ...",
	type: "text",
}))`
	margin: 5px;
	border: unset;
	background-color: ${(props) => props.theme.backgroundColor2};
	height: 30px;
	border-radius: 15px;
	padding: 0px;
	box-sizing: border-box;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;
`;

const Option = styled(Properties)`
	padding: 10px;
	border-radius: 200px;
	margin: 5px;
	:hover {
		cursor: pointer;
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
