# yeeway.dev

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
- 檔案架構
  邏輯層 (lib) 與介面層 (app, components) 分離設計，以便提高程式碼的可重用性、可維護性與可擴展性。
  ```
  ├── src
  │   ├── app
  │   │   ├── blog
  │   │   │   ├── [slug]
  │   │   │   │   └── page.tsx // (文章頁面)
  │   │   │   ├── LoadPosts.tsx (載入更多貼文的元件)
  │   │   │   └── page.tsx (文章列表頁面)
  │   │   ├── projects
  │   │   │   └── page.tsx (我的專案介紹頁面)
  │   │   ├── about
  │   │   │   └── page.tsx (自我介紹頁面)
  │   │   ├── api/auth/[...nextauth]
  │   │   │   └── route.ts (存放 next-auth 的 handler)
  │   │   ├── page.tsx
  │   │   ├── layout.tsx
  │   │   ├── global.css （Tailwind CSS 與自定義 CSS）
  │   │   └── (logo 等其他檔案)
  │   ├── components
  │   │   ├── ui
  │   │   │   └── (shadcn-ui 元件庫.tsx)
  │   │   └── (各種自定義元件.tsx)
  │   ├── lib
  │   │   ├── actions.ts (存放資料庫「更新、修改、刪除」指令相關函式，此專案使用 GraphQL)
  │   │   ├── auth.ts (存放使用者驗證相關函式，此專案使用 GitHub OAuth 與 next-auth)
  │   │   ├── fetchers.ts (存放資料庫「獲取」指令相關函式，此專案使用 GraphQL)
  │   │   ├── types.ts (存放 TypeScript 型別)
  │   │   ├── utils.ts (存放一些通用的輔助函式)
  │   │   └── Providers.tsx (提供全域狀態管理的容器，此專案用於 next-theme 的主題與 next-auth 的 session)
  │   ├── data
  │   │   └── projectsData (專案頁的資料)
  │   └── middleware.ts (進入網站後導向到部落格頁)
  ├── public (存放圖片)
  ├── node_modules
  ├── package.json
  └── ...
  ```

## Feature
### 部落格
- 使用此 GitHub repo 的 issue 作為貼文資料庫，並串接 GitHub GraphQL API 讀取文章。
- 「文章列表」頁面：
  - 撰寫 GraphQL query 時限定只有 status 為 OPEN 以及創建者為專案擁有者的文章才會被讀取，以免其他用戶在此專案新建 issue 時也被呈現到網站上。每次查詢只會回傳十筆資料與 page cursor，每當列表滾到底部時發送 API 請求，直到沒有更多文章。GraphQL 相關程式碼在 [src/lib/fetcher.ts](https://github.com/yeeway0609/yeeway.dev/blob/main/src/lib/fetchers.ts)。
- 「貼文」頁面：
  - 撰寫 GraphQL query 時抓取該筆 issue的標題、內文、標籤與留言等等資料，並呈現在畫面上。不管用戶有沒有登入都可以瀏覽文章與留言。GraphQL 相關程式碼在 [src/lib/fetcher.ts](https://github.com/yeeway0609/yeeway.dev/blob/main/src/lib/fetchers.ts)。

### 線上環境部署
使用 Vercel 部署: https://yeeway.dev

### 設計系統與 Dark mode
使用 next-theme 套件搭配 Tailwind CSS 與 Shadcn-ui，實作深色與亮色兩種模式的 UI

## 參考資料
- [Using pagination in the GitHub GraphQL API](https://docs.github.com/en/graphql/guides/using-pagination-in-the-graphql-api)
- [How to Build a Multi-Tenant App with Custom Domains Using Next.js](https://vercel.com/guides/nextjs-multi-tenant-application)

