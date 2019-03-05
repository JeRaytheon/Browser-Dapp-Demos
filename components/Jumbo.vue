<template lang="pug">
 
</template>

<script>

  import Tutorial from '~/components/Tutorial.vue'

  export default {
    components: {
      Tutorial
    },
    name: "Jumbo",
    props: [
      "navTargetId"
    ],
    data() {
      return {

      }
    },
    watch: {
      wallet: {
        handler: function() {

        }
      }
    },
    methods: {
    }
  }
</script>

<style scoped>
  header {
    color: #3a3c4f;
  }
</style>
