import { motion } from "framer-motion";
import { PropsWithChildren } from "react";
interface props extends PropsWithChildren {
  id: string;
}

const Zoom = ({ children, id }: props) => {
  return (
    <motion.div
      layoutId={id}
      key={id}
      initial={{
        scale: 0.7,
      }}
      exit={{
        scale: 0.7,
      }}
      transition={{
        duration: 0.3,
      }}
      animate={{
        scale: 1,
      }}
    >
      {children}
    </motion.div>
  );
};

export default Zoom;
