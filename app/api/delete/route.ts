import { NextRequest, NextResponse } from "next/server";
import { deletePost } from "@/utils/deletePost";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
	const { id } = params;

	try {
		if (!id) {
			return NextResponse.json(
				{ success: false, error: "No ID provided" },
				{ status: 400 }
			);
		}

		const success = deletePost(id);

		if (!success) {
			return NextResponse.json(
				{ success: false, error: "Post not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json({ success: true, message: "Post deleted successfully" });
	} catch (error) {
		console.error("Error deleting post:", error);
		return NextResponse.json(
			{ success: false, error: "Internal server error" },
			{ status: 500 }
		);
	}
}
