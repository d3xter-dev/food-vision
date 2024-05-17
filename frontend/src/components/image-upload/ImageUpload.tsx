import { useDropzone } from 'react-dropzone'
import React, { useCallback, useState } from 'react'

type ImageUploadProps = {
    onImageUpload: (file: File) => void
} & React.ComponentProps<'div'>

export default function ImageUpload(props: ImageUploadProps) {
    const [preview, setPreview] = useState<string | undefined>()

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const reader = new FileReader()
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                setPreview(reader.result)
                return
            }
        }

        acceptedFiles.forEach((file) => {
            reader.readAsDataURL(file)
            props.onImageUpload(file)
        })
    }, [])

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.png', '.jpg', '.webp', '.avif', '.gif'],
        },
    })

    return (
        <>
            <section
                {...getRootProps()}
                className={`rounded-lg border bg-gray-300 flex flex-col items-center justify-center relative cursor-pointer group ${props.className}`}
            >
                {preview && <img alt={'Preview'} src={preview} className={'h-full w-full object-cover rounded-lg'} />}

                <div
                    className={`${preview ? 'opacity-0' : 'opacity-100'} group-hover:opacity-100 transition-opacity absolute bg-gray-50/40 h-full w-full flex justify-center items-center rounded-lg px-6 text-center`}
                >
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some image here, or click to select an image</p>
                </div>
            </section>
        </>
    )
}
