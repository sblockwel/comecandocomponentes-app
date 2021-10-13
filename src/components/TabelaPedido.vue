<template>
  <div>
    <div class="botoes">
        <button @click="adicionar()">Adicionar produto</button>
        <div class="filtro">
            <label>Filtro por produto</label><br/>
            <input type="text" v-model="procurar">
        </div>
    </div>
    <table class="tabela">
        <th @click="ordenar('produto')" class="ordenar">Produto <font-awesome-icon :icon="getTipoOrdenacao('produto')" /> </th>
        <th @click="ordenar('quantidade')" class="ordenar">quantidade <font-awesome-icon :icon="getTipoOrdenacao('quantidade')" /> </th>
        <th @click="ordenar('valorUnidade')" class="ordenar">Valor unitário <font-awesome-icon :icon="getTipoOrdenacao('valorUnidade')" /></th>
        <th @click="ordenar('valorDesconto')" class="ordenar">Valor desconto <font-awesome-icon :icon="getTipoOrdenacao('valorDesconto')" /></th>
        <th @click="ordenar('valorTotal')" class="ordenar">Valor total <font-awesome-icon :icon="getTipoOrdenacao('valorTotal')" /></th>
        <th>Opções</th>

        <tr v-for="(i, idx) in produtosFiltrados" :key="i.produto" :class="{ alteracao: alteracaoIdx == idx }" >
            <td id="produto">{{ i.produto }}</td>
            <td id="quantidade">{{ i.quantidade }}</td>
            <td id="unidade">{{ i.valorUnidade }}</td>
            <td id="desconto">{{ i.valorDesconto }}</td>
            <td id="total">{{ i.valorTotal }}</td>
            <td>
                <button @click="remover(i)"> <font-awesome-icon icon="trash"/> </button>
                <button @click="alterar(idx)"> <font-awesome-icon icon="pencil-alt"/> </button>
            </td>
        </tr>
    </table>

    <div class="totais">
      <p> Total pedido: R$ {{ calcularTotal }}</p>
      <p> Quantidade item: {{  this.itens.length.toString() }}</p>
    </div>
  </div>  
</template>

<script>
export default {
  name: "TabelaPedido",
  props: {
    itensPedido: Array,
    qtdePedidos: Number,
  },
  data() {
    return {
        itens: [
            { produto: "teste 1", quantidade: "5", valorUnidade: "3.50", valorDesconto: "0.50", valorTotal: "15.0" },
            { produto: "produto 2", quantidade: "2", valorUnidade: "1.50", valorDesconto: "0.10", valorTotal: "2.80" }
        ],
        item: {
            produto: "",
            quantidade: "",
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
      this.item = Object.assign({}, this.itens[idx]);
      this.alteracaoIdx = idx;
    },    
    adicionar() {
        const itemSalvar = Object.assign({}, this.item)

        if (this.alteracaoIdx > -1) {
            this.itens[this.alteracaoIdx] = itemSalvar
        } else {
            this.itens.push(itemSalvar)
        }
        this.reset()      
    },
    reset() {
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
    /*calculaTotal() {
      return this.itens.reduce((a, b) => ({ total: a.total + b.total })).total
      /*return this.itens.map(prod => {
                    this.totalPedido += prod.valorTotal;
                })
    }, */ 
  },
  computed: {
    produtosFiltrados() {
        let item = []
        item = this.itens.filter(p => p = p.produto.toLowerCase().indexOf(this.procurar.toLowerCase()) > -1 )
        
        return item
    },
    calcularTotal() { 
      let valor = 0;
      //let array = this.itens.valorTotal;
      //const reducer = (a, b) => previousValue + currentValue;

      valor = this.itens.reduce((a, b) => a.valorTotal + b.valorTotal ).valorTotal

      return valor
    }
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