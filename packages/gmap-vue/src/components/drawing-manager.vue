<template>
  <div>
    <slot
      :setDrawingMode="setDrawingMode"
      :deleteSelection="deleteSelection"
    />
  </div>
</template>

<script>
export default ((x) => x.default || x)(require('../components-implementation/drawing-manager'))
</script>
