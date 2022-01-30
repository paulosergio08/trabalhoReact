import axios from "axios";
import { api } from "../../config";
import { Alert, Container, Table } from "reactstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Pedido = (props) => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: "",
        message: ""
    });

    const [id] = useState(props.match.params.id);

    const getPedido = async () => {
        await axios.get(api + "/pedidos/" + id).then((response) => {
            setData(response.data.ped.servicos_ped);
        }).catch((response) => {
            setStatus({
                type: "error",
                message: response.data.message
            });
        });
    };

    const excluirItem = async (idPed, idServ) => {
        const headers = {
            "Content-Type": "application/json"
        };

        await axios.get(api + "/itens_pedido/" + idPed + "/" + idServ + "/excluiritem", { headers }).then((response) => {
            setStatus({
                type: "success",
                message: response.data.message
            });
        }).catch((response) => {
            setStatus({
                type: "error",
                message: response.data.message
            });
        });

        getPedido();
    };

    useEffect(() => {
        getPedido();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex justify-content-between">
                    <div className="p-2">
                        <h1>Serviços do Pedido</h1>
                    </div>

                    <div className="d-flex align-items-center p-2">
                        <h3 className="text-info">#{id}</h3>
                    </div>
                </div>

                {status.type === "error" ? <Alert color="danger">{status.message}</Alert> : ""}

                <Table striped>
                    <thead>
                        <tr>
                            <th>Serviço ID</th>
                            <th>Nome</th>
                            <th>Quantidade</th>
                            <th>Valor</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <th>{item.ItemPedido.ServicoId}</th>
                                <td>{item.nome}</td>
                                <td>{item.ItemPedido.quantidade}</td>
                                <td>{item.ItemPedido.valor.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</td>
                                <td>
                                    <Link to={"/servicos/" + item.ItemPedido.ServicoId + "/pedidos"} className="btn btn-outline-info btn-sm">Consultar</Link>
                                    <span className="btn btn-outline-danger btn-sm" onClick={() => excluirItem(item.ItemPedido.PedidoId, item.ItemPedido.ServicoId)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};