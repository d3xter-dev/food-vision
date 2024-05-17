import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input } from '@material-tailwind/react'
import { AnalyzeResultItemDto } from '../../client'
import { ChangeEvent, useState } from 'react'

type FactsEditDialogProps = {
    item: AnalyzeResultItemDto
    setItem: (item: AnalyzeResultItemDto | undefined) => void
    onSave: (item: AnalyzeResultItemDto) => void
}

export function FactsEditDialog({ item, setItem, onSave }: FactsEditDialogProps) {
    const [model, setModel] = useState<AnalyzeResultItemDto>(item)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        switch (e.target.type) {
            case 'number':
                setModel({ ...model, [e.target.name]: isNaN(e.target.valueAsNumber) ? 0 : e.target.valueAsNumber })
                break
            default:
                setModel({ ...model, [e.target.name]: e.target.value })
                break
        }
    }

    const close = () => {
        setItem(undefined)
    }

    const InputSuffix = (text: string) => <span className="text-gray-500 text-sm">{text}</span>

    return (
        <Dialog size={'xs'} open={item != undefined} handler={close}>
            <DialogHeader>Edit Item</DialogHeader>
            <DialogBody>
                <div className={'flex flex-col gap-4'}>
                    <Input defaultValue={item.name} onChange={handleChange} name={'name'} type="text" label="Name" />

                    <div className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
                        <Input
                            defaultValue={item.carbs}
                            onChange={handleChange}
                            name={'carbs'}
                            type="number"
                            icon={InputSuffix('g')}
                            label="Carbs"
                        />

                        <Input
                            defaultValue={item.fat}
                            onChange={handleChange}
                            min={0}
                            name={'fat'}
                            type="number"
                            icon={InputSuffix('g')}
                            label="Fat"
                        />

                        <Input
                            defaultValue={item.protein}
                            onChange={handleChange}
                            min={0}
                            name={'protein'}
                            type="number"
                            icon={InputSuffix('g')}
                            label="Protein"
                        />

                        <Input
                            defaultValue={item.weight}
                            onChange={handleChange}
                            min={0}
                            name={'weight'}
                            type="number"
                            icon={InputSuffix('g')}
                            label="Weight"
                        />

                        <Input
                            defaultValue={item.cal}
                            onChange={handleChange}
                            min={0}
                            name={'cal'}
                            type="number"
                            icon={InputSuffix('kcal')}
                            label="Calories"
                        />
                    </div>
                </div>
            </DialogBody>

            <DialogFooter className={'gap-1'}>
                <Button variant="text" onClick={close}>
                    Cancel
                </Button>
                <Button onClick={() => onSave(model)}>Confirm</Button>
            </DialogFooter>
        </Dialog>
    )
}
