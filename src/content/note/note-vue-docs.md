---
title: Vue.js 3 Docs Note
description: Vue.js 3 のドキュメントを読んで学んだことをまとめました
publishedDate: 2024-08-11
---

## テンプレート構文

### グローバル変数への制限

Vue.jsでは、以下のグローバル変数にのみアクセスできるように制限されている。

```javascript
const GLOBALS_ALLOWED =
  'Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,' +
  'decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,' +
  'Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error'
```

それ以外のプロパティにアクセスしたい場合は、**app.config.globalProperties**に追加することにより、定義することができる。

```javascript
app.config.globalProperties.msg = 'hello'

// 以下のようにアクセスできる
export default {
  mounted() {
    console.log(this.msg) // 'hello'
  }
}
```

## リアクティビティー

### 参照型のリアクティブな状態

**ref** は、ネストしたオブジェクトや配列を変更した場合でも、変更が検出されることが期待できる

```javascript
import { ref } from 'vue'

const obj = ref({
  nested: { count: 0 },
  arr: ['foo', 'bar']
})

function mutateDeeply() {
  // これらは期待通りに動作する
  obj.value.nested.count++
  obj.value.arr.push('baz')
}
```

また、**shallowRef** により、**.value** のアクセスのみを**track**することが出来る。  
**shallowRef** は大きなオブジェクトの監視コストを回避してパフォーマンスを最適化する場合や、内部の状態を外部ライブラリーで管理する場合などに利用できる。

### DOMの更新タイミング

リアクティブな状態を変化させると、DOM は自動的に更新される。  
ただ、更新は同期的に適用されない。  
その代わりに、更新サイクルの「**next tick**」まで更新をバッファリングし、どれだけ状態を変化させても、各コンポーネントは一度だけ更新することを保証している。

状態変化後の DOM 更新が完了するのを待つため、**nextTick()** というグローバル API を使用できる

```javascript
import { nextTick } from 'vue'

async function increment() {
  count.value++
  await nextTick()
  // DOM が更新される
}
```

### `reactive()`

リアクティブな状態を宣言する方法として、**reactive()** という API を使う方法もある。
特徴としては **ref()** と異なり、オブジェクト自体をリアクティブにする。(**.value** が不要)

```javascript
import { reactive, ref } from 'vue'

const refState = ref({
  value: 0
})
const state = reactive({
  count: 0
})

refState.value.value++
state.count++
```

ただ、多くの制約があるため、リアクティブな状態を宣言する場合は主に **ref()** を使うことが推奨されている。

制限
1. 限定された値の型: オブジェクト型（オブジェクト、配列、および Map や Set などの コレクション型）に対してのみ機能する。
2. オブジェクト全体を置換できない
```javascript
let state = reactive({ count: 0 })

// 上記の参照（{ count: 0 }）は、もはや追跡されない
state = reactive({ count: 1 })
```
3. 分割代入できない
```javascript
const state = reactive({ count: 0 })

// count は分割代入すると state.count と切り離される
let { count } = state
// 元の状態に戻らない
count++

// この関数は数値を受け取りますが、これだと
// state.count の変更を追跡することができない。
// リアクティビティーを維持するためには、オブジェクト全体を渡す必要がある
callSomeFunction(state.count)
```

## computed

### `computed()`

リアクティブなデータを含む複雑なロジックには**computed**を使用すべき

下記は望ましくない例:

```vue
<p>Has published books:</p>
<span>{{ author.books.length > 0 ? 'Yes' : 'No' }}</span>
```

下記は望ましい例:

```vue
<script setup>
import { reactive, computed } from 'vue'

const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})

// 算出プロパティの参照
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'Yes' : 'No'
})
</script>

<template>
  <p>Has published books:</p>
  <span>{{ publishedBooksMessage }}</span>
</template>
```

### `computed` vs. 関数

下記のようにもしても同じ結果にはなる

```vue
<p>{{ calculateBooksMessage() }}</p>
```

```javascript
function calculateBooksMessage() {
  return author.books.length > 0 ? 'Yes' : 'No'
}
```

ただし、**computed**はリアクティブな依存関係にもとづきキャッシュされる。  
関数の場合は、再描画が起きると常に関数を実行するため、パフォーマンスが低下する可能性がある。

### `computed()` のベストプラクティス

1. 関数は副作用のないものにする
関数は計算のみを行い、副作用がないようにすることが重要  
例えば、算出プロパティの getter の内部で他のステートを変更したり、非同期リクエストを実行したり、DOM を変更したりしないようにしよう  
**唯一の責任は、値を計算して返すことでなければならない**

