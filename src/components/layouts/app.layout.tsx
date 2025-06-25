import { Outlet } from 'react-router'
import Sidebar from '../sidebar'
import TanstackQueryClientProvider from '../providers/query-provider'

function AppLayout() {
	return (
		<TanstackQueryClientProvider>
			<div className="flex items-center justify-center w-screen min-h-screen">
				<div className="size-full flex">
					<Sidebar />
					<div className="p-5 w-full">
						<Outlet />
					</div>
				</div>
			</div>
		</TanstackQueryClientProvider>
	)
}

export default AppLayout
