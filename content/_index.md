<!-- ---
title: My Site
toc: false
---

This is the landing page.

## Explore

{{< cards >}}
  {{< card link="docs" title="Docs" icon="book-open" >}}
  {{< card link="about" title="About" icon="user" >}}
{{< /cards >}}

## Documentation

For more information, visit [Hextra](https://imfing.github.io/hextra). -->

---
title: My Site
toc: false
---

This is the landing page.

## Explore

{{< hextra/feature-grid >}}

{{< hextra/feature-card
  title="Docs"
  subtitle="Lihat dokumentasi"
  link="/docs"
>}}

{{< hextra/feature-card
  title="About"
  subtitle="Tentang saya"
  link="/about"
>}}

{{< /hextra/feature-grid >}}

## Documentation

For more information, visit [Hextra](https://imfing.github.io/hextra).