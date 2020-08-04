/* vim: set softtabstop=2 shiftwidth=2 expandtab : */

<template>
  <div>
    <div ref="flyaway">
      <!-- so named because it will fly away to another component -->
      <slot> </slot>
    </div>
  </div>
</template>

<script>
export default ((x) => x.default || x)(
  // TODO: this should be analyzed after to find a better way to do this
  // eslint-disable-next-line global-require -- old style
  require('../components-implementation/info-window')
);
</script>
