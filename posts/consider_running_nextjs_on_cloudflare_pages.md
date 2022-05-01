---
title: 'Next.js を Cloudflare Pages で運用することを検討する'
date: '2022-05-01 16:15'
---

以下の Issue で色々と検討した。
[next export ができない · Issue \#51 · Atis9/nyantech\.com](https://github.com/Atis9/nyantech.com/issues/51)
デプロイ先で SSR が利用できるかどうかが要点のため、Cloudflare Pages にかぎらずデプロイ先が GitHub Pages でも同じことが言えるはず。

このブログでやりたいことは SSG のみで事足りるため、`next/image` の最適化の問題をサードパーティライブラリなどで解消すれば任意のホスティングサービスで運用することは可能だと思う。
だがそうした場合、果たして Next.js を利用するべきなのかという疑問もある (SSR, SSG を両立できるのが Next.js の良い点だと思っているため)。

別の論点として、GitHub Codespaces を利用してみたいが、Vercel の運用コストが高いという点がある。
今現在、GitHub Codespaces は Organization の Team プラン以上でのみ利用できる。
そして、Organization が保有しているリポジトリの Vercel へのデプロイは Vercel Pro プラン以上でのみ利用できる。

GitHub Organization Team プランは 4 USD/month/user のため、運用コストとしては安くすむ。
だが、Vercel Pro プランに関しては 20 USD/month/user である。
どこに需要があるか分からないブログサービスの運用のために 24 USD/month をかけるのは少々ハードルが高い。

全体を通して、nyantech.com というサービスが今後どういった機能を実装していきたいかと、運用・保守コストをどこまで許容できるかが論点となると思う。

下記 Issue で機能の分離を検討しているので、現状の考えとしてはブログは SSG に割り切って実装して、SSR が必要なものは別アプリにするのが良いか、というところか。
[blog を別ドメインに分離する · Issue \#50 · Atis9/nyantech\.com](https://github.com/Atis9/nyantech.com/issues/50)
