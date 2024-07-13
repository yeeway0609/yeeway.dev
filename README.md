# yeeway.dev - Personal Website of Yiwei Su

## Tech stack
- 框架：Next.js 14 (App Router)
- 樣式：Tailwind CSS, Shadcn-ui
- 檔案架構：
  ```
  src
  ├── app
  │   ├── about (自我介紹)
  │   ├── blog (部落格)
  │   │   └── [slug] (文章頁面)
  │   ├── projects (專案介紹)
  │   ├── global.css (全域 CSS)
  │   └── ...
  ├── components
  │   ├── ui (shadcn-ui 元件庫)
  │   └── ...
  ├── lib
  │   ├── fetchers.ts (獲取資料的相關函式，使用 Notion 作為 CMS)
  │   ├── types.ts (存放 TypeScript 型別)
  │   ├── utils.ts (存放一些通用的輔助函式)
  │   └── Providers.tsx (全域狀態管理的容器，用於 next-theme)
  ├── data
  │   └── projectsData (專案頁的資料，之後可能也會遷移到 CMS)
  └── middleware.ts (網址重新導向)
  ```

## Feature
### 部落格
- 使用 [Notion](https://www.notion.so/product) 作位作為 content management system
- 「文章列表」頁面：
- 「貼文」頁面：

### UI 設計
使用 next-theme 套件搭配 Tailwind CSS 與 Shadcn-ui，實作深色與亮色兩種模式的 UI

### Deployment
使用 [Vercel](https://vercel.com/home) 部署

## SEO
### Metadata
- [x] favicon, icon, and apple-icon
- [ ] opengraph-image and twitter-image
- [ ] manifest.json
- [ ] robots.txt
- [ ] sitemap.xml