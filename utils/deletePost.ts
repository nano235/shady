import fs from "fs";
import path from "path";

type Post = {
	id: string;
	title: string;
	content: string;
};

// Utility function to get the posts file path
const getPostsFile = () => {
	return path.join(process.cwd(), "data", "posts.json");
};

// Function to delete a post by ID
export const deletePost = (id: string): boolean => {
	const filePath = getPostsFile();

	// Read existing posts
	const posts: Post[] = fs.existsSync(filePath)
		? JSON.parse(fs.readFileSync(filePath, "utf8"))
		: [];

	// Find the index of the post with the given ID
	const postIndex = posts.findIndex(post => post.id === id);

	if (postIndex === -1) {
		return false; // Post not found
	}

	// Remove the post from the array
	posts.splice(postIndex, 1);

	// Save the updated posts back to the file
	fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));

	return true; // Deletion successful
};
