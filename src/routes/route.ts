import { createBrowserRouter } from 'react-router'
import AppLayout from '../components/layouts/app.layout'
import Problem1 from '../view/problem-1'
import Problem2 from '../view/problem-2'
import Problem3 from '../view/problem-3'

export const appRoute = createBrowserRouter([
	{
		path: '/',
		Component: AppLayout,
		children: [
			{ index: true, Component: Problem1 },
			{ path: 'problem-1', Component: Problem1 },
			{ path: 'problem-2', Component: Problem2 },
			{ path: 'problem-3', Component: Problem3 },
		],
	},
])
