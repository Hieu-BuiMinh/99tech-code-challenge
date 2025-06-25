import { useQuery } from '@tanstack/react-query'
import { getAllCurrencies, getExchangeRateByCurrency } from '../../services/currencies.service'

export const useCurrencies = ({ countryCode }: { countryCode?: string }) => {
	const curreniesQuery = useQuery({
		queryKey: [''],
		queryFn: async () => {
			return await getAllCurrencies()
		},
		staleTime: 3 * 60 * 60 * 1000,
	})

	const exchangeCurrencyRateQuery = useQuery({
		queryKey: [''],
		queryFn: async () => {
			if (!countryCode) return null
			return await getExchangeRateByCurrency({ countryCode })
		},
		staleTime: 3 * 60 * 60 * 1000,
		enabled: !!countryCode,
	})
	return { curreniesQuery, exchangeCurrencyRateQuery }
}
