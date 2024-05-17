import DescriptionList from '../description-list/DescriptionList.tsx'
import { useMemo } from 'react'
import { AnalyzeResultItemDto } from '../../client'
import { Typography } from '@material-tailwind/react'

export function FactsSummary({ items, loading }: { items: AnalyzeResultItemDto[]; loading?: boolean }) {
    const TotalStats = useMemo(() => {
        return {
            cal: items.reduce((acc, item) => acc + item.cal, 0),
            carbs: items.reduce((acc, item) => acc + item.carbs, 0),
            fat: items.reduce((acc, item) => acc + item.fat, 0),
            protein: items.reduce((acc, item) => acc + item.protein, 0),
            weight: items.reduce((acc, item) => acc + item.weight, 0),
        }
    }, [items])

    const formatNumber = (num: number) => (num % 1 !== 0 ? num.toFixed(2) : num.toString())

    const DescriptionItem = (value: string) => {
        if (loading) {
            return (
                <Typography
                    as="div"
                    variant="h1"
                    className="mb-4 h-3 my-auto w-full rounded-full bg-gray-300 animate-pulse"
                >
                    &nbsp;
                </Typography>
            )
        }

        return value
    }

    return (
        <>
            <Typography variant="h5" color="blue-gray" className={'mb-4'}>
                Summary
            </Typography>
            <div className={'grid grid-cols-2 mb-4'}>
                <DescriptionList
                    items={[
                        { name: 'Carbs', value: DescriptionItem(`${formatNumber(TotalStats.carbs)} g`) },
                        { name: 'Fat', value: DescriptionItem(`${formatNumber(TotalStats.fat)} g`) },
                        { name: 'Protein', value: DescriptionItem(`${formatNumber(TotalStats.protein)} g`) },
                    ]}
                ></DescriptionList>
                <DescriptionList
                    items={[
                        { name: 'Weight', value: DescriptionItem(`${formatNumber(TotalStats.weight)} g`) },
                        { name: 'Calories', value: DescriptionItem(`${formatNumber(TotalStats.cal)} kcal`) },
                    ]}
                ></DescriptionList>
            </div>
        </>
    )
}
