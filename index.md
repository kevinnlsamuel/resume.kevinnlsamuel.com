---
layout: base
---

{% autoredirect %}
<script>
const lang = navigator.language.split('-')[0]
location.replace(`/${lang}/`)
</script>
{% endautoredirect %}

<noscript class="place-self-center row-span-2">
    <nav class="border rounded border-primary">
        <ul>
        {%-for lang in langs-%}
            <li class="p-4"><a href="/{{lang[0]}}">{{lang[1].name}}</a></li>
        {%-endfor-%}
        <ul>
    </nav>
</noscript>