2. 算出した値の変更を避ける
算出プロパティから返る値は、派生した状態、一時的なスナップショットとして考える。  
ソースの状態が変わるたびに、新しいスナップショットが作成される。  
計算された結果は読み取り専用として扱い、変更しないようにする。  
**その代わり、新しい計算結果が必要な場合は、依存するソースの状態を更新します。**

## 条件付きレンダリング

### `v-if` vs. `v-show`

**v-if** は、イベントリスナと子コンポーネント内部の条件ブロックが適切に破棄され、そして切り替えられるまでの間再作成されるため、”リアル”な条件レンダリング  
**v-if** はまた 遅延レンダリング（lazy） でもあり、初期表示において状態が **false** の場合、何もしない。  
つまり条件付きブロックは、条件が最初に **true** になるまでレンダリングされません。

一方で、**v-show** はとてもシンプルで、要素は初期条件に関わらず常にレンダリングされ、シンプルな CSS ベースの切り替えによって表示される。

一般的に、**v-if** は**より高い切り替えコストを持っているのに対して**、 **v-show** は**より高い初期レンダリングコストを持っている**  
そのため、**とても頻繁に何かを切り替える必要があれば v-show を選び、条件が実行時に変更することがほとんどない場合は、v-if を選ぶ。**


## リストレンダリング

### v-for with Object

**v-for** は、オブジェクトの各プロパティを反復処理するのにも使用できる。  
反復処理の順序は、オブジェクトに対して **Object.keys()** を呼び出した結果に基づく。

```javascript
const myObject = reactive({
  title: 'How to do lists in Vue',
  author: 'Jane Doe',
  publishedAt: '2016-04-10'
})
```

```vue
<li v-for="(value, key, index) in myObject">
  {{ index }}. {{ key }}: {{ value }}
</li>
```

### key による状態管理

**v-for** でレンダリングされた要素のリストを更新するとき、デフォルトでは**in-place patch**という戦略が用いられる。  
データ項目の順序が変更された場合、項目の順序に合うように DOM 要素を移動させるのではなく、個々の要素をその位置のままで修正し、各インデックスでレンダリングされるべきものを反映させる。

この戦略は効率性が高いものの、これが適すのは、**リストのレンダリング出力が子コンポーネントの状態や一時的な DOM の状態（フォームの入力値など）に依存しない場合に限られる。**

**key** 属性を使用することで、Vue に対して、各要素が一意であることを伝えることができる。

```vue
<div v-for="item in items" :key="item.id">
  <!-- 内容 -->
</div>
```

**v-for の key 属性は、可能な場合は必ず指定することが推奨**される。  

### 配列の変更の検出

1. **ミューテーションメソッド** (`push()`, `pop()`, `shift()`, `unshift()`, `splice()`, `sort()`, `reverse()`)
2. **配列の置き換え**

### フィルタリング/並べ替えの結果を表示

**computed** プロパティを使用して、フィルタリングや並べ替えの結果を表示することができる

```javascript
const numbers = ref([1, 2, 3, 4, 5])

const evenNumbers = computed(() => {
  return numbers.value.filter((n) => n % 2 === 0)
})
```

```vue
<li v-for="n in evenNumbers">{{ n }}</li>
```

**computed**の中で **reverse()** と **sort()** を使用するときは注意が必要  
これらのメソッドは、**computedのゲッターの中では避けるべき**  
なぜなら元の配列を変更するという作用があるため。  
以下のように、これらのメソッドを呼び出す前には元の配列のコピーを作成することが推奨される

```javascript
return [...numbers].reverse()
```

## Watchers

### Deep Watchers

リアクティブなオブジェクト上で、**watch()** 関数を直接呼び出すとき、暗黙的にディープ・ウォッチャーが生成される。  
そのため、コールバックはすべてのネストした変更で実行される。

```javascript
const obj = reactive({ count: 0, nested: { foo: 0 } })

watch(obj, (newValue, oldValue) => {
})

obj.count++
obj.nested.foo++
```

こっちの場合は異なるオブジェクトを返したときにのみコールバックは実行される。

```javascript
const obj = reactive({ count: 0 })

watch(() => obj.count, (newValue, oldValue) => {
  // このコールバックは、`obj.count` が変更されたときだけ実行される
})

obj.count++
```

### Eager Watchers

**watch** は、デフォルトでは、遅延して実行される。  
**監視対象の値が変更するまでコールバックは実行されない。**  
しかし、同様のコールバックのロジックを先に実行したい場合、たとえば、初期値のデータを読み込み、関連する状態が変更されるたび、再びデータを読み込みたいときには  
**immediate: true** オプションを渡すと、ウォッチャーのコールバックを強制的に即時実行することができる。

