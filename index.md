---
layout: base
---

{% autoredirect %}
<script>
const lang = navigator.language.split('-')[0]
location.replace(`/${lang}/`)
</script>
{% endautoredirect %}

<noscript>
    <div class="w-14 lg:w-32">
    {%render
    'langswitcher.liquid',
    langs: langs,
    lang: lang,
    open: 'true'
    %}
    </div>
</noscript>

