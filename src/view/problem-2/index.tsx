import { Link } from 'react-router'
import CurrencySwapForm from './components/currency-swap-form'

function Problem2() {
	return (
		<div className="flex flex-col gap-7">
			<div className="flex flex-col gap-7 items-center">
				<p className="text-xl font-semibold truncate w-full p-2">Problem 2: Currency Swap Form</p>

				<CurrencySwapForm />
			</div>
			<Link
				to="https://www.exchangerate-api.com/docs/supported-codes-endpoint"
				target="_blank"
				className="text-muted-foreground underline text-xs"
			>
				Further information in exchangerate-api
			</Link>
		</div>
	)
}

export default Problem2
