import { motion } from 'framer-motion';

function Loader() {
    return (
        <motion.div
            className="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="spinner"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            />
            <p>Loading weather...</p>
        </motion.div>
    );
}

export default Loader;