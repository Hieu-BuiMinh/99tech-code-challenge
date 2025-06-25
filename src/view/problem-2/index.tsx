import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { useCurrencies } from '../../hooks/features/useCurrencies'

function Problem2() {
	// fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`)
	// 	.then((response) => response.json())
	// 	.then((data) => {
	// 		console.log(data.conversion_rates.EUR) // Tỷ giá USD -> EUR
	// 	})
	// 	.catch((error) => console.error('Error:', error))

	// const [amount, setAmount] = useState(100)
	// const [fromCurrency, setFromCurrency] = useState('USD')
	// const [toCurrency, setToCurrency] = useState('INR')

	const { curreniesQuery } = useCurrencies({})
	console.log(curreniesQuery?.data)

	return (
		<div className="">
			<p className="text-xl font-semibold">Problem 2: Currency Swap Form</p>

			<div className="">
				<Select>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Select a fruit" />
					</SelectTrigger>
					<SelectContent align="center" className="max-h-72">
						<SelectGroup>
							{curreniesQuery?.data?.supported_codes?.map((currency) => {
								return (
									<SelectItem className="" value={currency?.[0]}>
										{currency?.[1]}
									</SelectItem>
								)
							})}
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
		</div>
	)
}

export default Problem2
