import { Link } from 'react-router'
import { Button } from '../ui/button'
import { ModeToggle } from '../mode-toggle'

function Sidebar() {
	const routerUrls = [
		{ url: 'problem-1', label: 'Problem 01' },
		{ url: 'problem-2', label: 'Problem 02' },
		{ url: 'problem-3', label: 'Problem 03' },
	]

	return (
		<div className="hidden flex-col justify-between w-3xs p-3 h-screen border-r md:flex">
			<div className="flex flex-col gap-4">
				{routerUrls.map((item) => {
					return (
						<Link key={item.label} className="w-full" to={{ pathname: item.url }}>
							<Button variant="outline" className="w-full">
								{item.label}
							</Button>
						</Link>
					)
				})}
			</div>

			<ModeToggle />
		</div>
	)
}

export default Sidebar
