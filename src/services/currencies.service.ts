import { httpClient } from '../lib/http'
import type { CurrenriesListData, ExchangeRateByCurrencyData } from '../types/currencies.type'

/*
	on this site I use: https://www.exchangerate-api.com/docs/supported-currencies
	with api key: https://app.exchangerate-api.com/dashboard/confirmed
*/

export const getAllCurrencies = async () => {
	return (await httpClient.get(`/codes`)) as CurrenriesListData
}
export const getExchangeRateByCurrency = async ({ from, to }: { from: string; to: string }) => {
	return (await httpClient.get(`/pair/${from}/${to}`)) as ExchangeRateByCurrencyData
}
