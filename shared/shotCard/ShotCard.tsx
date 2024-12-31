import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./ShotCard.module.scss";
import { Shot } from "@/store/slices/shotsSlice";

interface Props {
  project: Shot;
  index: number;
  projects: Shot[];
}

const ShotCard = ({ project, index, projects }: Props) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const closeModal = () => {
    setOpenModal(false);
  };

  const showModal = () => {
    setOpenModal(true);
    console.log(index);
  };

  useEffect(() => {
    document.body.style.overflow = openModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openModal]);

  const isFirstItem = index === 0;
  const isLastItem = !!(projects.length - 1);
  
  return (
    <>
      <div className={styles.card} onClick={showModal}>
        {project.images && (
          <Image
            src={project.images?.hidpi} // Ensure this is high-res
            alt={project.title || ""}
            layout="intrinsic" // Ensures the aspect ratio is maintained
            width={1200} // Explicit width for scaling
            height={800} // Explicit height for scaling
            quality={100} // Max quality for the image
          />
        )}
      </div>
      <div className={styles.modal_container} data-active={openModal}>
        <div className={styles.close_background} onClick={closeModal}></div>
        <div
          className={styles.modal}
          onClick={(e: React.MouseEvent<HTMLDivElement>) =>
            e.nativeEvent.stopImmediatePropagation()
          }
        >
          <div className={styles.header}>
            <div className={styles.title}>
              <h4>{projects[index].title}</h4>
            </div>
            <div className={styles.row}>
              <div
                className={styles.arrow_container}
                data-not={isFirstItem}
              >
                <div className={styles.arrow} data-not={isFirstItem}>
                  <Svg opacity={isFirstItem ? "0.3" : "1"} />
                </div>
                <div className={styles.arrow} data-not={isLastItem}>
                  <Svg opacity={isLastItem ? "0.3" : "1"} />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.body}>
            {projects[index].images && (
              <Image
                src={projects[index].images?.hidpi} // Ensure this is high-res too
                alt={projects[index]?.title || ""}
                layout="intrinsic"
                width={1200} // Adjust width based on design
                height={800} // Adjust height based on design
                quality={100} // Max quality
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShotCard;

const Svg = ({ opacity }: { opacity: string }) => (
  <svg
    width="25"
    height="21"
    viewBox="0 0 25 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.4641e-07 12C4.97056 12 9 16.0294 9 21"
      stroke="white"
      stroke-opacity={opacity}
      stroke-width="3"
    />
    <path
      d="M9 5.96046e-08C9 4.97056 4.97056 9 5.96046e-08 9"
      stroke="white"
      stroke-opacity={opacity}
      stroke-width="3"
    />
    <line
      x1="2.62268e-07"
      y1="10.5"
      x2="25"
      y2="10.5"
      stroke="white"
      stroke-opacity={opacity}
      stroke-width="3"
    />
  </svg>
);
