import { AnalyzeResultItemDto } from '../../client'
import { Table } from '../table/Table.tsx'
import { Button, Typography } from '@material-tailwind/react'

type FactsTableProps = {
    loading?: boolean
    items: AnalyzeResultItemDto[]
    onEdit: (item: AnalyzeResultItemDto) => void
}

export function FactsTable({ loading, items, onEdit }: FactsTableProps) {
    const EditButton = (item: AnalyzeResultItemDto) => (
        <Button size={'sm'} variant={'outlined'} onClick={() => onEdit(item)}>
            Edit
        </Button>
    )

    return (
        <Table<AnalyzeResultItemDto>
            loading={loading}
            rows={items}
            columns={[
                { title: 'Name', key: 'name' },
                {
                    title: 'Carbs',
                    key: 'carbs',
                    component: ({ item }) => <Typography variant={'small'}>{item.carbs} g</Typography>,
                },
                {
                    title: 'Cal',
                    key: 'cal',
                    component: ({ item }) => <Typography variant={'small'}>{item.cal} kcal</Typography>,
                },
                {
                    title: 'Fat',
                    key: 'fat',
                    component: ({ item }) => <Typography variant={'small'}>{item.fat} g</Typography>,
                },
                {
                    title: 'Protein',
                    key: 'protein',
                    component: ({ item }) => <Typography variant={'small'}>{item.protein} g</Typography>,
                },
                {
                    title: 'Weight',
                    key: 'weight',
                    component: ({ item }) => <Typography variant={'small'}>{item.weight} g</Typography>,
                },
                { title: 'Edit', key: 'edit', className: 'w-4', component: ({ item }) => EditButton(item) },
            ]}
        ></Table>
    )
}
