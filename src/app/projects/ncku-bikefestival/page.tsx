import type { Metadata } from 'next'
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '[作品集] 成大單車節 形象網站 | Alex Su\'s Blog'
  }
}

export default async function Page() {
  return (
    <div className="markdown">
      <div className="mt-2 flex">
      </div>
      <h1 className="my-4 text-3xl font-bold sm:my-8 sm:text-5xl">成大單車節 形象網站</h1>
      時間
      角色：
      單位

      <hr className="mb-5 mt-2" />
      <h2>專案背景</h2>
    </div>
  )
}
