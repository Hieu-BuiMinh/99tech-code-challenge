import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import './index.css'
import { appRoute } from './routes/route.ts'

createRoot(document.getElementById('root')!).render(<RouterProvider router={appRoute} />)
