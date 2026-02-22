export const MANUAL_RECIPES = [
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
		ingredients: [
			{ name: 'Ramen Noodles', quantity: 2, unit: 'bundles' },
			{ name: 'Red Miso Paste', quantity: 3, unit: 'tbsp' },
			{ name: 'Chicken Broth', quantity: 500, unit: 'ml' },
			{ name: 'Soy Sauce', quantity: 1, unit: 'tbsp' },
			{ name: 'Scallions', quantity: 4, unit: 'stalks' },
			{ name: 'Sesame Oil', quantity: 1, unit: 'tsp' },
		],
		instructions: [
			'Bring chicken broth to a light simmer in a medium pot.',
			'In a small bowl, whisk miso paste with a splash of warm broth until smooth, then stir back into the pot.',
			'Boil ramen noodles in a separate pot according to package instructions.',
			'While noodles cook, char white parts of scallions in a dry pan over high heat.',
			'Divide noodles into bowls, pour broth over, and top with charred scallions and sesame oil.',
		],
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
		ingredients: [
			{ name: 'Salmon Fillets', quantity: 2, unit: 'pieces' },
			{ name: 'Panko Breadcrumbs', quantity: 0.5, unit: 'cup' },
			{ name: 'Lemon Zest', quantity: 1, unit: 'tsp' },
			{ name: 'Lime Zest', quantity: 1, unit: 'tsp' },
			{ name: 'Olive Oil', quantity: 2, unit: 'tbsp' },
			{ name: 'Fresh Parsley', quantity: 1, unit: 'tbsp' },
		],
		instructions: [
			'Preheat oven to 400°F (200°C).',
			'Mix panko, citrus zests, chopped parsley, and 1 tbsp olive oil in a small bowl.',
			'Season salmon with salt and pepper, then press the panko mixture onto the top of each fillet.',
			'Heat remaining oil in an oven-proof skillet and sear the bottom of the salmon for 2 minutes.',
			'Transfer skillet to the oven and bake for 8-10 minutes until panko is golden and salmon flakes easily.',
		],
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
		ingredients: [
			{ name: 'Halloumi Cheese', quantity: 250, unit: 'g' },
			{ name: 'Cornstarch', quantity: 2, unit: 'tbsp' },
			{ name: 'Honey', quantity: 3, unit: 'tbsp' },
			{ name: 'Chili Flakes', quantity: 0.5, unit: 'tsp' },
			{ name: 'Garlic', quantity: 1, unit: 'clove' },
			{ name: 'Oil for frying', quantity: 100, unit: 'ml' },
		],
		instructions: [
			'Cut halloumi into 1cm thick "fries" and pat dry with paper towels.',
			'Toss halloumi sticks in cornstarch until lightly coated.',
			'Heat oil in a pan and fry halloumi in batches until golden brown on all sides.',
			'In a small microwave-safe bowl, mix honey, chili flakes, and minced garlic; heat for 20 seconds.',
			'Drain fries on paper towels and drizzle with the warm spicy honey immediately.',
		],
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
		ingredients: [
			{ name: 'Sweet Potato', quantity: 2, unit: 'large' },
			{ name: 'Golden Beets', quantity: 3, unit: 'medium' },
			{ name: 'Quinoa', quantity: 1, unit: 'cup' },
			{ name: 'Maple Syrup', quantity: 2, unit: 'tbsp' },
			{ name: 'Kale', quantity: 2, unit: 'cups' },
			{ name: 'Tahini', quantity: 3, unit: 'tbsp' },
		],
		instructions: [
			'Cube sweet potatoes and beets, toss with maple syrup and olive oil, then roast at 400°F for 25 mins.',
			'Cook quinoa in 2 cups of water until fluffy.',
			'Massage kale with a little olive oil and salt to soften.',
			'Whisk tahini with a splash of lemon juice and water to make a dressing.',
			'Assemble bowls with quinoa, roasted roots, and kale; top with tahini dressing.',
		],
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
		ingredients: [
			{ name: 'Linguine', quantity: 400, unit: 'g' },
			{ name: 'Sun-dried Tomatoes', quantity: 0.5, unit: 'cup' },
			{ name: 'Heavy Cream', quantity: 1, unit: 'cup' },
			{ name: 'Parmesan', quantity: 0.5, unit: 'cup' },
			{ name: 'Fresh Basil', quantity: 1, unit: 'handful' },
			{ name: 'Garlic', quantity: 3, unit: 'cloves' },
		],
		instructions: [
			'Boil linguine in salted water until al dente.',
			'Sauté minced garlic and sun-dried tomatoes in a large pan.',
			'Pour in heavy cream and bring to a simmer; stir in grated parmesan until melted.',
			'Toss the cooked pasta into the sauce, adding a splash of pasta water if needed.',
			'Garnish with fresh basil and extra parmesan before serving.',
		],
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
		ingredients: [
			{ name: 'Large Shrimp', quantity: 500, unit: 'g' },
			{ name: 'Cajun Seasoning', quantity: 2, unit: 'tbsp' },
			{ name: 'Corn Tortillas', quantity: 8, unit: 'small' },
			{ name: 'Pineapple', quantity: 1, unit: 'cup' },
			{ name: 'Red Cabbage', quantity: 2, unit: 'cups' },
			{ name: 'Lime', quantity: 2, unit: 'whole' },
		],
		instructions: [
			'Toss shrimp in cajun seasoning and a little oil.',
			'Make slaw by mixing shredded cabbage, diced pineapple, and lime juice.',
			'Sear shrimp in a hot skillet for 2 minutes per side until blackened.',
			'Char tortillas over an open flame or in a dry pan.',
			'Assemble tacos with shrimp, slaw, and a squeeze of lime.',
		],
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
		ingredients: [
			{ name: 'Beef Chuck', quantity: 1, unit: 'kg' },
			{ name: 'Red Wine (Burgundy)', quantity: 500, unit: 'ml' },
			{ name: 'Pearl Onions', quantity: 15, unit: 'whole' },
			{ name: 'Carrots', quantity: 3, unit: 'large' },
			{ name: 'Bacon Lardons', quantity: 150, unit: 'g' },
			{ name: 'Beef Stock', quantity: 400, unit: 'ml' },
		],
		instructions: [
			'Brown beef cubes in batches in a large pot and set aside.',
			'Fry bacon lardons, then add onions and sliced carrots to the same pot.',
			'Return beef to the pot, pour in wine and stock until beef is covered.',
			'Add a bouquet garni (thyme, bay leaf) and simmer on low heat for 3-4 hours.',
			'The sauce should be thick and beef fork-tender before serving.',
		],
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
		ingredients: [
			{ name: 'Feta Cheese', quantity: 200, unit: 'g' },
			{ name: 'Greek Yogurt', quantity: 100, unit: 'g' },
			{ name: 'Sourdough Bread', quantity: 4, unit: 'slices' },
			{ name: 'Hot Honey', quantity: 2, unit: 'tbsp' },
			{ name: 'Pistachios', quantity: 0.25, unit: 'cup' },
		],
		instructions: [
			'Blend feta and yogurt in a food processor until light and airy.',
			'Toast sourdough slices until golden and crisp.',
			'Spread a thick layer of whipped feta onto each slice.',
			'Drizzle with hot honey and sprinkle with crushed pistachios.',
			'Serve immediately while toast is still warm.',
		],
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
		ingredients: [
			{ name: 'Extra-Firm Tofu', quantity: 400, unit: 'g' },
			{ name: 'Soy Sauce', quantity: 3, unit: 'tbsp' },
			{ name: 'Fresh Ginger', quantity: 1, unit: 'tbsp' },
			{ name: 'Maple Syrup', quantity: 1, unit: 'tbsp' },
			{ name: 'Cornstarch', quantity: 2, unit: 'tbsp' },
			{ name: 'Sesame Seeds', quantity: 1, unit: 'tsp' },
		],
		instructions: [
			'Press tofu to remove excess water, then cube and toss in cornstarch.',
			'Pan-fry tofu cubes until all sides are crispy and golden.',
			'In a small bowl, mix soy sauce, grated ginger, and maple syrup.',
			'Pour sauce over the tofu in the pan and toss until sticky and glazed.',
			'Top with sesame seeds and serve over steamed rice.',
		],
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
		ingredients: [
			{ name: 'Heavy Cream', quantity: 500, unit: 'ml' },
			{ name: 'Egg Yolks', quantity: 6, unit: 'large' },
			{ name: 'Granulated Sugar', quantity: 0.5, unit: 'cup' },
			{ name: 'Vanilla Bean', quantity: 1, unit: 'whole' },
			{ name: 'Bourbon', quantity: 1, unit: 'tbsp' },
		],
		instructions: [
			'Heat cream with vanilla bean seeds until just boiling, then remove from heat.',
			'Whisk egg yolks and sugar until pale, then slowly temper in the warm cream.',
			'Stir in bourbon and strain the mixture into ramekins.',
			'Bake in a water bath at 300°F (150°C) for 35-40 minutes until set but jiggly.',
			'Chill for 4 hours; before serving, sprinkle sugar on top and caramelize with a torch.',
		],
	},
];
const TITLES = [
	'Spicy',
	'Roasted',
	'Creamy',
	'Zesty',
	'Honey',
	'Garlic',
	'Tuscan',
	'Asian',
	'Midnight',
	'Harvest',
];
const PROTEINS = [
	'Chicken',
	'Salmon',
	'Tofu',
	'Beef',
	'Shrimp',
	'Halloumi',
	'Chickpea',
	'Lentil',
	'Pork',
	'Cod',
];
const BASES = [
	'Bowl',
	'Pasta',
	'Tacos',
	'Salad',
	'Stir-fry',
	'Curry',
	'Toast',
	'Soup',
	'Ramen',
	'Risotto',
];

