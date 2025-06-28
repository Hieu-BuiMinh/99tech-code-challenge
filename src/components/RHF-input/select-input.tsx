'use client'

import { useFormContext } from 'react-hook-form'
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '../ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

interface IRHFSelect {
	name: string
	label?: string
	placeholder?: string
	description?: string
	options?: { label: string; value: string }[]
}

export function RHFSelect({ name, label, options, placeholder, description }: IRHFSelect) {
	const methods = useFormContext()

	return (
		<FormField
			control={methods.control}
			name={name}
			render={({ field }) => (
				<FormItem className="w-full">
					<FormLabel>{label}</FormLabel>
					<Select onValueChange={field.onChange} defaultValue={field.value}>
						<FormControl>
							<SelectTrigger className="w-full">
								<SelectValue placeholder={placeholder} />
							</SelectTrigger>
						</FormControl>
						<SelectContent className="max-h-72">
							{options?.map((item) => {
								return (
									<SelectItem key={item.value} value={item.value}>
										{item.label}
									</SelectItem>
								)
							})}
						</SelectContent>
					</Select>
					{description && <FormDescription>{description}</FormDescription>}
				</FormItem>
			)}
		/>
	)
}
