import { ReactElement } from 'react'

type DescriptionListItem = {
    name: string
    value: string | ReactElement
}

export default function DescriptionList({ items }: { items: DescriptionListItem[] }) {
    return (
        <dl className="divide-y divide-gray-100">
            {items.map((item, index) => (
                <div key={index} className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2">
                    <dt className="text-sm font-medium leading-6 text-gray-900">{item.name}</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 flex">{item.value}</dd>
                </div>
            ))}
        </dl>
    )
}
