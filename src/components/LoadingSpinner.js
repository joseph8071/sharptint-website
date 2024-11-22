import { motion } from 'framer-motion';

function LoadingSpinner() {
  return (
    <motion.div
      className="flex justify-center items-center"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
    </motion.div>
  );
}

export default LoadingSpinner; 