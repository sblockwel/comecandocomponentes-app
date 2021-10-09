<template>
    <div >
        <div class="botoes">
            <button>Adicionar produto</button>
            <button>Excluir produto</button>
            <button>Editar produto</button>
        </div>
        <table class="tabela">
            <th >Produto </th>
            <th >Quantidade </th>
            <th >Valor unitário </th>
            <th >Valor desconto </th>
            <th >Total </th>

            <tr v-for="(p, idx) in item" :key="p.produto" :class="{ 'alteracao': alteracaoIdx == idx }">
            <td id='produto' >{{p.produto}}</td>
            <td id='quantidade' >{{p.quantidade}}</td>
            <td id='unidade' >{{p.unidade}}</td>
            <td id='desconto' >{{p.desconto}}</td>
            <td id='total' >{{p.total}}</td>
            <!--
            <td>
                <button @click="alterar(idx)"><font-awesome-icon icon="pencil-alt" /></button>
                <button @click="remover(p)"> <font-awesome-icon icon="trash" /> </button>
            </td>
            -->
            </tr>
        </table>    
    </div>
</template>

<script>
export default {
    props: {
        pedidos: Array,
        qtdePedidos: Number,
    },
    data() {
        return {
            item: {
                produto: '',
                quantidade: '',
                unidade: '',
                desconto: '',
                total: '',
            }
        }
    },
    methods: {
        adicionarItemPedido() {
      
        }    
    },
    
}
</script>

<style>
.tabela {
  margin: auto;
}

table {
    border-collapse: collapse;
    width: 50%;
}

th, td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

tr:hover{
  background-color:#d4d4d4

}
.botoes{
    width: 60%; 
    margin-left: 20%;
    padding: 45px 15px;
    height: 100px;
}
</style>