import { Link } from 'react-router'
import { Button } from '../ui/button'

function Sidebar() {
	const routerUrls = [
		{ url: 'problem-1', label: 'Problem 01' },
		{ url: 'problem-2', label: 'Problem 02' },
		{ url: 'problem-3', label: 'Problem 03' },
	]

	return (
		<div className="w-3xs p-3 flex flex-col gap-4 border-r h-screen">
			{routerUrls.map((item) => {
				return (
					<Link className="w-full" to={{ pathname: item.url }}>
						<Button className="w-full">{item.label}</Button>
					</Link>
				)
			})}
		</div>
	)
}

export default Sidebar
