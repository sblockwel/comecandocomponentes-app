<template>
  <div>
    <form id="formulario">
      <div class="campo">
        <label for="numero"> Número: </label><br />
        <input type="number" id="numero" autofocus required v-model="pedido.numero"/>
      </div>
      <div class="campo">
        <label for="data"> Data Emissão: </label>
        <input type="datetime-local" id="data" required v-model="pedido.data" />
      </div>
      <div class="campo">
        <label for="cliente"> Cliente: </label>
        <input type="select" id="cliente" required v-model="pedido.cliente" />
      </div>      
    </form>
  </div>

  <div>
    <br />
    <tabela-pedido :itensPedido="pedido.itens"></tabela-pedido>
  </div>

  <div>
    <button> Salvar</button>
    <button> Adicionar Pedido</button>
  </div>


</template>

<script>
import TabelaPedido from "./TabelaPedido.vue";

export default {
  name: "FormPedido",
  components: {
    TabelaPedido,
  },
  props: {
    pedidos: Array,
    qtdePedidos: Number,
  },
  data() {
    return {
      pedido: {
        numero: "",
        data: "",
        cliente: "",
        itens: [
            { produto: "teste 1", quantidade: 5, valorUnidade: 3.50, valorDesconto: 0.50, valorTotal: 15.0 },
            { produto: "produto 2", quantidade: 2, valorUnidade: 1.50, valorDesconto: 0.10, valorTotal: 2.80 }
        ],
      },
    };
  },
  methods: {
    adicionarPedido() {
      
    },
  },
};
</script>

<style>
#formulario {
  width: 60%;
  margin-left: 20%;
  padding: 45px 15px;
  height: 100px;
}

.campo {
  width: 40%;
  float: left;
}

.campo input {
  margin: 10px 1%;
  padding: 8px 1%;
  width: 90%;
}
</style>