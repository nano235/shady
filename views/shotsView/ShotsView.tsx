"use client";

import React, { useEffect, useState, useCallback } from "react";
import styles from "./Shots.module.scss";
import { ShotCard } from "@/shared";
import { useDribbleShots } from "@/hooks/useDribbleShots";
import { useAppDispatch, useAppSelector } from "@/store/configureStore";
import { Shot, appendShots } from "@/store/slices/shotsSlice";

const ShotsView = () => {
  const shots = useAppSelector((state) => state.shots.displayedShots); // Shots to display (first 20, then more)
  const hasMore = useAppSelector((state) => state.shots.hasMore); // Check if there are more shots to load
  const { fetchDribbbleShots } = useDribbleShots();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false); // Track loading state

  // Fetch more shots when user scrolls
  const handleFetchMore = async () => {
    if (loading || !hasMore) return; // Prevent multiple requests while loading or when no more shots

    setLoading(true);
    // Append 20 more shots to the display
    dispatch(appendShots());
    setLoading(false);
  };

  // Scroll event handler to trigger fetching more shots when the user reaches the bottom
  const handleScroll = useCallback(() => {
    const bottom =
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight;
    if (bottom) {
      handleFetchMore(); // Fetch more shots if scrolled to the bottom
    }
  }, [loading, hasMore]);

  // Fetch all shots once on initial mount
  useEffect(()=> {
	fetchDribbbleShots();
  },[])
  useEffect(() => {
    
    window.addEventListener("scroll", handleScroll);

    // Cleanup the scroll event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, fetchDribbbleShots]);

  return (
    <section className={styles.section}>
      <div className={styles.row}>
        <p>Shots</p>
      </div>
      <div className={styles.grid}>
        {shots.map((shot: Shot, index: number) => (
          <ShotCard projects={shots} key={shot.id} project={shot} index={index} />
        ))}
      </div>
      {loading && <p>Loading...</p>}
      {!hasMore && <p>No more shots to load</p>}
    </section>
  );
};

export default ShotsView;
