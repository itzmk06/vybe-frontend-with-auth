import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './HorizontalCards.css';
import noimage from '/public/noimage.webp';
import { motion, useAnimation } from 'framer-motion';

function HorizontalCards({ data }) {
  const controls = useAnimation();

  const handleHoverStart = async () => {
    await controls.start({ scale: 1.1 });
  };

  const handleHoverEnd = async () => {
    await controls.start({ scale: 1 });
  };

  return (
    <div className="marquee-container h-[44vh] p-1 duration-700 mt-1 overflow-auto mb-2">
      <motion.div className="marquee" initial={{ x: '100%' }} animate={{ x: 0 }} transition={{ type: 'spring', stiffness: 120, duration: 1 }}>
        {data.map((d, i) => (
          <motion.div
            key={i}
            className="card flex-shrink-0 lg:w-[12vw] lg:h-[33vh] bg-[#252833] rounded-lg shadow-lg overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * i, duration: 0.7, type: 'spring', stiffness: 120 }}
            whileHover={{ scale: 1.05 }}
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.5 } }}
          >
            <Link to={`/${d.media_type}/details/${d.id}`}>
              <motion.img
                className="rounded-t-lg object-cover w-full h-[25vh] object-top"
                src={
                  d.poster_path
                    ? `https://image.tmdb.org/t/p/original/${d.poster_path}`
                    : d.backdrop_path
                    ? `https://image.tmdb.org/t/p/original/${d.backdrop_path}`
                    : d.profile_path
                    ? `https://image.tmdb.org/t/p/original/${d.profile_path}`
                    : noimage
                }
                alt={d.original_title || d.title || d.name || d.original_name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * i + 0.3, duration: 0.7, type: 'spring', stiffness: 120 }}
              />
              <motion.div
                className="bg-[#009FFD] h-1 w-full rounded-md  relative"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.1 * i + 0.3, duration: 0.5, ease: 'easeInOut' }}
              />
              <div className="p-2">
                <motion.h2
                  className="text-white font-semibold text-md pb-2 leading-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i + 0.5, duration: 0.7, type: 'spring', stiffness: 120 }}
                >
                  {d.title || d.name || d.original_name || d.original_title}
                </motion.h2>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

HorizontalCards.propTypes = {
  data: PropTypes.array.isRequired,
};

export default HorizontalCards;