```javascript
watch(
  source,
  (newValue, oldValue) => {
    // すぐに実行され、`source` が変更されると再び実行される
  },
  { immediate: true }
)
```

### watchEffect()
ウォッチャーのコールバックは、ソースと全く同じリアクティブな状態を使用するのが一般的。  
例えば、次のコードでは **todoId** の ref が変更されるたびに、ウォッチャーを使ってリモートのリソースを読み込んでいる。

```javascript
const todoId = ref(1)
const data = ref(null)

watch(
  todoId,
  async () => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
    )
    data.value = await response.json()
  },
  { immediate: true }
)
```

特に、ウォッチャーが **todoId** を 2 回使用していることに注目。  
1 回目はソースとして、2 回目はコールバック内で使用しています。

これは、**watchEffect()** によって簡略化できる。  
**watchEffect()** によって、コールバックのリアクティブな依存関係を自動的に追跡できる。

```javascript
watchEffect(async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  )
  data.value = await response.json()
})
```

また、コールバックは即時実行されるので、 **immediate: true** を指定する必要はない。  
実行中は、自動的に **todoId.value** を依存関係として追跡する（**computed**と同様）。  
**todoId.value** が変更されるたびに、コールバックが再実行される。

複数の依存関係があるウォッチャーでは、 **watchEffect()** を使うことで、依存関係のリストを手動で管理する負担がなくなる。  
さらに、ネストしたデータ構造内の複数のプロパティを監視する必要がある場合、 **watchEffect()** は、すべてのプロパティを再帰的に追跡するのではなく、コールバックで使用されるプロパティのみを追跡するので、ディープ・ウォッチャーよりも効率的である。

※ **watchEffect は同期的な処理中のみ依存先を追跡します。非同期のコールバックで使用する場合、最初の await の前にアクセスされたプロパティのみが追跡される。**

### watch vs watchEffect

**watch** と **watchEffect** は、どちらとも副作用をリアクティブに処理することができる。両者の主な違いはリアクティブの依存先の監視方法にある。

- **watch** は明示的に示されたソースしか監視しない。コールバック内でアクセスされたものは追跡しない。加えて、コールバックはソースが実際に変更したときにのみ実行される。**watch** は依存関係の追跡を副作用から分離する。それにより、コールバックをいつ実行するかをより正確にコントロールすることができる。
- **watchEffect** は依存先の追跡と副作用を 1 つのフェーズにまとめたものになる。同期処理を実行している間にアクセスしたすべてのリアクティブのプロパティを自動的に追跡する。これにより、より便利で一般的にコードが短くなりますが、そのリアクティブの依存先はあまり明示的にならなくなってしまう。

## コンポーネント

### イベントの購読

親コンポーネントへの通信が必要になる場合、**$emit** を使用してイベントを発行することができる。

```vue
<BlogPost
  ...
  @enlarge-text="postFontSize += 0.1"
>
</BlogPost>
```

```vue
<script setup>
defineProps(['title'])
defineEmits(['enlarge-text'])
</script>

<template>
  <div class="blog-post">
    <h4>{{ title }}</h4>
    <button @click="$emit('enlarge-text')">Enlarge text</button>
  </div>
</template>
```

### 動的コンポーネント

Vue の <component> 要素の特別な属性 is で実現できる。

```vue
<component :is="tabs[currentTab]"></component>
```

複数のコンポーネントを `<component :is="...">` で切り替えた場合、**切り変えられたコンポーネントがアンマウントされる。**  
組み込みの `<KeepAlive>` コンポーネント を使用すれば、アクティブでないコンポーネントを強制的に "生きて" いる状態にすることができる。

### props 渡しの詳細

長い名での大文字・小文字の使い分け名は、**camelCase**で宣言する。  

```javascript
defineProps({
  greetingMessage: String
})
```

技術的には、子コンポーネントに **props を渡すときにも camelCase を用いることができる**。  
しかし、**常に kebab-case を用いて HTML の属性に揃える、以下のような表記が慣例となっている**
  
```vue
<MyComponent greeting-message="hello" />
```

### 一方向のデータフロー

すべての props では、子のプロパティと親のプロパティとの間に一方向バインディングが形成される。  
**親のプロパティが更新されたときには子にも流れますが、その逆はない。**  
さらに、**親コンポーネントが更新されるたびに、子コンポーネント内のすべての props は最新の値に更新される。**  
**そのため、子コンポーネント内で props の変更を試みてはいけない。**

