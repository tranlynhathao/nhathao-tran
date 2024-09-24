import { motion } from 'framer-motion';
import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  delay: number;
}

const Section: React.FC<SectionProps> = ({ children, delay }) => {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay }}
      className="mb-12"
    >
      {children}
    </motion.div>
  );
};

export default Section;
