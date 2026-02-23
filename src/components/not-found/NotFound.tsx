import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./not-found.css";

const NotFound = () => {
  return (
    <div className="not-found">
      <motion.h1
        className="not-found__title"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        404
      </motion.h1>

      <motion.p
        className="not-found__text"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        The page you're looking for doesn't exist or has been moved.
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
