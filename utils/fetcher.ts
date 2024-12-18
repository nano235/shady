import { toast } from "react-hot-toast";
const isOnline = () => {
	return navigator.onLine;
};

async function fetcher<T>(
	url: string,
	method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET",
	body: Record<string, any> | null = null,
	customHeaders?: Record<string, string>
) {
	try {
		const headers: Record<string, string> = {
			"Content-Type": "application/json",
			...customHeaders,
		};

		const options: RequestInit = {
			method,
			headers,
		};

		if (body) {
			options.body = JSON.stringify(body);
		}
		const response = await fetch(url, options);

		if (!response.ok) {
			console.log("error");
		}

		return response;
	} catch (error: any) {
		// return toast.error("An error occurred, please try again");
		return !isOnline()
			? toast.error(`Oopsies, seems you don't have internet`)
			: toast.error(`An error ${error} occurred, please try again`);
	}
}

export default fetcher;
