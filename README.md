# yeeway.dev
Alex Su's personal website, https://yeeway.dev

## Getting Started
```bash
git clone https://github.com/yeeway0609/yeeway.dev.git
cd yeeway.dev
bun i
bun dev
```
## Tech stack
- 框架：Next.js 14 (App Router)
- 樣式：Tailwind CSS, Shadcn-ui

## Feature
- [x] 部落格
  - 使用此 GitHub repo 的 Issue 作為資料庫，並串接 GitHub GraphQL API。
  - [ ] 作者在登入後能夠「瀏覽」、「新增」、「更新」部落格貼文，並「瀏覽」留言;
  - [ ] 非作者在登入後僅能「瀏覽」文章與留言。（未來將新增留言功能）
- [x] 線上環境部署
  - 使用 Vercel: https://yeeway.dev
- [x] Dark mode
  - 使用 next-theme 套件搭配 Tailwind CSS 與 Shadcn-ui，實作深色與亮色兩種模式的 UI

### To do
- [ ] 部落格貼文留言功能
  - 串接 GitHub GraphQL API，讓使用者可以在網站上直接新增留言
- [ ] 音樂播放器
- [ ] 個人名片
- [ ] 優化
  - [ ] Core Web Vitals
  - [ ] SEO
    - [ ] Google Search Console
    - [ ] Google Analytics
    - [ ] Google Tag Manager

## 參考資料
- [Using pagination in the GitHub GraphQL API](https://docs.github.com/en/graphql/guides/using-pagination-in-the-graphql-api)

