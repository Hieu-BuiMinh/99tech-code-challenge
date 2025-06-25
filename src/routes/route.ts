import { createBrowserRouter } from 'react-router'
import AppLayout from '../components/layouts/app.layout'
import HomePage from '../view/home'
import Problem1 from '../view/problem-1'
import Problem2 from '../view/problem-2'

export const appRoute = createBrowserRouter([
	{
		path: '/',
		Component: AppLayout,
		children: [
			{ index: true, Component: Problem1 },
			{ path: 'problem-1', Component: Problem1 },
			{ path: 'problem-2', Component: Problem2 },
			{
				path: 'auth',
				Component: HomePage,
				children: [
					{ path: 'login', Component: HomePage },
					{ path: 'register', Component: HomePage },
				],
			},
			{
				path: 'concerts',
				children: [
					{ index: true, Component: HomePage },
					{ path: ':city', Component: HomePage },
					{ path: 'trending', Component: HomePage },
				],
			},
		],
	},
])
