<template>

  <h1>Central de Pedidos</h1>
  <form-pedido :pedidos="pedido"></form-pedido>
  


</template>

<script>

import FormPedido from './components/FormPedido.vue'

export default {
  name: 'App',
  components: {
    FormPedido,
  },
  data() {

  }

}
</script>

<style>

</style>
