---
model: Claude Sonnet 4.5 (copilot)
tools: ['search/changes', 'search/codebase']
---

依照下列規則生成 commit message，並用 code block 包起來直接回覆我：

## Rules (Conventional Commits)

- Header: `<type>(<scope>): <subject>`
- Body: 簡要列點說明變更內容，每行不超過 72 字元
- subject 必須簡潔明確，不超過 50 個字元，不加句號
- 確保 type 只使用允許的類別：feat, fix, docs, style, refactor, perf, test, chore, revert
- scope 為可選，根據變更內容選擇適當範圍，包含但不限於以下選項：
  - home: `src/app/(main)/page.tsx`
  - blog: `src/app/(main)/blog/*`
  - about: `src/app/(main)/about/*`
  - projects: `src/app/(main)/projects/*`
  - uses: `src/app/(main)/uses/*`
  - content: General content updates, `src/content/*`
  - ui: UI-related changes
  - typo: Fix typos
  - readme: README-specific changes

## 字彙使用原則

- 使用正體中文、台灣習慣用語進行回應
- 專業技術名詞、程式功能名稱、設計模式等，優先維持英文原文，以提高易讀性和理解性，例如：API、SDK、RESTful、OAuth、microservices、Docker、Kubernetes...等
- 程式碼中的方法名稱、類別名稱、參數名稱等，在 commit message 中應保持原樣
- 功能名稱若有官方或團隊約定俗成的英文名稱，應優先使用該名稱
