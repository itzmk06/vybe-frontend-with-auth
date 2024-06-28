import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Card.css";

gsap.registerPlugin(ScrollTrigger);

function Cards({ data, title }) {
  const cardRefs = useRef([]);

  useEffect(() => {
    gsap.set(cardRefs.current, { autoAlpha: 0 });

    cardRefs.current.forEach((card, index) => {
      ScrollTrigger.create({
        trigger: card,
        end: "bottom 30%",
        scrub: 5,
        onToggle: (self) => {
          if (self.isActive) {
            gsap.to(card, {
              autoAlpha: 1,
              y: 0,
              duration: 2,
              ease: "power3.out",
              stagger: 0.2,
            });
          } else {
            gsap.to(card, {
              autoAlpha: 0,
              y: 100,
              duration: 2,
              ease: "power3.out",
              stagger: 0.2,
            });
          }
        },
      });
    });
  }, [data]);

  const handleMouseEnter = (index) => {
    gsap.to(cardRefs.current[index], {
      duration: 0.5,
      scale: 1.05,
      rotationX: 10,
      rotationY: 5,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
      ease: "power3.out",
    });
  };

  const handleMouseLeave = (index) => {
    gsap.to(cardRefs.current[index], {
      duration: 0.5,
      scale: 1,
      rotationX: 0,
      rotationY: 0,
      boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
      ease: "power3.out",
    });
  };

  return (
    <div className="cards-grid">
      {data.map((d, i) => (
        <Link
          to={`/${d.media_type || title}/details/${d.id}`}
          className="card group"
          key={i}
          ref={(el) => (cardRefs.current[i] = el)}
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={() => handleMouseLeave(i)}
          aria-label={d.title || d.name || d.original_title || d.original_name}
        >
          <div className="placeholder">
            <img
              className="card-img"
              src={`https://image.tmdb.org/t/p/original/${d.poster_path || d.backdrop_path || d.profile_path}?`}
              alt={d.title || d.name || d.original_title || d.original_name}
              loading="lazy"
              onLoad={(e) => (e.target.className += " lazyloaded")}
            />
          </div>
          {d.vote_average && title !== "people" && (
            <div className="card-rating">{(d.vote_average * 10).toFixed()}%</div>
          )}
          <div className="card-overlay">
            <h2 className="card-title">{d.title || d.name || d.original_title || d.original_name}</h2>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Cards;
