import LoadingUI from './LoadingUI'

export default function Loading() {
  return (
    <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center pt-16">
      {/* TODO: pt-16 要抽成 header 高度變數 */}
      <LoadingUI />
      <p className="mt-6 text-2xl text-primary">Loading data......</p>
    </div>
  )
}
