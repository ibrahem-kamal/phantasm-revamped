<template>
  <div class="debug-xss" v-html="html"></div>
</template>

<script>
"use strict"

export default {
  name: 'debug-xss',
  data: function () {
    return {};
  },
  props: {
    html: String,
  },
}
</script>


<style>
.debug-xss {
  margin: 1rem;
}
</style>
