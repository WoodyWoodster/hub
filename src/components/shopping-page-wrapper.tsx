'use client';

import { motion } from 'framer-motion';

const pageVariants = {
	initial: {
		opacity: 0,
		x: 20,
	},
	animate: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.5,
			delay: 0.2,
			ease: 'easeOut',
		},
	},
	exit: {
		opacity: 0,
		x: -20,
		transition: {
			duration: 0.3,
			ease: 'easeIn',
		},
	},
};

export function ShoppingPageWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<motion.div
			variants={pageVariants}
			initial="initial"
			animate="animate"
			exit="exit"
			className="space-y-8"
		>
			{children}
		</motion.div>
	);
}
