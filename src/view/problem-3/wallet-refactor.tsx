/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, type ReactNode } from 'react'

interface WalletBalance {
	currency: string
	amount: number
	blockchain: string
}

interface FormattedWalletBalance extends WalletBalance {
	formatted: string
}

interface Props {
	children?: ReactNode
	[key: string]: any
}

const useWalletBalances = (): WalletBalance[] => {
	return [{ amount: 1, blockchain: 'abc_001', currency: 'USD' }]
}

const usePrices = (): Record<string, number> => {
	return { USD: 1.2 }
}

export const WalletPage: React.FC<Props> = (props: Props) => {
	const { children, ...rest } = props
	const balances = useWalletBalances()
	const prices = usePrices()

	const getPriority = (blockchain: string): number => {
		switch (blockchain) {
			case 'Osmosis':
				return 100
			case 'Ethereum':
				return 50
			case 'Arbitrum':
				return 30
			case 'Zilliqa':
				return 20
			case 'Neo':
				return 20
			default:
				return -99
		}
	}

	const filteredBalances = balances.filter((balance: WalletBalance) => balance.amount > 0)

	const formattedBalances = useMemo(() => {
		return filteredBalances
			.map((balance: WalletBalance) => ({
				...balance,
				priority: getPriority(balance.blockchain),
				formatted: balance.amount.toFixed(2),
			}))
			.sort((lhs, rhs) => rhs.priority - lhs.priority)
	}, [filteredBalances])

	const rows = formattedBalances.map((balance: FormattedWalletBalance) => {
		const usdValue = prices[balance.currency] * balance.amount
		return (
			<WalletRow
				className=""
				key={`${balance.blockchain}-${balance.currency}`}
				amount={balance.amount}
				usdValue={usdValue}
				formattedAmount={balance.formatted}
			/>
		)
	})

	return <div {...rest}>{rows}</div>
}

interface WalletRowProps {
	className: string
	amount: number
	usdValue: number
	formattedAmount: string
}

const WalletRow: React.FC<WalletRowProps> = ({ className, amount, usdValue, formattedAmount }) => {
	return (
		<div className={className}>
			<div className="wallet-row">
				<div className="wallet-info">
					<div className="amount">
						<strong>Amount:</strong> {formattedAmount} {amount > 0 ? 'USD' : 'Currency'}
					</div>
					<div className="usd-value">
						<strong>USD Value:</strong> {usdValue.toFixed(2)}
					</div>
				</div>
			</div>
		</div>
	)
}

/*
1. Redundant useMemo Calculation:
Desc: The sortedBalances calculation is wrapped in useMemo, but it includes redundant filtering and sorting operations.

Inefficiency: The code performs filtering and sorting every time the component renders, even if the balances array has not changed, leading to unnecessary recalculations.

2. Inefficient Filtering Logic:
Desc: The filter condition inside sortedBalances is confusing and incomplete. Specifically, lhsPriority > -99 is checked before other conditions, but it doesn't seem to work as intended due to the missing check for balance.amount <= 0.

Inefficiency: The filter condition is unclear, and it may result in unexpected behavior.

3. Unnecessary toFixed Conversion:
Desc: In the formattedBalances array, balance.amount.toFixed() is used to convert the amount into a string with no decimal places.

Inefficiency: If the formatted field is purely for display purposes, converting it to a string format might not be necessary unless there's a specific requirement to present the number as a string.

4. Over-using Array Mapping:
Desc: The code applies map twice: once for sortedBalances to format the data and again to render rows. This leads to unnecessary re-renders or computations of the same data multiple times.

Inefficiency: You could combine both map operations into one to optimize performance.

5. Non-Optimal Sort Logic:
Desc: The sort function is called after filter, but it's also an expensive operation. Sorting every time based on the blockchain priority might not be optimal if the list doesn't change frequently.

Inefficiency: Sorting should be memoized or performed less frequently.

6. Key Prop in Rendered Rows:
Desc: key={index} is used in the rendered rows. Using array indices as key is an anti-pattern because React expects the key to be a stable identifier that helps React efficiently reconcile the list. Using indices as a key can cause issues when the list changes dynamically.

Anti-pattern: Use a unique identifier for each balance item, such as balance.currency or another unique field.
*/
