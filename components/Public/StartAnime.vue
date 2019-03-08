<template>
  <div class="start-anime" id="start-anime">
    <div class="start-logo">
    </div>
  </div>
</template>

<script>
    export default {
        name: "start-anime"
    }
</script>

<style scoped>
.start-logo {
  width: 200px;
  height: 200px;
  background-image: url('/nem_logo_web.png');
  background-size: contain;
  position: absolute;
  margin: auto;
  top:0;
  right:0;
  left:0;
  bottom:0;
  animation: disapper 3s ;
  opacity: 0;
}
  .start-anime {
    width: 100%;
    height: 100%;
    background-color: white;
    position: absolute;
    z-index: -999;
    animation: backDisapper 4s ;
  }
  body,
  html {
    height: 100%;
  }
@keyframes disapper
{
  from {opacity:1;}
  to {opacity: 0;}
}
@keyframes backDisapper
{
  0% {
    z-index:999;
    opacity: 1
  }
  50% {
    opacity: 1;
    z-index:999;
  }
  100% {
    z-index: -999;
    opacity: 0;
    display: none;
    }
}
</style>
