<template>
  <div>
    <div v-if="!isReady">
      <set-valid-api-key @is-valid="isValidKey"></set-valid-api-key>
    </div>
    <div v-else>
      <slot name="default"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'eg-base',
  data() {
    return {
      isReady: false
    }
  },
  props: {},
  computed: {},
  methods: {
    isValidKey(event) {
      this.isReady = event
    }
  }
}
</script>
