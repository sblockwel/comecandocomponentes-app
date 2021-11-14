<template>
  <div>
    <div class="produto">
        <label for="produto"> Produto: </label>
        <select v-model="item.produto" >
          <option v-for="produto in produtos" :key="produto.id" :value="produto">
            {{ produto.nome }}
          </option>
        </select>
        <label for="item.quantidade"> Quantidade: </label>
        <input type="number" v-model="item.quantidade">

        <br/>
        <button @click="adicionarProduto()">Adicionar produto</button> 
        <br/>
    </div>

    <div class="filtro">
            <label>Filtro por produto</label><br/>
            <input type="text" v-model="procurar">
            <br/>
    </div>
    <table class="tabela">
        <th @click="ordenar('produto')" class="ordenar">Produto <font-awesome-icon :icon="getTipoOrdenacao('produto')" /> </th>
        <th @click="ordenar('quantidade')" class="ordenar">quantidade <font-awesome-icon :icon="getTipoOrdenacao('quantidade')" /> </th>
        <th @click="ordenar('valorUnidade')" class="ordenar">Valor unitário <font-awesome-icon :icon="getTipoOrdenacao('valorUnidade')" /></th>
        <th @click="ordenar('valorDesconto')" class="ordenar">Valor desconto <font-awesome-icon :icon="getTipoOrdenacao('valorDesconto')" /></th>
        <th @click="ordenar('valorTotal')" class="ordenar">Valor total <font-awesome-icon :icon="getTipoOrdenacao('valorTotal')" /></th>
        <th>Opções</th>

        <tr v-for="(i, idx) in itensPedido" :key="i.produto" :class="{ alteracao: alteracaoIdx == idx }" >
            <td id="produto" class="produtoClass" :contenteditable="getLinhaTabela(idx)">{{ i.produto.nome }}</td>
            <td id="quantidade" :contenteditable="getLinhaTabela(idx)">{{ i.quantidade }}</td>
            <td id="unidade" :contenteditable="getLinhaTabela(idx)">{{ i.produto.preco }}</td>
            <td id="desconto" :contenteditable="getLinhaTabela(idx)">{{ i.valorDesconto }}</td>
            <td id="total"> {{ calcularTotal(i) }}</td>
            <td>
                <button @click="remover(i)"> <font-awesome-icon icon="trash"/> </button>
                <button @click="alterar(idx)"> <font-awesome-icon :icon="getAlteracaoIcon(idx)"/> </button>
            </td>
        </tr>
    </table>

    <div class="totais">
      <p> Total pedido: R$ {{ calcularTotalPedido }}</p>
      <p> Quantidade item: {{ this.itens.length.toString() }}</p>
    </div>
  </div>  
</template>

<script>

import axios from 'axios'
export default {
  
  name: "TabelaPedido",
  props: {
    itensPedido: Array
  },
  data() {
    return {
        itens: [],
        item: {
            produto: null,
            quantidade: 0,
            valorUnidade: "",
            valorDesconto: "",
            valorTotal: "",
        },
        alteracaoIdx: -1,
        procurar: "", 
        ordemCampos: {
            nome: null,
            tipo: 'asc'
        },
        totalPedido: 0.00,
        qtdeItem: 0,
        produtos: [],
    }
  },
  methods: {
    remover(itemParaRemover) {
      if (confirm("Excluir registro?")) {
        this.itens = this.itens.filter(
          (p) => p != itemParaRemover
        );
      }
    },
    alterar(idx) {      
      if(this.alteracaoIdx == idx){
        this.itens[idx] = this.item
        this.reset()
      }
      else {
        this.item = Object.assign({}, this.itens[idx]);
        this.alteracaoIdx = idx;
      }
    },    
    adicionarProduto() {
        const itemSalvar = Object.assign({}, this.item)        
        this.itens.push(itemSalvar)     
        const indice = this.itens.length - 1;
        this.alteracaoIdx = indice

        if(this.item.quantidade <= 0){
          alert("campo quantidade não pode ser vazio ou 0!!!!!!!!!!")
          return 
        }
        if (this.item.produto == null || this.item.produto.id <= 0)  {
          alert("não tem produto selecionado!!")  
          return
        }
    },
    reset() {
      this.item = null
      this.alteracaoIdx = -1
    }, 
    getTipoOrdenacao(campo){
      if (campo == this.ordemCampos.nome) {
        if (this.ordemCampos.tipo == 'asc')
          return 'sort-up'
        return 'sort-down'
      }
      return 'sort'
    },
    ordenar(campo) {      
        if(campo == this.ordemCampos.nome) {
            this.ordemCampos.tipo = this.ordemCampos.tipo == 'asc' ? 'desc' :  'asc'
        } 
        this.ordemCampos.nome = campo
        const tipoOrdem = this.ordemCampos.tipo == 'asc' ? 1 : -1

        this.itens = this.itens.sort((a, b) =>
            a[campo].localeCompare(b[campo]) * tipoOrdem
        )      
    }, 
    getLinhaTabela(idx) {
      return idx == this.alteracaoIdx
    },
    getAlteracaoIcon(idx) {
        return idx == this.alteracaoIdx ? "check" : "pencil-alt"
    },
    getTdID(idx){
      return idx == this.alteracaoIdx ? "produtoEditavel" : "produto"
    },
    calcularTotal(i) {
      return i.valorTotal = (i.quantidade * i.valorUnidade) - i.valorDesconto
    }
  },
  watch: {
    itensPedido(val) {
      this.itens = val
    }
  },
  mounted() {
    this.itens = this.itensPedido,
    axios.get("http://localhost:8080/produto").then(response => {
                    this.produtos = response.data
        })

  },
  computed: {
    /*produtosFiltrados() {
        let item = []
        item = this.itens.filter(p => p = p.produto.toLowerCase().indexOf(this.procurar.toLowerCase()) > -1 )
        
        return item
    },*/
    calcularTotalPedido() { 
      return this.itens.map(i => i.valorTotal).reduce((a,b) => a + b, 0)
    },   
  }
};
</script>

<style>
.tabela {
  margin: auto;
}

table {
  border-collapse: collapse;
  width: 50%;
}

th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

tr:hover {
  background-color: #d4d4d4;
}
.botoes {
  width: 60%;
  margin-left: 20%;
  padding: 45px 15px;
  height: 100px;
}
</style>