通常、props を変更したい状況には以下の 2 つがある。
1. props は初期値を渡すために用いて、それ以降、子コンポーネントではローカルのデータプロパティとして利用する。
```javascript
const props = defineProps(['initialCounter'])

// props.initialCounter は counter の初期値を指定するためだけに
// 使われ、今後発生する props の更新からは切り離されます。
const counter = ref(props.initialCounter)
```

2. props を、変換する必要がある元の値として渡したい。
```javascript
const props = defineProps(['size'])

// props が変更されると自動的に更新される算出プロパティ
const normalizedSize = computed(() => props.size.trim().toLowerCase())
```

### オブジェクト/配列のプロップを変更する

オブジェクトや配列を props として渡した場合、子コンポーネントが props のバインディングを変更することはできませんが、オブジェクトや配列のネストされたプロパティを変更することは可能。  
これは、JavaScript ではオブジェクトや配列が参照渡しであり、Vue がそのような変更を防ぐのにかかるコストが現実的でないため。  
**ほとんどの場合、子コンポーネントはイベントを発行して、変更を親コンポーネントに実行してもらう必要がある。**

### イベントの引数

```vue
<button @click="$emit('increaseBy', 1)">
  Increase by 1
</button>
```

```vue
<MyButton @increase-by="(n) => count += n"></MyButton>
```

**$emit()** に渡されたイベント名の後にあるすべての追加の引数はリスナーに転送される。  
たとえば **$emit('foo', 1, 2, 3) とすると、リスナー関数は 3 つの引数を受け取る。**

### 双方向バインディング

コンポーネント上で **v-model** を使用すると双方向バインディングを実装できる。  
Vue 3.4 以降は、**defineModel()** マクロを使うことが推奨されている

```vue
<script setup>
const model = defineModel()

function update() {
  model.value++
}
</script>

<template>
  <div>Parent bound v-model is: {{ model }}</div>
  <button @click="update">Increment</button>
</template>
```

```vue
<MyComponent v-model="count" />
```

**defineModel()** が返す値は **ref**。**他の ref と同じようにアクセスしたり変更したりできますが、親の値とローカルの値の双方向バインディングとして動作する点が異なる。**

- その **.value** は親の **v-model** にバインドされた値と同期される。
- 子が **.value** を変更すると、親にバインドされている値も更新される。

つまり、**v-model** を使ってネイティブの入力要素にこの **ref** をバインドすることもでき、同じ **v-model** の使い方を提供しながら、ネイティブの入力要素をラップするのが簡単になる。

```vue
<script setup>
const model = defineModel()
</script>

<template>
  <input v-model="model" />
</template>
```

### v-model 修飾子の処理

カスタム入力コンポーネントの **v-model** でカスタム修飾子をサポートしたい場合

```vue
<MyComponent v-model.capitalize="myText" />
```

```vue
<script setup>
const [model, modifiers] = defineModel({
  set(value) {
    if (modifiers.capitalize) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
    return value
  }
})
</script>

<template>
  <input type="text" v-model="model" />
</template>
```

### 名前付きスロット

1 つのコンポーネント内に複数のスロットアウトレットを存在させたいとき

```html
<div class="container">
  <header>
    <!-- ここに header コンテンツが必要 -->
  </header>
  <main>
    <!-- ここに main コンテンツが必要 -->
  </main>
  <footer>
    <!-- ここに footer コンテンツが必要 -->
  </footer>
</div>
```

このような場合のために、`<slot>` 要素には**特別な属性 name があり**、異なるスロットにユニークな ID を割り当てて、コンテンツをレンダリングするべき場所を指定するために使用できる。

```html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

**name** を持たない `<slot>` アウトレットは、**暗黙的に "default" という name を持つものとされる。**

```html
<BaseLayout>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>

  <!-- #default を指定 または -->
  <template #default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>

  <!-- 暗黙的なデフォルトスロット -->
  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</BaseLayout>
```

### 条件付きスロット

スロットが存在するかどうかに基づいて何かをレンダリングしたい場合は、**$slots** プロパティと **v-if** を組み合わせて使用します。  
以下の例では、**header**, **footer**, **default** の 3 つの条件付きスロットを持つ Card コンポーネントを定義しる。

```vue
<template>
  <div class="card">
    <div v-if="$slots.header" class="card-header">
      <slot name="header" />
    </div>
    
    <div v-if="$slots.default" class="card-content">
      <slot />
    </div>
    
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>
```

### Provide

コンポーネントの子孫にデータを提供するには **provide()** 関数を使う。

```vue
<script setup>
import { provide } from 'vue'

