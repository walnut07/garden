---
date: "Dec 12th, 2024"
public: "true"
slug: "how-to-deploy-a-static-site-to-cloudflare"
tags: [[Cloudflare, deployment]]
title: "How to deploy a static site to Cloudflare"
---

Official doc that I get most of information from is https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/

My use case is:
- To deploy my static NextJs app (specifically this digital garden)

## Points

In short, configure your NextJs app for static export.

The core part of NextJs has been supported for static export:
- Server components, client components, etc
- Doc: https://nextjs.org/docs/app/building-your-application/deploying/static-exports


## Pricing

In my specific use case, which is to host a personal blog, Free Plan seems to be enough
- Free plan: https://developers.cloudflare.com/pages/functions/pricing/#free-plan