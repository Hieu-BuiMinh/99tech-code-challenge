'use client'

import { useFormContext } from 'react-hook-form'

import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import type { HTMLInputTypeAttribute } from 'react'

interface IRHFInput {
	name: string
	label?: string
	placeholder?: string
	description?: string
	type?: HTMLInputTypeAttribute
}

export function RHFInput({ name, description, label, placeholder, type }: IRHFInput) {
	const methods = useFormContext()

	return (
		<FormField
			control={methods.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Input type={type} placeholder={placeholder} {...field} />
					</FormControl>
					<FormDescription>{description}</FormDescription>
				</FormItem>
			)}
		/>
	)
}
