"use client";
import { useState } from "react";
import classes from "./policies.module.css";
import Signup from "./signup";
export default function Policies() {
	const [showSignUp, setShowSignUp] = useState(false);
	return (
		<div className={classes.container}>
			<div className={classes.tnc}>
				By continuing you indicate that you agree to Quora’s Terms of
				Service and Privacy Policy.
			</div>
			<div className={classes.options}>
				<div className={classes.option}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						fillRule="evenodd"
						viewBox="0 0 24 24"
					>
						<path
							d="M20.16 12.193c0-.603-.054-1.182-.155-1.739H12v3.288h4.575a3.91 3.91 0 0 1-1.696 2.565v2.133h2.747c1.607-1.48 2.535-3.659 2.535-6.248z"
							fill="#4285f4"
						></path>
						<path
							d="M12 20.5c2.295 0 4.219-.761 5.625-2.059l-2.747-2.133c-.761.51-1.735.811-2.878.811-2.214 0-4.088-1.495-4.756-3.504h-2.84v2.202A8.497 8.497 0 0 0 12 20.5z"
							fill="#34a853"
						></path>
						<path
							d="M7.244 13.615A5.11 5.11 0 0 1 6.977 12a5.11 5.11 0 0 1 .267-1.615V8.183h-2.84C3.828 9.33 3.5 10.628 3.5 12s.328 2.67.904 3.817l2.84-2.202z"
							fill="#fbbc05"
						></path>
						<path
							d="M12 6.881c1.248 0 2.368.429 3.249 1.271l2.438-2.438C16.215 4.342 14.291 3.5 12 3.5a8.497 8.497 0 0 0-7.596 4.683l2.84 2.202C7.912 8.376 9.786 6.881 12 6.881z"
							fill="#ea4335"
						></path>
					</svg>
					<p>
						Continue with Google <span>(Coming Soon)</span>
					</p>
				</div>
				<div className={classes.option}>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M20.5 12a8.5 8.5 0 1 0-9.83 8.397v-5.94H8.513v-2.458h2.159v-1.872c0-2.13 1.269-3.307 3.21-3.307.93 0 1.903.166 1.903.166v2.091h-1.072c-1.056 0-1.385.656-1.385 1.328V12h2.358l-.377 2.457h-1.98v5.94A8.503 8.503 0 0 0 20.5 12Z"
							fill="#1877F2"
						></path>
					</svg>
					<p>
						Continue with Facebook <span>(Coming Soon)</span>
					</p>
				</div>
				<button
					className={classes.btn}
					onClick={() => setShowSignUp(true)}
				>
					Sign Up
				</button>
			</div>
			{showSignUp && <Signup show={showSignUp} setShow={setShowSignUp} />}
		</div>
	);
}
