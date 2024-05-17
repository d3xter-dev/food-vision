export function AppTitle({ className }: { className: string }) {
    return (
        <div className={'flex-col justify-center ' + className}>
            <h1 className={'text-4xl font-bold'}>Food-Analyzer 🍔</h1>
            <p className={'text-lg'}>Upload an image to get nutrition facts!</p>
        </div>
    )
}
