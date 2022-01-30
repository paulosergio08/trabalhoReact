import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";

import { api } from "../../config";

export const ItemPedido = (props) => {

    const [data, setData] = useState([]);

    const [id] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: "",
        message: ""
    });

    const getItens = async () => {
        await axios.get(api + "/servicos/" + id + "/pedidos").then((response) => {
            setData(response.data.item);
        }).catch(() => {
            setStatus({
                type: "error",
                message: "Erro: sem conexão com a API."
            });
        });
    }

    useEffect(() => {
        getItens();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex justify-content-between">
                    <div className="p-2">
                        <h1>Pedidos do Serviço</h1>
                    </div>

                    <div className="d-flex align-items-center p-2">
                        <h3 className="text-info">#{id}</h3>
                    </div>
                </div>

                {status.type === "error" ? <Alert color="danger">{status.message}</Alert> : ""}

                <Table striped>
                    <thead>
                        <tr>
                            <th>Pedido ID</th>
                            <th>Quantidade</th>
                            <th>Valor</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.ServicoId}>
                                <th>{item.PedidoId}</th>
                                <td>{item.quantidade}</td>
                                <td>{item.valor.toLocaleString("pt-br", { style: "currency", currency: "BRL"})}</td>
                                <td>
                                    <Link to={"/pedidos/" + item.PedidoId + "/servicos"} className="btn btn-outline-info btn-sm">Consultar</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};