"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

// Dynamically import ReactQuill
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function UploadPage() {
	const [title, setTitle] = useState<string>("");
	const [content, setContent] = useState<string>("");
	const [message, setMessage] = useState<string | null>(null);
	const [ssr, setSsr] = useState(true);

	useEffect(() => {
		setSsr(false);
	}, []);
	if (ssr) return null;

	const toolbarOptions = [
		["bold", "italic", "underline", "strike"],
		["blockquote", "code-block"],
		["image"],
		[{ header: 1 }, { header: 2 }],
		[{ size: ["small", false, "large", "huge"] }],
		[{ header: [1, 2, 3, 4, 5, 6, false] }],
		[{ color: [] }, { background: [] }],
		[{ align: [] }],
		["clean"],
	];

	const modules = {
		toolbar: toolbarOptions,
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const res = await fetch("/api/upload", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ title, content }),
			});

			if (!res.ok) {
				const error = await res.json();
				throw new Error(error.error || "Failed to upload post.");
			}

			setMessage("Post uploaded successfully!");
			setTitle("");
			setContent("");
		} catch (error) {
			console.error("Error uploading post:", error);
			setMessage("Error uploading post. Please try again.");
		}
	};

	return (
		<div>
			<h1>Create a Blog Post</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="title">Title:</label>
					<input
						id="title"
						type="text"
						value={title}
						onChange={e => setTitle(e.target.value)}
						required
					/>
				</div>
				<div>
					<label htmlFor="content">Content:</label>
					<ReactQuill
						value={content}
						onChange={setContent}
						modules={modules}
						theme="snow"
					/>
				</div>
				<button type="submit">Upload Post</button>
			</form>
			{message && <p>{message}</p>}
		</div>
	);
}
