import React, { useEffect, useRef, useState, useCallback } from "react";
import SideNav from "./helper/SideNav";
import TopNav from "./helper/TopNav";
import axios from "../utils/axios";
import Header from "./helper/Header";
import HorizontalCards from "./helper/HorizontalCards";
import DropDown from "./helper/DropDown";
import Loader from "./helper/Loader";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, Draggable);

const Home = () => {
  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState([]);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  const sideNavRef = useRef(null);
  const topNavRef = useRef(null);
  const headerRef = useRef(null);
  const trendingRef = useRef(null);
  const cardsRef = useRef(null);

  // Fetch wallpaper data
  const getWallPaper = useCallback(async () => {
    try {
      const { data } = await axios.get(`/trending/all/week`);
      const randomWallpaper = data.results[Math.floor(Math.random() * data.results.length)];
      setWallpaper(randomWallpaper);
    } catch (error) {
      console.error("Error fetching wallpaper: ", error);
    }
  }, []);

  // Fetch trending data based on category
  const getTrending = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/trending/${category}/week`);
      setTrending(data.results);
    } catch (error) {
      console.error("Error fetching trending data: ", error);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    getTrending();
    if (!wallpaper) getWallPaper();
  }, [category, getTrending, getWallPaper, wallpaper]);

  // GSAP animation setup
  useEffect(() => {
    const masterTimeline = gsap.timeline();

    const animateIn = (element, fromVars, toVars, trigger) => {
      if (trigger) {
        ScrollTrigger.create({
          trigger,
          start: "top 80%",
          animation: gsap.fromTo(element, fromVars, toVars),
        });
      } else {
        gsap.fromTo(element, fromVars, toVars);
      }
    };

    masterTimeline.add(animateIn(sideNavRef.current, { opacity: 0, x: -100 }, { opacity: 1, x: 0, duration: 1, ease: "power4.out" }));
    masterTimeline.add(animateIn(topNavRef.current, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1, ease: "power4.out" }), "-=0.5");
    masterTimeline.add(animateIn(headerRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1, ease: "power4.out", scrollTrigger: { trigger: headerRef.current, start: "top 80%" } }), "-=0.5");
    masterTimeline.add(animateIn(trendingRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power4.out", scrollTrigger: { trigger: trendingRef.current, start: "top 80%" } }), "-=0.5");
    masterTimeline.add(animateIn(cardsRef.current, { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1, ease: "power4.out", scrollTrigger: { trigger: cardsRef.current, start: "top 80%" } }), "-=0.5");

    const elements = document.querySelectorAll(".animate-card");
    gsap.fromTo(elements, { opacity: 0, y: 100 }, {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: cardsRef.current,
        start: "top 80%",
      },
    });

    // Add parallax effect
    gsap.utils.toArray(".parallax").forEach(layer => {
      gsap.to(layer, {
        y: (i, target) => -(target.offsetHeight * 0.1),
        ease: "none",
        scrollTrigger: {
          trigger: layer,
          start: "top bottom",
          scrub: true,
        },
      });
    });

    // Add 3D rotation
    gsap.utils.toArray(".rotate-3d").forEach(card => {
      gsap.fromTo(card, {
        rotationY: 0,
      }, {
        rotationY: 360,
        duration: 5,
        repeat: -1,
        ease: "linear",
      });
    });

    // Motion Path Animation
    gsap.to(".motion-path", {
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      motionPath: {
        path: [{ x: 100, y: 0 }, { x: 200, y: 100 }, { x: 300, y: 0 }],
        curviness: 1.5,
        autoRotate: true,
      },
    });

    // Draggable Interaction
    Draggable.create(".draggable", {
      type: "x,y",
      edgeResistance: 0.65,
      bounds: document.querySelector(".draggable-boundary"),
      inertia: true,
    });

  }, []);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value.toLowerCase());
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="w-full h-full overflow-hidden">
      <div ref={sideNavRef} className="parallax">
        <SideNav />
      </div>
      <div ref={topNavRef}>
        <TopNav />
      </div>
      <div ref={headerRef}>
        <Header data={wallpaper} />
      </div>
      <h1
        ref={trendingRef}
        className="font-semibold text-white ml-4 mt-1 font-jose text-lg flex justify-between"
      >
        Trending
        <DropDown
          title="Filter"
          options={["All", "TV", "Movie"]}
          func={handleCategoryChange}
          className="duration-500"
        />
      </h1>
      <div ref={cardsRef}>
        <HorizontalCards data={trending} title={category} className="animate-card rotate-3d draggable motion-path" />
      </div>
      <div className="draggable-boundary">
        <div className="draggable">Drag me!</div>
      </div>
    </div>
  );
};

export default Home;
