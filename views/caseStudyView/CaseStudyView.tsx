import React from "react";
import styles from "./CaseStudyView.module.scss";
import Link from "next/link";

export interface CaseStudy {
	title: string;
	id: string;
	content?: string;
}

interface Props {
	caseStudies: CaseStudy[];
}

const CaseStudyView = ({ caseStudies }: Props) => {
	return (
		<section className={styles.section}>
			<div className={styles.grid}>
				{caseStudies.map((caseStudy: CaseStudy) => (
					<Link
						href={`/case-studies/${caseStudy.id}`}
						key={caseStudy.id}
						className={styles.card}
					>
						<p>{caseStudy.title}</p>
					</Link>
				))}
			</div>
		</section>
	);
};

export default CaseStudyView;
