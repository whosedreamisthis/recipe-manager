export const SEED_RECIPES = [
	{
		id: 'miso-ramen-001',
		title: 'Midnight Miso Ramen',
		description:
			'A rich, 20-minute umami broth infused with red miso and charred scallions.',
		author: 'Chef Kenji',
		likes: 1240,
		prepTime: 10,
		cookTime: 10,
		categories: ['Dinner', 'Quick', 'Easy', 'Noodle'],
		image:
			'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=800',
	},
	{
		id: 'citrus-salmon-002',
		title: 'Citrus-Crusted Salmon',
		description:
			'Pan-seared Atlantic salmon topped with lemon, lime, and panko crumbs.',
		author: 'Elena Rodriguez',
		likes: 856,
		prepTime: 10,
		cookTime: 15,
		categories: ['Dinner', 'Seafood', 'Healthy'],
		image:
			'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800',
	},
	{
		id: 'halloumi-fries-003',
		title: 'Honey Garlic Halloumi Fries',
		description:
			'Salty cheese fried until golden, drizzled with spicy wildflower honey.',
		author: 'Marcus Thorne',
		likes: 2105,
		prepTime: 5,
		cookTime: 10,
		categories: ['Appetizer', 'Vegetarian', 'Quick'],
		image:
			'https://images.unsplash.com/photo-1510629954389-c1e0da47d414?auto=format&fit=crop&q=80&w=800',
	},
	{
		id: 'harvest-bowl-004',
		title: 'Roasted Root Harvest Bowl',
		description:
			'Maple-glazed sweet potatoes, golden beets, and tri-color quinoa.',
		author: 'Sarah Green',
		likes: 642,
		prepTime: 15,
		cookTime: 30,
		categories: ['Lunch', 'Vegetarian', 'Vegan', 'Healthy'],
		image:
			'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=800',
	},
	{
		id: 'tuscan-pasta-005',
		title: 'Tuscan Sun Pasta',
		description:
			'Al dente linguine tossed in a sun-dried tomato cream sauce with fresh basil.',
		author: 'Luca Rossi',
		likes: 1890,
		prepTime: 10,
		cookTime: 15,
		categories: ['Dinner', 'Vegetarian', 'Easy', 'Pasta'],
		image:
			'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=800',
	},
	{
		id: 'shrimp-tacos-006',
		title: 'Blackened Shrimp Tacos',
		description:
			'Spicy shrimp in charred corn tortillas with a cool pineapple slaw.',
		author: 'Maya Castillo',
		likes: 933,
		prepTime: 15,
		cookTime: 10,
		categories: ['Dinner', 'Quick', 'Seafood'],
		image:
			'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=800',
	},
	{
		id: 'beef-bourguignon-007',
		title: 'Slow-Cooked Beef Bourguignon',
		description:
			'Tender beef braised in red wine with pearl onions and carrots.',
		author: 'Julien Dupont',
		likes: 3102,
		prepTime: 30,
		cookTime: 240,
		categories: ['Dinner', 'Classic', 'Slow-Cooker'],
		image:
			'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=800',
	},
	{
		id: 'feta-toast-008',
		title: 'Whipped Feta & Hot Honey Toast',
		description:
			'Sourdough topped with airy whipped feta and crushed pistachios.',
		author: 'Chloe Baker',
		likes: 4210,
		prepTime: 10,
		cookTime: 5,
		categories: ['Breakfast', 'Vegetarian', 'Quick', 'Easy'],
		image:
			'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=800',
	},
	{
		id: 'glazed-tofu-009',
		title: 'Ginger-Soy Glazed Tofu',
		description:
			'Extra-firm tofu seared until crispy with a sticky ginger-soy reduction.',
		author: 'Wei Chen',
		likes: 725,
		prepTime: 15,
		cookTime: 15,
		categories: ['Dinner', 'Vegetarian', 'Vegan', 'Healthy'],
		image:
			'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800',
	},
	{
		id: 'creme-brulee-010',
		title: 'Bourbon Vanilla Crème Brûlée',
		description:
			'Silky custard with a hint of bourbon and a glass-like sugar crust.',
		author: 'Sophie Laurent',
		likes: 1540,
		prepTime: 20,
		cookTime: 45,
		categories: ['Dessert', 'Classic', 'Vegetarian'],
		image:
			'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800',
	},
];

export const RECIPE_CATEGORIES = [
	// Course
	'Breakfast',
	'Lunch',
	'Dinner',
	'Appetizer',
	'Side Dish',
	'Dessert',
	'Snack',

	// Dietary
	'Vegetarian',
	'Vegan',
	'Gluten-Free',
	'Dairy-Free',
	'Keto',
	'Healthy',

	// Complexity & Time
	'Quick',
	'Easy',
	'Intermediate',
	'Advanced',
	'Slow-Cooker',
	'One-Pot',

	// Cuisine
	'Italian',
	'Mexican',
	'Asian',
	'Mediterranean',
	'French',
	'American',
	'Indian',

	// Special Tags
	'Classic',
	'Seafood',
	'Noodle',
	'Pasta',
	'High-Protein',
];