provide(/* key */ 'message', /* value */ 'hello!')
</script>
```

### アプリケーションレベルの Provide

コンポーネント内だけでなく、アプリケーションレベルでデータを提供することも可能。

```javascript
import { createApp } from 'vue'

const app = createApp({})

app.provide(/* key */ 'message', /* value */ 'hello!')
```

### Inject

祖先コンポーネントが提供するデータを注入するには **inject()** 関数を使用する。

```vue
<script setup>
import { inject } from 'vue'

const message = inject('message')
</script>
```

提供された値が ref である場合、そのまま注入され、自動的にアンラップされることはない。  
これにより、インジェクターコンポーネントはプロバイダーコンポーネントとのリアクティビティーの接続を保持できる。

### リアクティビティーの利用

リアクティブな値を provide / inject する場合、**可能な限り、リアクティブな状態への変更を provider の内部で維持することが推奨される。**  
これは、提供されるステートとその可能な変更が同じコンポーネントに配置されることを保証し、将来のメンテナンスをより容易にします。  
インジェクターコンポーネントからデータを更新する必要がある場合がある場合は、状態の変更を担当する関数を提供することをおすすめする。

```vue
<!-- プロバイダーコンポーネント内部 -->
<script setup>
import { provide, ref } from 'vue'

const location = ref('North Pole')

function updateLocation() {
  location.value = 'South Pole'
}

provide('location', {
  location,
  updateLocation
})
</script>
```

```vue
<!-- インジェクターコンポーネント内部 -->
<script setup>
import { inject } from 'vue'

const { location, updateLocation } = inject('location')
</script>

<template>
  <button @click="updateLocation">{{ location }}</button>
</template>
```

最後に、 **provide** を通して渡されたデータがインジェクターコンポーネントによって変更されないようにしたい場合は、提供された値を **readonly()** でラップできる。

```vue
<script setup>
import { ref, provide, readonly } from 'vue'

const count = ref(0)
provide('read-only-count', readonly(count))
</script>
```


### シンボルキーの利用

もしあなたが多くの依存関係を提供するプロバイダーを持つ大規模なアプリケーションで作業していたり、他の開発者が使用する予定のコンポーネントを作成している場合は、衝突の危険性を避けるためにシンボルインジェクションキーを使用するのがベストです。  
シンボルは専用のファイルに書き出しておくことをおすすめします。

```javascript
// keys.js
export const myInjectionKey = Symbol()
```

```js
// プロバイダーコンポーネント内
import { provide } from 'vue'
import { myInjectionKey } from './keys.js'

provide(myInjectionKey, {
  /* 提供するデータ */
})

// インジェクターコンポーネント内
import { inject } from 'vue'
import { myInjectionKey } from './keys.js'

const data = inject(myInjectionKey)
```

## Composable

### 「Composable」とは？

Vue アプリケーションの文脈で「コンポーザブル（composable）」とは、Vue の Composition API を活用して**状態を持つロジックをカプセル化**して再利用するための関数。

フロントエンドアプリケーションを構築するとき、共通のタスクのためにロジックを再利用しないといけないことがよくある。  
例えば、多くの箇所で日付をフォーマットする必要があるので、そのための再利用可能な関数を抽出する。  
このフォーマッターは**状態のないロジックをカプセル化**し、ある入力を受け取ったら即座に期待される出力を返す。

**対照的に、状態のあるロジックは時間とともに変化する状態の管理が伴う。**  
ページ上のマウスの現在位置をトラッキングするようなものがシンプルな例といえる。

知っておくべきことが多すぎてここに記載出来ないので、[docs](https://ja.vuejs.org/guide/reusability/composables.html) をよく読むこと。

## KeepAlive

`<KeepAlive>` は、複数のコンポーネント間を動的に切り替えるときに、コンポーネントインスタンスを条件付きでキャッシュ可能にするビルトインコンポーネント。

### 使い方

デフォルトでは、アクティブなコンポーネントのインスタンスは、別のコンポーネントに切り替えられたときにアンマウントされる。  
これにより、保持している変更された状態は失われてしまう。  
このコンポーネントを再度表示すると、初期状態のみを持つ新しいインスタンスが作成される。

この問題を解決するために、動的コンポーネントを `<KeepAlive>` というビルトインコンポーネントで包むことができる。

```vue
<template>
  <KeepAlive>
    <component :is="currentTabComponent"></component>
  </KeepAlive>
</template>
```
