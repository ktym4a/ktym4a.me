---
title: '記事毎に色を変えたい'
tags: ['その他', 'TailwindCSS', 'Astro']
publishedDate: 2024-02-07
lang: ja
---

Tailwind を使って記事毎にテーマカラーを変えるのに少しはまったので、その解決方法を共有します。

## 前提

自分のサイトでは、下記のようなカラーテーマを持っています。

```ts:constants/color.ts
export const COLORS: {
    [key in COLOR]: ColorType
} = {
    [COLOR.BLUE]: {
        text: 'text-ctp-blue',
        hoverText: 'hover:text-ctp-blue',
        focusText: 'focus-visible:text-ctp-blue',
        background: 'bg-ctp-blue',
    },
    [COLOR.GREEN]: {
        text: 'text-ctp-green',
        hoverText: 'hover:text-ctp-green',
        focusText: 'focus-visible:text-ctp-green',
        background: 'bg-ctp-green',
    },
    [COLOR.PEACH]: {
        text: 'text-ctp-peach',
        hoverText: 'hover:text-ctp-peach',
        focusText: 'focus-visible:text-ctp-peach',
        background: 'bg-ctp-peach',
    },
    [COLOR.PINK]: {
        text: 'text-ctp-pink',
        hoverText: 'hover:text-ctp-pink',
        focusText: 'focus-visible:text-ctp-pink',
        background: 'bg-ctp-pink',
    }
}
```

例えば top ページで `GREEN` を使いたい場合は、下記のようにします。

```astro:pages/index.astro
---
import Layout from '@/layouts/Layout.astro'

const baseColor = COLORS.GREEN
---

<Layout
    baseColor={baseColor}
>
   // ここにコンテンツを書く
</Layout>
```

共通部分では下記のように baseColor からテーマカラーを取得しています。

```astro
---
import type { ColorType } from '@/types/index'

interface Props {
    baseColor: ColorType
}

const { baseColor } = Astro.props
---

<div class={`${baseColor.focusOutline} ${baseColor.hoverOutline} ${baseColor.hoverText} ${baseColor.focusText}`}>
   テスト
</div>
```

固定の各ページに関しては、上記のようにするだけで良かったです。

---

## ブログポスト毎にテーマを変えるのに何故苦戦したか

ブログポストページでは Content Collections を使ってマークダウンからデータを取得しています。

```astro:/pages/[...page].astro
---
import { COLORS } from '@/constants/color'
import Layout from '@/layouts/Layout.astro'
import { getPosts } from '@/utils/blog'

export async function getStaticPaths() {
    const colors = [
        COLORS.GREEN,
        COLORS.PINK,
        COLORS.BLUE,
        COLORS.PEACH
    ] as const

    return await getPosts().then((post) =>
        post.map((entry, i) => ({
            params: { page: entry.slug },
            props: {
                entry,
                baseColor: colors[i % colors.length] as (typeof colors)[number]
            }
        }))
    )
}

const { entry, baseColor } = Astro.props
const { Content } = await entry.render()
---

<Layout
    baseColor={baseColor}
>
    <article class='space-y-4 md:space-y-6'>
      <Content />
    </article>
</Layout>

<style is:global>
    html.ctp-mocha .astro-code,
    html.ctp-mocha .astro-code span {
        color: var(--shiki-dark) !important;
    }

    .blog > *:first-child {
        @apply !mt-0;
    }

    .blog > *:last-child {
        @apply !mb-0;
    }

    .blog h1 {
        @apply mt-6 text-2xl font-bold before:pr-3;
    }

    ...
</style>
```

