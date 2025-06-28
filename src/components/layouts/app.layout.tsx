import { Outlet } from 'react-router'
import Sidebar from '../sidebar'
import TanstackQueryClientProvider from '../providers/query-provider'
import { ThemeProvider } from '../providers/theme-provider'
import '../../index.css'

function AppLayout() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
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
		</ThemeProvider>
	)
}

export default AppLayout
