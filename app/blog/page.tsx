import fs from "fs";
import path from "path";

type Post = {
	id: number;
	title: string;
	content: string;
};

export default function BlogPage() {
	const filePath = path.join(process.cwd(), "data", "posts.json");
	const posts: Post[] = fs.existsSync(filePath)
		? (JSON.parse(fs.readFileSync(filePath, "utf8")) as Post[])
		: [];

	console.log(posts);
	return (
		<div>
			<h1>Blog Posts</h1>
			{posts.length === 0 ? (
				<p>No posts available.</p>
			) : (
				posts.map(post => (
					<div key={post.id} style={{ marginBottom: "20px" }}>
						<h2>{post.title}</h2>
						<div dangerouslySetInnerHTML={{ __html: post.content }}></div>
					</div>
				))
			)}
		</div>
	);
}
