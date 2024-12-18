"use client";

import Link from "next/link";
import styles from "./Footer.module.scss";

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.container}>
				<div className={styles.block}>
					<div className={styles.title}>
						<h1>Helping businesses</h1>
						<span>scale and grow</span>
					</div>
				</div>
				<div className={styles.flex_row}>
					<div className={styles.list}>
						<div className={styles.text}>
							<h6>Quick links</h6>
						</div>
						<ul>
							<li>
								<Link href="/">Home</Link>
							</li>
							<li>
								<p>Book a Demo</p>
							</li>
							<li>
								<p>Contact Us</p>
							</li>
						</ul>
					</div>
					<div className={styles.list}>
						<ul>
							<li>
								<Link href="/faq">FAQs</Link>
							</li>
							<li>
								<Link href="/terms">Terms & Conditions</Link>
							</li>
							<li>
								<Link href="/policy">Privacy Policy</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className={styles.row}>
					<div className={styles.block}>
						<div className={styles.text}>
							<p>©2024 Tavolo Inc.</p>
						</div>
					</div>
					<div className={styles.grid_row}></div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
