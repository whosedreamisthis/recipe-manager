import React from 'react';
import { fetchRecipes } from '../actions';
import RecentList from '@/components/RecentList';

export default async function Page() {
	return <RecentList />;
}
