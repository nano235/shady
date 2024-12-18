import fs from "fs";
import path from "path";
import styles from "./styles.module.scss";

type Post = {
	id: string;
	title: string;
	content: string;
};

// Generate static params for all posts
export async function generateStaticParams() {
	const filePath = path.join(process.cwd(), "data", "posts.json");

	const posts: Post[] = fs.existsSync(filePath)
		? JSON.parse(fs.readFileSync(filePath, "utf8"))
		: [];

	return posts.map(post => ({
		id: post.id,
	}));
}

// Dynamic post page component
export default async function PostPage({ params }: { params: { id: string } }) {
	const filePath = path.join(process.cwd(), "data", "posts.json");

	const posts: Post[] = fs.existsSync(filePath)
		? JSON.parse(fs.readFileSync(filePath, "utf8"))
		: [];

	const post = posts.find(post => post.id === params.id);

	if (!post) {
		return <div>Post not found</div>;
	}

	return (
		<div className={styles.section}>
			<h1 className={styles.title}>Case Study: {post.title}</h1>
			<div dangerouslySetInnerHTML={{ __html: post.content }}></div>
		</div>
	);
}
