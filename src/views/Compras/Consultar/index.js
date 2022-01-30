import axios from "axios";
import { api } from "../../config";
import { Alert, Container, Table } from "reactstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Compra = (props) => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: "",
        message: ""
    });

    const [id] = useState(props.match.params.id);

    const getCompra = async () => {
        await axios.get(api + "/compras/" + id).then((response) => {
            setData(response.data.comp.produtos_compra);
        }).catch((response) => {
            setStatus({
                type: "error",
                message: response.data.message
            });
        });
    };

    const excluirItem = async (idCompra, idProd) => {
        const headers = {
            "Content-Type": "application/json"
        };

        await axios.get(api + "/itens_compra/" + idCompra + "/" + idProd + "/excluiritem", { headers }).then((response) => {
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

        getCompra();
    };

    useEffect(() => {
        getCompra();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex justify-content-between">
                    <div className="p-2">
                        <h1>Produtos da Compra</h1>
                    </div>

                    <div className="d-flex align-items-center p-2">
                        <h3 className="text-info">#{id}</h3>
                    </div>
                </div>

                {status.type === "error" ? <Alert color="danger">{status.message}</Alert> : ""}

                <Table striped>
                    <thead>
                        <tr>
                            <th>Produto ID</th>
                            <th>Nome</th>
                            <th>Quantidade</th>
                            <th>Valor</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <th>{item.ItemCompra.ProdutoId}</th>
                                <td>{item.nome}</td>
                                <td>{item.ItemCompra.quantidade}</td>
                                <td>{item.ItemCompra.valor.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</td>
                                <td>
                                    <Link to={"/produtos/" + item.ItemCompra.ProdutoId + "/compras"} className="btn btn-outline-info btn-sm">Consultar</Link>
                                    <span className="btn btn-outline-danger btn-sm" onClick={() => excluirItem(item.ItemCompra.CompraId, item.ItemCompra.ProdutoId)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};