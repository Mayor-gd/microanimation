import React, { useRef, useEffect, useState } from 'react';
import { Drawer, Box } from '@mui/material';
import { motion } from 'framer-motion';

const BottomSheet = ({ open, setOpen, children }) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight); // Get content height
    }
  }, [children]); // Trigger when content changes

  return (
    <Drawer anchor="bottom" open={open} onClose={() => setOpen(false)} transitionDuration={300}>
      <motion.div
        initial={{ height: 0 }}
        animate={{ height }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ overflow: 'hidden', background: 'white' }}
      >
        <Box ref={contentRef} sx={{ p: 0 }}>{children}</Box>
      </motion.div>
    </Drawer>
  );
};

export default BottomSheet;
