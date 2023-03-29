<template>
  <v-card class="app-title">
    <v-card-title class="d-flex align-center justify-center">
      Weather App
    </v-card-title>
  </v-card>
</template>

<script>
export default {};
</script>

<style>
.app-title {
  animation: myAnim 3s ease 0s 1 normal forwards;
  background: linear-gradient(90deg, #298aab 0%, #fff 100%);
}
@keyframes myAnim {
  0% {
    animation-timing-function: ease-out;
    opacity: 0;
    transform-origin: center center;
  }

  100% {
    animation-timing-function: ease-out;
    opacity: 1;
  }
}
</style>