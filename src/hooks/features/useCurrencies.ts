import { useQuery } from '@tanstack/react-query'
import { getAllCurrencies, getExchangeRateByCurrency } from '../../services/currencies.service'

export const useCurrencies = () => {
	const useCurreniesQuery = () =>
		useQuery({
			queryKey: ['use_get_all_currencies_query'],
			queryFn: async () => {
				return await getAllCurrencies()
			},
			staleTime: 3 * 60 * 60 * 1000,
		})

	const useExchangeCurrencyRateQuery = ({ from, to }: { from: string; to: string }) =>
		useQuery({
			queryKey: ['use_exchange_currency_rate_query', from, to],
			queryFn: async () => {
				if (!from) return null
				return await getExchangeRateByCurrency({ from, to })
			},
			staleTime: 0,
			enabled: !!from && !!to,
		})

	return { useCurreniesQuery, useExchangeCurrencyRateQuery }
}
