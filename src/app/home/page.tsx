import { GithubIconMingcute, LinkedinIconMingcute, MailIconMingcute } from '@/assets/svg-icons'
import CoolAvatar from '@/components/home/CoolAvatar'
import SplitTitle from '@/components/home/SplitTitle'
import { Contact } from '@/lib/constants'

export default function Page() {
  return (
    <main className="flex flex-col items-center pt-10 md:pt-16">
      <CoolAvatar />

      <SplitTitle className="mt-5" />

      <div className="mt-8 text-sm">
        <p>
          我是蘇奕幃，也可以叫我 Alex 或 yeeway。來自台灣的高雄市，興趣是 ACG、K-pop 與閱讀。 目前深耕於網頁前端技術與 UI
          設計研究，空餘時間也喜歡逛逛展覽或參與社群小聚與研討會。
        </p>

        <p className="mt-3">
          我的個性樂於分享，未來想成為稍微有影響力的人，並且幫助他人解決大大小小的煩惱。 期許自己成為文化內涵與理論技術兼容並蓄的人類。
        </p>

        <ul className="mt-5 flex flex-col gap-y-3">
          <li className="flex items-center gap-x-2.5">
            <MailIconMingcute className="size-5" />
            <a
              className="-mt-0.5 text-gray-500 underline underline-offset-3 hover:text-gray-800 hover:decoration-2 focus:decoration-2 focus:outline-hidden dark:text-neutral-400 dark:hover:text-neutral-400"
              href={`mailto:${Contact.EMAIL}`}
            >
              hi@yeeway.dev
            </a>
          </li>

          <li className="flex items-center gap-x-2.5">
            <GithubIconMingcute className="size-5" />
            <a
              className="-mt-0.5 text-gray-500 underline underline-offset-3 hover:text-gray-800 hover:decoration-2 focus:decoration-2 focus:outline-hidden dark:text-neutral-400 dark:hover:text-neutral-400"
              href={Contact.GITHUB}
            >
              @yeeway0609
            </a>
          </li>

          <li className="flex items-center gap-x-2.5">
            <LinkedinIconMingcute className="size-5" />
            <a
              className="-mt-0.5 text-gray-500 underline underline-offset-3 hover:text-gray-800 hover:decoration-2 focus:decoration-2 focus:outline-hidden dark:text-neutral-400 dark:hover:text-neutral-400"
              href={Contact.LINKEDIN}
            >
              @yi-wei-su
            </a>
          </li>
        </ul>
      </div>
    </main>
  )
}
