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
        <select v-model="pedido.cliente" >
          <option v-for="cliente in clientes" :key="cliente.id" :value="cliente">
            {{ cliente.nome }}
          </option>
        </select>
      </div>      
    </form>
  </div>

  <div>
    <br />
    <tabela-pedido :itensPedido='pedido.itens'></tabela-pedido>
  </div>

  <div>
    <button @click="salvarPedido()" > Salvar</button>
    <button @click="adicionarPedido()" > Adicionar Pedido</button>
  </div>


</template>

<script>
import TabelaPedido from "./TabelaPedido.vue";
import axios from 'axios'
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
        itens: [],        
      },
      clientes: []
    };
  },
  mounted() {
    axios.get("http://localhost:8080/cliente").then(response => {
                    this.clientes = response.data
        })
  },
  methods: {
    adicionarPedido() {
      axios.post('http://localhost:8080/pedido', 
              this.pedido)
              .then((response) => {
                  if (this.pedido.id == null) {
                      this.mensagem = "Registro adicionado " + response.data
                      this.pedido.id = response.data
                  }
                  else
                      this.mensagem = "Registro alterado " + response.data
              })
              .catch(error => 
                  alert(error)
              )
    },
    salvarPedido() {
      if (this.pedido.numero == '' || this.pedido.data == '' || this.pedido.cliente == '' || this.pedido.itens.length == 0) {
        confirm("Todos os campos devem ser preenchidos!")
        return false        
      } else {
        confirm("Campos validados!")
        return true
      }
    },
    reset() {
      this.pedido.numero = "",
      this.pedido.data = "",
      this.pedido.cliente = 0
    }
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