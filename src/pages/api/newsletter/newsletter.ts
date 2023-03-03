import { validate } from "@/lib/email";
import {
	addNewsletterEmail,
	deleteEmail,
} from "@/server/newsletter/newsletter";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { query, method } = req;

	const incomeEmail: { email: string } = JSON.parse(req.body);

	switch (method) {
		case "POST":
			{
				//req.body.email not working
				const parseResult = validate(incomeEmail.email);

				if (!parseResult) {
					return res.status(400).send("Invalid email address");
				}

				const result = await addNewsletterEmail(incomeEmail.email);
				if (result) {
					await res.revalidate("/");
					res.send(200);
				} else {
					res.status(500).send({
						error: `Email already exists!`,
					});
				}
			}
			break;
		case "DELETE":
			{
				const parseResult = validate(incomeEmail.email);

				if (!parseResult) {
					return res.status(400).send("Invalid email address");
				}

				const result = await deleteEmail(incomeEmail.email);
				if (result) {
					await res.revalidate("/");
					res.send(200);
				} else {
					res.status(500).send({
						error: `Email already exists!`,
					});
				}
			}
			break;
		default:
			res.setHeader("Allow", ["POST", "DELETE"]);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
};
