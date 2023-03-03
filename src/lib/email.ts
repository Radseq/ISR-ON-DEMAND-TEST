import { z } from "zod";

const EMAIL_VERIFIER = z.coerce
	.string()
	.email({ message: "Invalid email address" })
	.min(10, { message: "Email is too short" });

export const validate = (email: string) => {
	const parseResult = EMAIL_VERIFIER.safeParse(email);

	if (parseResult.success) {
		return true;
	}

	return false;
};
