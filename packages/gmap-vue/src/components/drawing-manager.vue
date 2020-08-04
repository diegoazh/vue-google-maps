<template>
  <div>
    <slot :setDrawingMode="setDrawingMode" :deleteSelection="deleteSelection" />
  </div>
</template>

<script>
export default ((x) => x.default || x)(
  // TODO: this should be analyzed after to find a better way to do this
  // eslint-disable-next-line global-require -- old style
  require('../components-implementation/drawing-manager')
);
</script>
