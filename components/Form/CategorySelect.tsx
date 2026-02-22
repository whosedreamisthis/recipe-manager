'use client';

import * as React from 'react';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from '@/components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { RECIPE_CATEGORIES } from '@/data/seed-recipes';

interface CategorySelectProps {
	selected: string[];
	onChange: (value: string[]) => void;
}

export function CategorySelect({ selected, onChange }: CategorySelectProps) {
	const selectableCategories = RECIPE_CATEGORIES.filter(
		(category) => category.toLowerCase() !== 'My Recipes'.toLowerCase(),
	);
	const [open, setOpen] = React.useState(false);

	const handleUnselect = (item: string) => {
		onChange(selected.filter((i) => i !== item));
	};

	return (
		<div className="flex flex-col gap-3">
			<div className="flex flex-wrap gap-2">
				{selected.map((item) => (
					<Badge
						key={item}
						variant="secondary"
						className="pl-2 pr-1 py-1 pl-2"
					>
						{item}
						<Button
							className="ml-1 rounded-md outline-none focus:ring-2 focus:ring-ring"
							variant="ghost"
							onClick={() => handleUnselect(item)}
							aria-label={`unselect category ${item}`}
						>
							<X className="h-3 w-3 hover:text-foreground" />
						</Button>
					</Badge>
				))}
			</div>

			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="w-full justify-between"
					>
						{selected.length > 0
							? 'Add more...'
							: 'Select categories...'}
						<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-full p-0">
					<Command>
						<CommandInput placeholder="Search categories..." />
						<CommandEmpty>No category found.</CommandEmpty>
						<CommandGroup className="max-h-64 overflow-auto">
							{selectableCategories.map((category) => (
								<CommandItem
									key={category}
									onSelect={() => {
										onChange(
											selected.includes(category)
												? selected.filter(
														(s) => s !== category,
												  )
												: [...selected, category],
										);
										setOpen(false);
									}}
								>
									<Check
										className={`mr-2 h-4 w-4 ${
											selected.includes(category)
												? 'opacity-100'
												: 'opacity-0'
										}`}
									/>
									{category}
								</CommandItem>
							))}
						</CommandGroup>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
}