最初は、inline style で baseColor を使ってスタイルを変えることを考えましたが、Astro では inline style 内で変数を使うことができませんでした。  
[CSS変数](https://docs.astro.build/ja/guides/styling/#css%E5%A4%89%E6%95%B0)を使用し、 変数を渡すことも可能ですが、 css の `var()` のみに対応しており、tailwind の class を渡すことが出来ませんでした。

---

## 解決策

もっといい方法があるかもしれないんですが、自分は下記のようにしました。(いい解決策あったらぜひPull Requestを送ってください)

```ts:/constants/color.ts
import { COLOR, type ColorType } from '@/types/index'

export const COLORS: {
    [key in COLOR]: ColorType
} = {
    [COLOR.BLUE]: {
        ...
        blogPostColor:
            '[&>hr]:border-[1px] [&>hr]:border-ctp-blue/50 dark:[&>hr]:border-ctp-blue/75 [&_em]:text-ctp-blue [&_strong]:text-ctp-blue [&_del]:text-ctp-blue [&_a]:text-ctp-blue focus-visible:[&_a]:outline-ctp-blue [&_blockquote]:border-l-ctp-blue [&_dt]:text-ctp-blue [&_pre::-webkit-scrollbar]:w-[6px] [&_pre::-webkit-scrollbar]:h-[4px] [&_pre::-webkit-scrollbar-thumb]:rounded-md [&_pre::-webkit-scrollbar-thumb]:bg-ctp-blue/75 [&_section]:border-ctp-blue/50 dark:[&_section]:border-ctp-blue/75 [&_th]:text-ctp-blue [&_.remark-code-title]:border-t-ctp-blue [&_.remark-code-title]:border-t-2',
    },
    [COLOR.GREEN]: {
        ...
        blogPostColor:
            '[&>hr]:border-[1px] [&>hr]:border-ctp-green/50 dark:[&>hr]:border-ctp-green/75 [&_em]:text-ctp-green [&_strong]:text-ctp-green [&_del]:text-ctp-green [&_a]:text-ctp-green focus-visible:[&_a]:outline-ctp-green [&_blockquote]:border-l-ctp-green [&_dt]:text-ctp-green [&_pre::-webkit-scrollbar]:w-[6px] [&_pre::-webkit-scrollbar]:h-[4px] [&_pre::-webkit-scrollbar-thumb]:rounded-md [&_pre::-webkit-scrollbar-thumb]:bg-ctp-green/75 [&_section]:border-ctp-green/50 dark:[&_section]:border-ctp-green/75 [&_th]:text-ctp-green [&_.remark-code-title]:border-t-ctp-green [&_.remark-code-title]:border-t-2',
    },
    [COLOR.PEACH]: {
        ...
        blogPostColor:
            '[&>hr]:border-[1px] [&>hr]:border-ctp-peach/50 dark:[&>hr]:border-ctp-peach/75 [&_em]:text-ctp-peach [&_strong]:text-ctp-peach [&_del]:text-ctp-peach [&_a]:text-ctp-peach focus-visible:[&_a]:outline-ctp-peach [&_blockquote]:border-l-ctp-peach [&_dt]:text-ctp-peach [&_pre::-webkit-scrollbar]:w-[6px] [&_pre::-webkit-scrollbar]:h-[4px] [&_pre::-webkit-scrollbar-thumb]:rounded-md [&_pre::-webkit-scrollbar-thumb]:bg-ctp-peach/75 [&_section]:border-ctp-peach/50 dark:[&_section]:border-ctp-peach/75 [&_th]:text-ctp-peach [&_.remark-code-title]:border-t-ctp-peach [&_.remark-code-title]:border-t-2',
    },
    [COLOR.PINK]: {
        ...
        blogPostColor:
            '[&>hr]:border-[1px] [&>hr]:border-ctp-pink/50 dark:[&>hr]:border-ctp-pink/75 [&_em]:text-ctp-pink [&_strong]:text-ctp-pink [&_del]:text-ctp-pink [&_a]:text-ctp-pink focus-visible:[&_a]:outline-ctp-pink [&_blockquote]:border-l-ctp-pink [&_dt]:text-ctp-pink [&_pre::-webkit-scrollbar]:w-[6px] [&_pre::-webkit-scrollbar]:h-[4px] [&_pre::-webkit-scrollbar-thumb]:rounded-md [&_pre::-webkit-scrollbar-thumb]:bg-ctp-pink/75 [&_section]:border-ctp-pink/50 dark:[&_section]:border-ctp-pink/75 [&_th]:text-ctp-pink [&_.remark-code-title]:border-t-ctp-pink [&_.remark-code-title]:border-t-2',
    }
}
```

```astro:/pages/[...page].astro
<article class={`space-y-4 md:space-y-6 ${baseColor.blogPostColor}`}>
   <Content />
</article>
```
