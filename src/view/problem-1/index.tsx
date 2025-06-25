import { useState } from 'react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'

function Problem1() {
	const [amount, setAmount] = useState(0)
	const [results, setResults] = useState({
		num01: 0,
		num02: 0,
		num03: 0,
	})

	// using for loop
	const sumToNumber01 = (n: number): number => {
		let sum = 0
		for (let i = 1; i <= n; i++) {
			sum += i
		}
		return sum
	}

	// using recursion
	const sumToNumber02 = (n: number): number => {
		if (n <= 0) return 0
		return n + sumToNumber02(n - 1)
	}

	// using array reduce
	const sumToNumber03 = (n: number): number => {
		return [...new Array(n)].map((_, i) => i + 1).reduce((acc, res) => res + acc, 0)
	}

	// handler for calculating sum
	const handleCalculation = (sumFunction: (n: number) => number, key: keyof typeof results) => {
		setResults((prevResults) => ({
			...prevResults,
			[key]: sumFunction(amount),
		}))
	}

	return (
		<div className="flex flex-col gap-4">
			<p className="text-xl font-semibold">Problem 1: Three Ways To Sum 0 To {amount}</p>

			<Input
				className="max-w-52"
				value={amount}
				onChange={(event) => setAmount(Number(event.target.value))}
				type="number"
			/>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-4">
				<div className="col-span-1 flex flex-col gap-3">
					<span>Function 01 result: {results.num01}</span>
					<Button onClick={() => handleCalculation(sumToNumber01, 'num01')}>func 01</Button>
				</div>

				<div className="col-span-1 flex flex-col gap-3">
					<span>Function 02 result: {results.num02}</span>
					<Button onClick={() => handleCalculation(sumToNumber02, 'num02')}>func 02</Button>
				</div>

				<div className="col-span-1 flex flex-col gap-3">
					<span>Function 03 result: {results.num03}</span>
					<Button onClick={() => handleCalculation(sumToNumber03, 'num03')}>func 03</Button>
				</div>
			</div>

			<p className='text-muted-foreground'>45 mins to complete</p>
		</div>
	)
}

export default Problem1
