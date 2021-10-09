<template>

  <h1>Central de Pedidos</h1>
  <form-pedido :pedidos="pedido"></form-pedido>
  <br>
  <tabela-pedido :pedidos="pedido"></tabela-pedido>


</template>

<script>

import FormPedido from './components/FormPedido.vue'
import TabelaPedido from './components/TabelaPedido.vue'

export default {
  name: 'App',
  components: {
    FormPedido,
    TabelaPedido,
  },
  data() {

  }

}
</script>

<style>

</style>
