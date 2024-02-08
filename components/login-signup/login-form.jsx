"use client";
import { useEffect, useState } from "react";
import classes from "./login-form.module.css";
import { login } from "@/lib/actions";
import { isValidEmail } from "@/lib/utils";
import ErrorBox from "./error-box";
export default function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [hasErrorEmail, setHasErrorEmail] = useState(false);
	const [loginFail, setLoginFail] = useState(false);
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	async function handleLogin(e) {
		setLoading(true);
		e.preventDefault();
		const data = await login(email, password);
		if (data.message) {
			setLoginFail(true);
			setErrorMessage(data.message);
		}
		setLoading(false);
		// console.log(data);
	}
	useEffect(() => {
		const emailTimeout = setTimeout(() => {
			if (email !== "") setHasErrorEmail(!isValidEmail(email));
		}, 300);
		return () => {
			clearTimeout(emailTimeout);
		};
	}, [email]);
	return (
		<div className={classes.container}>
			<div className={classes.header}>
				<p>Login</p>
			</div>
			<form className={classes.formContainer} onSubmit={handleLogin}>
				<div className={classes.field}>
					<label htmlFor="email">Email</label>
					<input
						type="email"
						name="email"
						id="email"
						placeholder="Your email"
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
							setLoginFail(false);
						}}
					/>
					{email !== "" && hasErrorEmail && (
						<ErrorBox message={"Invalid Email!"} />
					)}
				</div>
				<div className={classes.field}>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						id="password"
						placeholder="Your password"
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
							setLoginFail(false);
						}}
					/>
				</div>
				{loginFail && <ErrorBox message={errorMessage} />}
				<button
					disabled={!(password !== "" && !hasErrorEmail) || loading}
					className={classes.btn}
				>
					Login
				</button>
			</form>
		</div>
	);
}
