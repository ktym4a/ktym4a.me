---
title: 'Astro+Cloudflare PagesでView Transitionが動かない'
tags: ['Astro', 'Cloudflare Pages', 'View Transition']
publishedDate: 2024-01-30
lang: ja
---

Astro+Cloudflare PagesでView Transitionが動かないバグ?に遭遇したので、その解決方法を書きます。

## 現象

1. localhost で動かすと View Transition が動く
2. Cloudflare Pages のプレビュー環境で動かすと View Transition が動く
3. Cloudflare Pages での プロダクション環境で動かすと View Transition が動かない

### バグについて

実際には View Transition が動かないというよりは、`astro:page-load` がトリガーされないという問題でした。  
ただ、View Transition が動かないという表現の方がわかりやすいと思ったので、そのように書いています。

---

## astro:page-load がトリガーされない原因

[Rocket Loader](https://developers.cloudflare.com/speed/optimization/content/rocket-loader/) が原因でした。  
Rocket Loader は、Cloudflare が提供している JavaScript の最適化ツールです。

> Rocket Loader prioritizes your website’s content (text, images, fonts, and more) by deferring the loading of all of your JavaScript until after rendering.
> This type of loading (known as asynchronous loading) leads to earlier rendering of your page content. Rocket Loader handles both inline and external scripts, while maintaining order of execution. Cloudflare will detect incompatible browsers and disable Rocket Loader.

Rocket Loader を On にするとレンダリング後まですべてのJavaScriptの読み込みを延期することで、ウェブサイトのコンテンツ（テキスト、画像、フォントなど）を優先します。 とのことです。

憶測ですが、JavaScript の読み込みが遅延されることによって、`astro:page-load` がトリガーされないのではないかと思います。

同じような[Issue](https://github.com/withastro/astro/issues/9684) もありました。

---

## 解決方法

Rocket Loader を Off にすることで解決しました。

最適化だ〜ってなんでもポチポチしちゃうのは良くないってことですね。
