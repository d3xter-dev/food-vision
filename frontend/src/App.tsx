import './index.css'
import ImageUpload from './components/image-upload/ImageUpload.tsx'
import { Alert, Card, CardBody, CardHeader } from '@material-tailwind/react'
import { useState } from 'react'
import { AnalyzeResultItemDto, DefaultService } from './client'
import { AppTitle } from './components/AppTitle.tsx'
import { FactsTable } from './components/facts/FactsTable.tsx'
import { FactsSummary } from './components/facts/FactsSummary.tsx'
import { FactsEditDialog } from './components/facts/FactsEditDialog.tsx'

type Status<T extends string> = { status: T }

type StatusInitial = Status<'initial'>
type StatusLoading = Status<'loading'>
type StatusError = Status<'error'> & { error: string }
type StatusSuccess<T> = Status<'success'> & { data: T }

export type RequestStatus<T> = StatusLoading | StatusError | StatusInitial | StatusSuccess<T>

function App() {
    const [state, setState] = useState<RequestStatus<AnalyzeResultItemDto[]>>({ status: 'initial' })
    const [selectedItem, setSelectedItem] = useState<AnalyzeResultItemDto | undefined>()

    const onImageUpload = async (file: File) => {
        setState({ status: 'loading' })

        try {
            const res = await DefaultService.analyze({ formData: { file } })
            setState({ status: 'success', data: res.items })
        } catch (_) {
            setState({ status: 'error', error: 'Some error occurred. Please try again later.' })
        }
    }

    const onSave = (item: AnalyzeResultItemDto) => {
        if (state.status !== 'success') return

        const index = state.data.findIndex((i) => i.id === item.id)
        const newData = [...state.data]
        newData[index] = item

        setState({ status: 'success', data: newData })
        setSelectedItem(undefined)
    }

    return (
        <>
            <div
                className={'max-w-screen-lg m-auto flex flex-col gap-8 justify-center min-h-screen px-4 lg:px-0 py-12'}
            >
                <div
                    className={
                        'flex flex-col lg:flex-row-reverse gap-8 columns-2 flex-grow lg:flex-grow-0 justify-center lg:justify-end'
                    }
                >
                    <AppTitle className={'flex'}></AppTitle>
                    <ImageUpload className={'w-full lg:w-1/2 h-96'} onImageUpload={onImageUpload} />
                </div>

                {selectedItem && (
                    <FactsEditDialog item={selectedItem} setItem={setSelectedItem} onSave={onSave}></FactsEditDialog>
                )}

                {state.status !== 'initial' && (
                    <Card className={'py-4'}>
                        <CardHeader floated={false} shadow={false} className={'rounded-none mt-0'}>
                            {(() => {
                                switch (state.status) {
                                    case 'loading':
                                        return <FactsSummary loading={true} items={[]}></FactsSummary>
                                    case 'error':
                                        return <Alert color={'red'}>{state.error}</Alert>
                                    case 'success':
                                        return <FactsSummary items={state.data}></FactsSummary>
                                }
                            })()}
                        </CardHeader>
                        <CardBody className={'py-0 px-0 overflow-x-scroll overflow-y-hidden'}>
                            {(() => {
                                switch (state.status) {
                                    case 'loading':
                                        return (
                                            <FactsTable loading={true} items={[]} onEdit={setSelectedItem}></FactsTable>
                                        )
                                    case 'success':
                                        return <FactsTable items={state.data} onEdit={setSelectedItem}></FactsTable>
                                    default:
                                        return <></>
                                }
                            })()}
                        </CardBody>
                    </Card>
                )}
            </div>
        </>
    )
}

export default App
