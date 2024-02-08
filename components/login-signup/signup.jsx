"use client";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { RxCross2 } from "react-icons/rx";
import classes from "./signup.module.css";
import { signup } from "@/lib/actions";
import { isValidEmail } from "@/lib/utils";
import ErrorBox from "./error-box";
import { useTheme } from "next-themes";

export default function Signup({ show, setShow }) {
	const [ready, setReady] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [confirmPass, setConfirmPass] = useState("");
	const [isValidName, setIsValidName] = useState(true);
	const [hasErrorEmail, setHasErrorEmail] = useState(false);
	const [passNotMatching, setPassNotMatching] = useState(false);
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [signupFail, setSignupFail] = useState(false);
	const { theme, setTheme } = useTheme(
		localStorage.getItem("theme") || "light"
	);
	async function handleSignup(e) {
		setLoading(true);
		e.preventDefault();
		const data = await signup(name, email, pass);
		if (data.message) {
			if (data.message !== "User already exists") {
				setSignupFail(true);
			} else {
				setErrorMessage(data.message);
			}
		}
		setLoading(false);
		// console.log(data);
	}
	useEffect(() => {
		setReady(true);
	}, []);
	useEffect(() => {
		const nameTimeout = setTimeout(() => {
			if (name !== "") setIsValidName(name.length >= 3);
		}, 300);
		return () => {
			clearTimeout(nameTimeout);
		};
	}, [name]);
	useEffect(() => {
		const emailTimeout = setTimeout(() => {
			if (email !== "") setHasErrorEmail(!isValidEmail(email));
		}, 300);
		return () => {
			clearTimeout(emailTimeout);
		};
	}, [email]);
	useEffect(() => {
		const passTimeout = setTimeout(() => {
			if (pass !== "" && confirmPass !== "")
				setPassNotMatching(pass !== confirmPass);
		}, 300);
		return () => {
			clearTimeout(passTimeout);
		};
	}, [pass, confirmPass]);
	function handleToggle() {
		if (theme === "dark") setTheme("light");
		else setTheme("dark");
	}
	return (
		ready &&
		show &&
		createPortal(
			<div className={classes.background}>
				<div className={classes.container}>
					<button
						type="button"
						className={classes.closeBtn}
						onClick={() => setShow(false)}
					>
						<RxCross2 size={24} />
					</button>
					<button onClick={handleToggle}>Toggle</button>
					<form
						className={classes.formContainer}
						onSubmit={handleSignup}
					>
						<div className={classes.header}>Sign Up</div>
						<div className={classes.field}>
							<label htmlFor="signupName">Name</label>
							<input
								type="text"
								id="signupName"
								placeholder="What would you like to be called?"
								value={name}
								onChange={(e) => {
									setName(e.target.value);
									setErrorMessage("");
								}}
							/>
							{name !== "" && !isValidName && (
								<ErrorBox
									message={
										"Name must have atleast 3 letters!"
									}
								/>
							)}
						</div>
						<div className={classes.field}>
							<label htmlFor="signupEmail">Email</label>
							<input
								type="email"
								id="signupEmail"
								placeholder="Your email"
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
									setErrorMessage("");
								}}
							/>
							{email !== "" && hasErrorEmail && (
								<ErrorBox message={"Invalid Email!"} />
							)}
							{errorMessage !== "" && (
								<ErrorBox message={errorMessage} />
							)}
						</div>
						<div className={classes.field}>
							<label htmlFor="signupPass">Password</label>
							<input
								type="password"
								id="signupPass"
								placeholder="Create a password"
								value={pass}
								onChange={(e) => {
									setPass(e.target.value);
									setErrorMessage("");
								}}
							/>
						</div>
						<div className={classes.field}>
							<label htmlFor="signupConfirmPass">
								Confirm Password
							</label>
							<input
								type="password"
								id="signupConfirmPass"
								placeholder="Re-enter password"
								value={confirmPass}
								onChange={(e) => {
									setConfirmPass(e.target.value);
									setErrorMessage("");
								}}
							/>
							{pass !== "" &&
								confirmPass !== "" &&
								passNotMatching && (
									<ErrorBox
										message={"Passwords are not matching!"}
									/>
								)}
						</div>
						{signupFail && (
							<ErrorBox
								message={
									"Oops! Some Error Occured. Please try again later."
								}
							/>
						)}
					</form>
					<button
						disabled={
							!(
								name !== "" &&
								isValidName &&
								email !== "" &&
								!hasErrorEmail &&
								pass !== "" &&
								confirmPass !== "" &&
								!passNotMatching &&
								errorMessage === "" &&
								!signupFail
							) || loading
						}
						className={classes.signupBtn}
						onClick={handleSignup}
					>
						Signup
					</button>
				</div>
			</div>,
			document.getElementById("portal")
		)
	);
}
