import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Home } from './views/Home/';
import { Menu } from "./components/Menu";

import { NovoCliente } from "./views/Clientes/Cadastrar";
import { Clientes } from "./views/Clientes/Clientes";
import { Cliente } from "./views/Clientes/Consultar";
import { AtualizarCliente } from "./views/Clientes/Atualizar";

import { NovoPedido } from "./views/Pedidos/Cadastrar";
import { Pedidos } from "./views/Pedidos/Pedidos";
import { Pedido } from "./views/Pedidos/Consultar";
import { AtualizarPedido } from "./views/Pedidos/Atualizar";

import { NovoServico } from "./views/Servicos/Cadastrar";
import { Servicos } from "./views/Servicos/Servicos";
import { ItemPedido } from "./views/Servicos/Consultar";
import { AtualizarServico } from "./views/Servicos/Atualizar";

import { NovoProduto } from "./views/Produtos/Cadastrar";
import { Produtos } from "./views/Produtos/Produtos";
import { ItemCompra } from "./views/Produtos/Consultar";
import { AtualizarProduto } from "./views/Produtos/Atualizar";

import { NovaCompra } from "./views/Compras/Cadastrar";
import { Compras } from "./views/Compras/Compras";
import { Compra } from "./views/Compras/Consultar";
import { AtualizarCompra } from "./views/Compras/Atualizar";

function App() {
  return (
    <div>
      <Router>
        <Menu />
        <Switch>
          <Route exact path="/" component={Home} />

          <Route path="/novocliente" component={NovoCliente} />
          <Route path="/clientes/:id" component={Cliente} />
          <Route path="/clientes" component={Clientes} />
          <Route path="/atualizarcliente/:id" component={AtualizarCliente} />

          <Route path="/novopedido" component={NovoPedido} />
          <Route path="/pedidos/:id" component={Pedido} />
          <Route path="/pedidos" component={Pedidos} />
          <Route path="/atualizarpedido/:id" component={AtualizarPedido} />

          <Route path="/novoservico" component={NovoServico} />
          <Route path="/servicos/:id/pedidos" component={ItemPedido} />
          <Route path="/servicos" component={Servicos} />
          <Route path="/atualizarservico/:id" component={AtualizarServico} />

          <Route path="/novoproduto" component={NovoProduto} />
          <Route path="/produtos/:id/compras" component={ItemCompra} />
          <Route path="/produtos" component={Produtos} />
          <Route path="/atualizarproduto/:id" component={AtualizarProduto} />

          <Route path="/novacompra" component={NovaCompra} />
          <Route path="/compras/:id" component={Compra} />
          <Route path="/compras" component={Compras} />
          <Route path="/atualizarcompra/:id" component={AtualizarCompra} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;