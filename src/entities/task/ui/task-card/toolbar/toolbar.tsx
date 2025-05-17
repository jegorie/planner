import { motion } from "motion/react";

type Props = {
    isOpen: boolean;
    children?: React.ReactNode;
};

export const Toolbar: React.FC<Props> = (props) => {
    const { isOpen, children } = props;

    return (
        <motion.div
            className="flex ml-3 justify-between mt-1 overflow-hidden p-1 flex-col sm:flex-row sm:items-center"
            initial={{
                height: 0,
                opacity: 0,
                marginTop: 0,
            }}
            animate={{
                height: isOpen ? "auto" : 0,
                opacity: isOpen ? 1 : 0,
                marginTop: isOpen ? 8 : 0,
            }}
            exit={{
                height: 0,
                opacity: 0,
                marginTop: 0,
            }}
        >
            {children}
        </motion.div>
    );
};
