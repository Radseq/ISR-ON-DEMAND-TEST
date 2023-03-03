import { getCacheData, setCacheData } from "@/cache";

export const addNewsletterEmail = async (email: string) => {
	if (await isEmailExists(email)) return false;

	let cacheResult = await getCacheData("emails");
	if (cacheResult) {
		cacheResult = JSON.parse(cacheResult);
		cacheResult.push(email);
		await setCacheData("emails", JSON.stringify(cacheResult));
		return true;
	} else {
		cacheResult = [email];
		await setCacheData("emails", JSON.stringify(cacheResult));
		return true;
	}
	return false;
};

const isEmailExists = async (email: string) => {
	let cacheResult = await getCacheData("emails");
	if (cacheResult) {
		let a: string[] = JSON.parse(cacheResult);
		return a.some((em) => em == email);
	}
	return false;
};

export const getNewsletterEmails = async () => {
	let cacheResult = await getCacheData("emails");
	if (cacheResult) {
		cacheResult = JSON.parse(cacheResult);
	} else {
		cacheResult = [""];
	}

	return cacheResult.map((newsletter: string) => newsletter);
};

export const deleteEmail = async (email: string) => {
	console.log("Delete email:", email);
	let cacheResult = await getCacheData("emails");
	if (cacheResult) {
		cacheResult = JSON.parse(cacheResult);
		let a: string[] = cacheResult;
		a = a.filter((emailCache) => emailCache !== email);
		await setCacheData("emails", JSON.stringify(a));
		return true;
	}
	return false;
};
