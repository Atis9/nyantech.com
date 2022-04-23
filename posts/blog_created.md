---
title: 'ブログを作成した'
date: '2022-04-23'
---

[Next.js のチュートリアル](https://nextjs.org/learn/basics/create-nextjs-app) から派生してブログを作りました。
TypeScript で書き直したり remark をやめて marked + highlight.js を入れたり CSS フレームワークを入れたりしています。原型がない。
チュートリアル後は大体 GitHub Flow で PR を作っているので [Pull requests · Atis9/nextjs\-blog](https://github.com/Atis9/nextjs-blog/pulls?q=is%3Apr+is%3Aclosed) を見て頂けたら変更点が分かります。

CSS フレームワークは [Primer Design System](https://primer.style/) を採用しました。GitHub のデザインが好きなので。

テストフレームワークはどうしようか迷っています。
このアプリはマークダウンの SSG なのでテストがしづらい。
テスト用のマークダウン (posts) ディレクトリを用意して[定数](https://github.com/Atis9/nextjs-blog/blob/6b36b14160625764273b758c1286a7583ad5fbcb/lib/posts.ts#L8)を上書きすればいいんですが、Jest だと上手くいかないです。
クラスにしたほうがテストしやすいかなあ。
クラスにするとしたら MVC 的なパターンか DDD 的なパターンにしようかと思っています。

----

基本的に書くことは未定なので適当にお付き合いください。

----

開発の様子は [Atis9/nextjs\-blog](https://github.com/Atis9/nextjs-blog) で見られます。悪戦苦闘してます。
気になることがあったら気軽に Issue でも PR でもレビューでもください。
