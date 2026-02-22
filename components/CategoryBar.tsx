'use client';
import { RECIPE_CATEGORIES } from '@/data/seed-recipes';
import { useRef, useState } from 'react';
import { Button } from './ui/button';
import { useCategoryStore } from '@/stores/useCategoryStore';
export default function CategoryBar() {
	const scrollRef = useRef<HTMLDivElement>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [startX, setStartX] = useState(0);
	const [scrollLeft, setScrollLeft] = useState(0);
	const selectedCategory = useCategoryStore(
		(state) => state.selectedCategory,
	);
	const setCategory = useCategoryStore((state) => state.setCategory);

	const handleMouseDown = (e: React.MouseEvent) => {
		if (!scrollRef.current) return;
		setIsDragging(true);
		setStartX(e.pageX - scrollRef.current.offsetLeft);
		setScrollLeft(scrollRef.current.scrollLeft);
	};

	const handleMouseLeaveOrUp = () => {
		setIsDragging(false);
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!isDragging || !scrollRef.current) return;
		e.preventDefault();
		const x = e.pageX - scrollRef.current.offsetLeft;
		const walk = (x - startX) * 2; // The '2' is the scroll speed
		scrollRef.current.scrollLeft = scrollLeft - walk;
	};

	return (
		<div
			ref={scrollRef}
			onMouseDown={handleMouseDown}
			onMouseLeave={handleMouseLeaveOrUp}
			onMouseUp={handleMouseLeaveOrUp}
			onMouseMove={handleMouseMove}
			className={`
        flex overflow-x-auto no-scrollbar gap-2 py-4 px-4 
        cursor-grab active:cursor-grabbing select-none
      `}
		>
			{RECIPE_CATEGORIES.map((cat) => {
				const isActive = cat === selectedCategory;
				return (
					<Button
						aria-label={`Select Category ${cat}`}
						key={cat}
						className={`whitespace-nowrap px-4 py-1 rounded-md border   text-sm hover:border-cyan-500 transition-colors ${
							isActive
								? 'text-slate-900 bg-white border-slate-700 hover:bg-white'
								: 'bg-slate-900 text-white'
						}`}
						onClick={() => {
							setCategory(cat);
						}}
					>
						{cat}
					</Button>
				);
			})}
		</div>
	);
}
