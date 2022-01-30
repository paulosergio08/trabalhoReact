import { Container } from "reactstrap";

export const Home = () => {
    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Home</h1>
                    </div>
                </div>
                    
                <div className="m-auto p-2">
                    <a href="/listar-cliente" className="btn btn-outline-success btn-sm">Clientes</a>
                    <a href="/listaservico" className="btn btn-outline-success btn-sm">Serviços</a>
                    <a href="/listar-pedido" className="btn btn-outline-success btn-sm">Pedidos</a>
                    <a href="/listar-produto" className="btn btn-outline-success btn-sm">Produtos</a>
                    <a href="/listar-compra" className="btn btn-outline-success btn-sm">Compras</a>
                </div>
                
            </Container>
        </div>
    );
};