import React from "react";
import styles from "./Hero.module.scss";
import { CustomLink, ShotCard } from "@/shared";
import { projects } from "@/mock/projects.mock";
import { Project } from "@/interfaces";

const Hero = () => {
	return (
		<section className={styles.hero}>
			<div className={styles.text}>
				<p>Hi, I’m Shady, A Web3 Product Designer</p>
				<p>
					I specialize in designing innovative solutions for the decentralized
					web.
				</p>
			</div>
			<CustomLink href="/projects" className={styles.button}>
				Explore projects
			</CustomLink>
			<div className={styles.grid}>
				{projects.slice(0, 8).map((project: Project, index: number) => (
					<ShotCard
						key={index}
						project={project}
						projects={projects}
						index={index}
					/>
				))}
				<div className={styles.button_container}>
					<CustomLink href="/projects" className={styles.button}>
						View all projects
					</CustomLink>
				</div>
			</div>
			<div className={styles.title}>
				<p>What I can help you with</p>
			</div>
			<div className={styles.row}>
				{["Landing Pages", "Pitch Decks", "Web Apps", "Mobile Apps"].map(
					(item: string) => (
						<div key={item} className={styles.card}>
							<p>{item}</p>
						</div>
					)
				)}
			</div>
		</section>
	);
};

export default Hero;