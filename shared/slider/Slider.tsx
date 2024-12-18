"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./Slider.module.scss";
import "swiper/css";
import "swiper/css/free-mode";
import Image from "next/image";

import { Autoplay } from "swiper/modules";

interface Props {
	slides: string[];
}

const Slider = ({ slides }: Props) => {
	return (
		<div className={styles.section}>
			<div className={styles.title}>
				<p>Clients I have worked with</p>
			</div>
			<div className={styles.container}>
				<Swiper
					spaceBetween={10}
					slidesPerView="auto"
					loop={true}
					freeMode={true}
					speed={5000}
					modules={[Autoplay]}
				>
					{[
						...slides,
						...slides,
						...slides,
						...slides,
						...slides,
						...slides,
						...slides,
						...slides,
						...slides,
						...slides,
					].map((slide, index) => (
						<SwiperSlide key={index} className={styles.slide}>
							<Image src={slide} alt={slide} fill />
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
};

export default Slider;
