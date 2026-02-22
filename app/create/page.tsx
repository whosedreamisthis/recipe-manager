// app/create/page.tsx
import NewRecipeForm from '@/components/Form/NewRecipeForm';
import React, { Suspense } from 'react'; // 1. Import Suspense

export default function page() {
	return (
		// 2. Wrap the form in Suspense
		<Suspense
			fallback={<div className="p-10 text-center">Loading Form...</div>}
		>
			<NewRecipeForm />
		</Suspense>
	);
}
