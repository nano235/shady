"use client";

import React, { useEffect, useMemo, useState } from "react";
import styles from "./Shots.module.scss";
// import { projects } from "@/mock/projects.mock";
import { Pagination, ShotCard } from "@/shared";
import { useDribbleShots } from "@/hooks/useDribbleShots";
import { useAppSelector } from "@/store/configureStore";
import { Shot } from "@/store/slices/shotsSlice";

const pageSize = 16;

const ShotsView = () => {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const shots = useAppSelector(s => s.shots);
	const { fetchDribbbleShots } = useDribbleShots();

	useEffect(() => {
		fetchDribbbleShots();
	}, [fetchDribbbleShots]);

	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * pageSize;
		const lastPageIndex = firstPageIndex + pageSize;
		return shots.slice(firstPageIndex, lastPageIndex);
	}, [currentPage, shots]);

	const startNumber = (currentPage - 1) * pageSize + 1;

	const endNumber = Math.min(startNumber + currentTableData.length - 1, shots.length);
	return (
		<section className={styles.section}>
			<div className={styles.row}>
				<p>Shots</p>
				<Pagination
					currentPage={currentPage}
					totalCount={shots.length}
					pageSize={pageSize}
					onPageChange={(page: number) => setCurrentPage(page)}
					startNumber={startNumber}
					endNumber={endNumber}
				/>
			</div>
			<div className={styles.grid}>
				{currentTableData.map((project: Shot, index: number) => (
					<ShotCard
						key={index}
						project={project}
						projects={shots}
						index={index}
					/>
				))}
			</div>
		</section>
	);
};

export default ShotsView;
