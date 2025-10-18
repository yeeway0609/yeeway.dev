import { Metadata } from 'next'
import { MyAvatar } from '@/components/MyAvatar'

export const metadata: Metadata = {
  title: 'About Me',
}

export default async function Page() {
  const { default: AboutContent } = await import(`@/content/about.mdx`)

  return (
    <main className="layout-container mt-8 pb-20">
      <div className="flex flex-col items-start justify-between sm:flex-row-reverse sm:gap-6">
        <MyAvatar />
        <div>
          <h1 className="text-5xl font-black tracking-wider">
            About <span className="name-gradient">Yiwei Su</span>
          </h1>

          <p className="mt-4 sm:max-w-3xl">
            來自台灣的高雄市，興趣是 ACG、K-pop 與閱讀。目前專注於網頁全端技術與 UI 設計研究，放假時也喜歡逛逛展覽或參與社群小聚與研討會。
            <br />
            <br />
            我的個性樂於分享，想成為有一點點影響力的人也好，喜觀幫助他人解決大大小小的煩惱。 期許自己成為文化內涵與理性知識兼容並蓄的人類。 🥸
          </p>
        </div>
      </div>

      <AboutContent />
    </main>
  )
}
