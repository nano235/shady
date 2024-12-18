"use client";

import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import Button from "../button/Button";
import { scrollTo } from "@/utils/scrollTo";
import Link from "next/link";
import CustomLink from "../customLink/CustomLink";
import { navlinks } from "@/mock/navlinks.mock";
import { Navlink } from "@/interfaces";
import { usePathname } from "next/navigation";

const Header = () => {
	const [collapsed, setCollapsed] = useState<boolean>(true);
	const pathname = usePathname();

	useEffect(() => {
		document.body.style.overflow = !collapsed ? "hidden" : "auto";
		return () => {
			document.body.style.overflow = "auto";
		};
	}, [collapsed]);

	const handleNavClick = (id: string) => {
		scrollTo({ id });
		setCollapsed(true);
	};

	return (
		<header className={styles.header} data-animation="header">
			<div className={styles.container}>
				<div
					className={
						styles[
							!collapsed ? "header_wrapper" : "header_wrapper__collapsed"
						]
					}
				>
					<nav className={styles.header_nav}>
						<ul className={styles.header_navList}>
							{navlinks.map((navlink: Navlink) => (
								<li
									key={navlink.id}
									className={styles.header_navLink}
									onClick={() => handleNavClick("home")}
									data-active={pathname === navlink.href}
								>
									<Link href={navlink.href}>{navlink.label}</Link>
								</li>
							))}
						</ul>
					</nav>
					<CustomLink href="/" className={styles.button}>
						Hire me
					</CustomLink>
				</div>
				<Button
					onClick={() => setCollapsed(!collapsed)}
					className={
						styles[collapsed ? "header_hamburger" : "header_hamburger__open"]
					}
				>
					<div className={styles.hamburger_container}>
						<span className={styles.hamburger_containerBar}></span>
						<span className={styles.hamburger_containerBar}></span>
					</div>
				</Button>
			</div>
		</header>
	);
};

export default Header;
