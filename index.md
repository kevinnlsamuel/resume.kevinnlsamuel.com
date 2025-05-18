---
layout: base
---

{% autoredirect %}
<script>
const lang = navigator.language.split('-')[0]
location.replace(`/${lang}/`)
</script>
{% endautoredirect %}


