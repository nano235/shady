import { CaseStudyView } from "@/views";
import { CaseStudy } from "@/views/caseStudyView/CaseStudyView";
import fs from "fs";
import path from "path";

export default function CaseStudyPage() {
	const filePath = path.join(process.cwd(), "data", "posts.json");
	const posts: CaseStudy[] = fs.existsSync(filePath)
		? (JSON.parse(fs.readFileSync(filePath, "utf8")) as CaseStudy[])
		: [];
	return <CaseStudyView caseStudies={posts} />;
}
