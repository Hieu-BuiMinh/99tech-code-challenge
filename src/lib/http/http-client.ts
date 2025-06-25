/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosError, AxiosResponse } from 'axios'

import { AxiosBuilder } from './axios-builder'

export interface IHttpResponseDto<T> {
	data: T
	status: number
	statusText: string
	[key: string]: any
}

const baseUrl = import.meta.env.VITE_BASE_API_URL

const axiosBuilder = new AxiosBuilder()
	.setBaseUrl(baseUrl)
	.addInterceptor(async (config: any) => {
		config.params = {
			...config.params,
		}

		return config
	})
	.setResponseInterceptor(async (response: AxiosResponse<IHttpResponseDto<any>, any>) => {
		if (response.status === 200) {
			if (typeof window !== 'undefined') {
				if (response?.data?.statusCode === 500) {
					window.location.href = '/500'
				}
			}
			return response.data
		}
		return response
	})
	.setErrorInterceptor(async (error: AxiosError<any, any>) => {
		console.log('Axios error: ', error)
		return error
	})
	.build()
export const httpClient = axiosBuilder