const VERIFIED_FOOD_IDS = [
	'1546069901-ba9599a7e63c', // Fresh Salad
	'1567306226416-28f0efdc88ce', // Spaghetti
	'1512621776951-a57141f2eefd', // Buddha Bowl
	// '1565299624-897095c42f7f', // Pizza
	'1565958011703-44f9829ba187', // Dessert/Cheesecake
	'1484723091739-30a097e8f929', // Avocado Toast
	// '1476224203421-9ac3993557a7', // Mixed Plate
	'1493770348161-369560ae357d', // Pancakes
	'1467003909585-2f8a72700288', // Salmon
	'1540189549336-e6e99c3679fe', // Veggie Salad
	'1555939594-58d7cb561ad1', // Grilled Meat
	// '1567620905732-2d1ec7bb7445', // Chicken Wings
];

// Inside your generateMoreRecipes .map function:

const generateMoreRecipes = (count: number) => {
	return Array.from({ length: count }).map((_, i) => {
		const photoId = VERIFIED_FOOD_IDS[i % VERIFIED_FOOD_IDS.length];
		const title = `${TITLES[i % TITLES.length]} ${
			PROTEINS[i % PROTEINS.length]
		} ${BASES[i % BASES.length]}`;
		const id = `recipe-gen-${i + 11}`; // Starting after your manual 10

		return {
			id,
			title,
			description: `A delicious and flavorful ${title.toLowerCase()} prepared with fresh ingredients and signature spices.`,
			author: 'Community Chef',
			likes: Math.floor(Math.random() * 5000),
			prepTime: [5, 10, 15, 20][i % 4],
			cookTime: [10, 15, 20, 30, 45][i % 5],
			categories: ['Dinner', 'Quick', 'Healthy'],
			// Replace your current image line with this:
			image: `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&q=80&w=800`,
			ingredients: [
				{
					name: PROTEINS[i % PROTEINS.length],
					quantity: 1,
					unit: 'lb',
				},
				{ name: 'Olive Oil', quantity: 2, unit: 'tbsp' },
				{ name: 'Salt & Pepper', quantity: 1, unit: 'pinch' },
				{ name: 'Special Sauce', quantity: 3, unit: 'tbsp' },
			],
			instructions: [
				'Prepare all fresh ingredients and preheat your cooking surface.',
				'Combine spices and protein in a medium mixing bowl.',
				'Cook over medium-high heat until golden brown and fragrant.',
				'Garnish with fresh herbs and serve immediately while warm.',
			],
		};
	});
};

// Combine your 10 manual recipes with 90 generated ones
export const SEED_RECIPES = [
	...MANUAL_RECIPES, // Put your current list here
	...generateMoreRecipes(90),
];
export const RECIPE_CATEGORIES = [
	'My Recipes',
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
