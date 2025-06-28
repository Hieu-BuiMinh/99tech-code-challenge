import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowDownUp, ArrowRightLeft, Loader } from 'lucide-react'
import numeral from 'numeral'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { RHFSelect } from '../../../components/RHF-input/select-input'
import { RHFInput } from '../../../components/RHF-input/text-input'
import { useCurrencies } from '../../../hooks/features/useCurrencies'
import { Button } from '../../../components/ui/button'

const FormSchema = z.object({
	amount: z.string().min(1, { message: 'Input amount' }),
	from: z.string().min(1, { message: 'Select a currency' }),
	to: z.string().min(1, { message: 'Select a currency' }),
})

type TFormSchema = z.infer<typeof FormSchema>

function CurrencySwapForm() {
	const methods = useForm<TFormSchema>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			amount: '0',
			from: '',
			to: '',
		},
	})

	const [convertedAmount, setConvertedAmount] = useState(0)

	const amountValue = methods.watch('amount')
	const fromValue = methods.watch('from')
	const toValue = methods.watch('to')

	const { useCurreniesQuery, useExchangeCurrencyRateQuery } = useCurrencies()

	const { data: currenciesQueryData } = useCurreniesQuery()
	const { data: exchangeCurrencyRateData, isLoading: exchangeCurrencyRateIsLoading } = useExchangeCurrencyRateQuery({
		from: fromValue,
		to: toValue,
	})

	const currentciesSelectOptions = currenciesQueryData?.supported_codes?.map((currency) => {
		return { label: currency?.[1], value: currency?.[0] }
	})

	const onSubmit = () => {
		calculatingRate()
	}

	const calculatingRate = () => {
		if (exchangeCurrencyRateData?.conversion_rate && amountValue) {
			setConvertedAmount(() => {
				return exchangeCurrencyRateData?.conversion_rate * Number(amountValue)
			})
		}
	}

	const formatCurrency = (amount: number) => {
		return numeral(amount).format('0,0.00')
	}

	useEffect(() => {
		calculatingRate()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fromValue, toValue, amountValue, exchangeCurrencyRateData?.conversion_rate])

	return (
		<div className="w-full max-w-2xl rounded-md p-3 border">
			<p className="font-bold text-2xl text-center">Currency Converter</p>
			<FormProvider {...methods}>
				<form className="flex flex-col gap-4" onSubmit={methods.handleSubmit(onSubmit)}>
					<RHFInput type="number" name="amount" label="Amount" placeholder="Enter amount" />
					<div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-end">
						<RHFSelect
							name="from"
							label="From"
							options={currentciesSelectOptions}
							placeholder="Select a currency to exchange"
						/>
						<div className="flex items-center justify-center p-2 rounded-full border size-10">
							<ArrowRightLeft />
						</div>
						<RHFSelect
							name="to"
							label="To"
							options={currentciesSelectOptions}
							placeholder="Select a currency to exchange"
						/>
					</div>

					<Button className="w-full">Get Exchange Rate</Button>

					<div className="p-4 flex flex-col gap-5 items-center justify-center border rounded-md bg-foreground/10">
						<div className="flex gap-3 text-2xl">
							<span className="font-bold">{formatCurrency(+amountValue)}</span>
							{fromValue && <span>{fromValue}</span>}
						</div>
						<div className="flex items-center justify-center p-2 rounded-full border size-10">
							{exchangeCurrencyRateIsLoading ? <Loader className="animate-spin" /> : <ArrowDownUp />}
						</div>
						<div className="flex gap-3 text-2xl">
							<span className="font-bold">{formatCurrency(+convertedAmount)}</span>
							{toValue && <span>{toValue}</span>}
						</div>
					</div>
				</form>
			</FormProvider>
		</div>
	)
}

export default CurrencySwapForm
