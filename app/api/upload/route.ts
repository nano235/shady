import fs from "fs";
import path from "path";

type Post = {
	id: string;
	title: string;
	content: string;
};

// Utility function to ensure the posts.json file exists
const getPostsFile = () => {
	const filePath = path.join(process.cwd(), "data", "posts.json");

	if (!fs.existsSync(filePath)) {
		fs.mkdirSync(path.dirname(filePath), { recursive: true });
		fs.writeFileSync(filePath, JSON.stringify([]));
	}

	return filePath;
};

// Save the post to the JSON file
const savePost = (newPost: Omit<Post, "id">) => {
	const filePath = getPostsFile();

	// Safely read the file and parse it
	let posts: Post[] = [];
	try {
		const fileContent = fs.readFileSync(filePath, "utf8");
		if (fileContent.trim()) {
			posts = JSON.parse(fileContent); // Parse only if the content is not empty
		}
	} catch (error) {
		console.error("Error reading or parsing posts.json:", error);
	}

	// Create a slug for the title to use as the ID
	const id = slugify(newPost.title);

	// Ensure the ID is unique
	if (posts.some(post => post.id === id)) {
		throw new Error("A post with this title already exists.");
	}

	// Add the new post
	const postWithId: Post = { ...newPost, id };
	posts.push(postWithId);

	// Write the updated data back to the file
	fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
};

export async function POST(req: Request): Promise<Response> {
	try {
		if (!req.body) {
			return new Response(
				JSON.stringify({ success: false, error: "No body content provided." }),
				{ status: 400 }
			);
		}

		const body = await req.json();

		if (!body.title || !body.content) {
			return new Response(
				JSON.stringify({
					success: false,
					error: "Title and content are required.",
				}),
				{ status: 400 }
			);
		}

		const newPost = {
			title: body.title,
			content: body.content,
		};

		savePost(newPost);

		return new Response(
			JSON.stringify({ success: true, message: "Post uploaded successfully!" }),
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error:", error);
		return new Response(
			JSON.stringify({
				success: false,
				error: error || "Error saving the blog post.",
			}),
			{ status: 500 }
		);
	}
}

const slugify = (title: string): string => {
	return title
		.toLowerCase()
		.trim()
		.replace(/[\s]+/g, "-") // Replace spaces with hyphens
		.replace(/[^\w-]+/g, ""); // Remove non-word characters
};
