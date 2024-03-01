---
title: 'Astro の dev toolbar app を作成した話'
tags: ['Astro', 'Astro Dev Tool']
publishedDate: 2024-03-01
lang: ja
---

`Astro Page Insight` という Astro のdev toolbar app を作成しました。

## Astro Page Insight とは？

[Astro Page Insight](https://www.npmjs.com/package/astro-page-insight) は、Lighthouse の結果を直接ページ上に表示することができる Astro の dev toolbar app です。

### 特徴

1. **レスポンシブ** に適切な要素をハイライトして Lighthouse の結果を直接ページ上に表示します。
2. meta タグや console log のエラーを表示します。

## なぜ作成したのか？

`Page Speed Insight` を開いたり、`DevTool` で Lighthouse の結果を確認するのが少し不便だなと感じていたので、もっとスマートな方法を探していました。

## ロードマップ

Web 開発のための統合された dev tool にしたいです。

-   lighthouse のスコアを表示する。
-   Lighthouse の結果にフィルターを追加する。
-   meta タグ情報の解析と表示を追加する。（例: Open Graph, Twitter Card）
-   UI/UX を最適化する。
-   Lighthouse の結果をキャッシュする。（DX を向上させるため）
-   CI 連携を追加する。
-   PWA の機能を追加する。

## まとめ

このツールは開発体験を変えること間違いなしで、Astro Page Insight がDXの向上の役に立つと思っています。
