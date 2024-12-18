"use client";

import { Hero } from "@/components";
import { useDribbleShots } from "@/hooks/useDribbleShots";
import { clients } from "@/mock/clients.mock";
import { Slider } from "@/shared";
import React from "react";

const HomeView = () => {
	const { fetchDribbbleShots } = useDribbleShots();

	fetchDribbbleShots();
	return (
		<>
			<Hero />
			<Slider slides={clients} />
		</>
	);
};

export default HomeView;
