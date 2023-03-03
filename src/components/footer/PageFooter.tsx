import React, { FC, useEffect, useState } from "react";
import styles from "./PageFooter.module.css";
import classNames from "classnames";
import { validate } from "@/lib/email";

type EmailResultCode = "fail" | "ok" | "notValid";

const getMessageFromCode = (code: EmailResultCode) => {
	switch (code) {
		case "fail":
			return "Fail, please try again later";
		case "notValid":
			return "Email is not valid!";
		case "ok":
			return "Saved in";
		default:
			console.error(`Not found email code ${code}`);
			return "";
	}
};

const Newsletter = () => {
	const [email, setEmail] = useState("");
	const [emailResult, setEmailResult] = useState<EmailResultCode>();

	// todo give user information e.g too short, too long
	const sendEmailToApi = async () => {
		const result = validate(email);

		if (!result) {
			setEmailResult("notValid");
			return;
		}

		let res = await fetch(
			`http://localhost:3000/api/newsletter/newsletter/`,
			{
				method: "POST",
				body: JSON.stringify({
					email: email,
				}),
			}
		);

		//window.location.reload();
	};

	return (
		<div className={styles.newsLetter}>
			<span>Newsletter:</span>
			<p>
				Sign up to receive promotion code, and information about new
				promotions
			</p>
			<form>
				<input
					type="email"
					name="email"
					placeholder="Type email"
					required
					onChange={(e) => setEmail(e.target.value)}
				/>
				<button
					onClick={(e) => {
						e.preventDefault();
						sendEmailToApi();
					}}
				>
					Sign up
				</button>
			</form>
			<div
				className={classNames(
					styles.newsLetterMessage,
					emailResult != "ok" && styles.fail,
					emailResult == "ok" && styles.success
				)}
			>
				{emailResult && getMessageFromCode(emailResult)}
			</div>
		</div>
	);
};

export const PageFooter = () => {
	const phoneNumber = "12 234 212 231";
	const email = "some_email@gm.pl";

	return (
		<div className={styles.footer}>
			<div className={styles.main}>
				<Newsletter />
			</div>
			<div className={styles.side}>
				<div className={styles.contact}>
					<span>Contact</span>
					<div className={styles.icon}>
						<a href={"tel:" + phoneNumber}>{phoneNumber}</a>
					</div>
					<div className={styles.daysHours}>
						<div>
							<span>mon.-fri.</span>
							<span>sat.-sun.</span>
						</div>
						<div>
							<span>8:00 - 20:00</span>
							<span>8:00 - 18:00</span>
						</div>
					</div>
				</div>
				<div className={styles.icon}>
					<a href={"mailto:" + email}> {email}</a>
				</div>
				<div className={styles.icon}>
					<a href="/contact">Our shoop</a>
				</div>
			</div>
		</div>
	);
};
