import LoadingUI from './LoadingUI'

export default function Loading() {
  return (
    <div className="flex size-full min-h-[100svh] flex-col items-center justify-center gap-6 text-primary">
      <LoadingUI />
      <p className="text-2xl">Loading data......</p>
    </div>
  )
}
