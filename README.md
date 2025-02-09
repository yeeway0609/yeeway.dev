# yeeway.dev - Personal Website of Yiwei Su

## Tech stack

- Typescript, [React](https://react.dev/), [Next.js](https://nextjs.org/) (App Router)
- CSS framework: [Tailwind CSS](https://tailwindcss.com/)
- Component library: [shadcn/ui](https://ui.shadcn.com/)
- Coding style: [ESLint](https://eslint.org/), [commitlint](https://commitlint.js.org/)
- Deployment: [Vercel](https://vercel.com)
- CMS for Blog: [Notion](https://www.notion.so)

## Files and Folders Structure

```
src
├── app
│   ├── page.tsx (網站主頁，目前亦為部落格主頁面)
│   ├── about (自我介紹頁面)
│   ├── blog
│   │   └── [slug] (部落格文章頁面，依據 slug 生成)
│   ├── projects (作品集頁面)
│   └── ...
├── components
│   ├── ui (shadcn-ui 元件庫)
│   └── ...
├── data
│   └── projectsData (作品集頁面的靜態資料，預計遷移到 CMS)
└── lib
    ├── fetchers.ts (獲取動態資料的相關函式，用於 Notion CMS)
    ├── types.ts (全域 TypeScript 型別定義)
    ├── utils.ts (通用的輔助函式)
    └── Providers.tsx (全域狀態管理容器，用於 next-theme)
```

## Git Commit Type

reference: [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional)
| 前綴名稱 | 說明 |
| :---- | :---- |
| feat | 新增/修改功能 |
| fix | 修補 bug |
| refactor | 程式碼重構優化 |
| style | 與 coding style 相關的修改 (縮排、空白、註解...etc) |
| docs | 修改文件 |
| build | 部署 |
| chore | 建構程序或輔助工具的變動與其他雜項 |
