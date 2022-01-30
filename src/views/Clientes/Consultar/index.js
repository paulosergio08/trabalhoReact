import axios from "axios";
import { api } from "../../config";
import { Alert, Container, Table } from "reactstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Cliente = (props) => {

    const [dataPedido, setDataPedido] = useState([]);
    const [dataCompra, setDataCompra] = useState([]);

    const [status, setStatus] = useState({
        type: "",
        message: ""
    });

    const [id] = useState(props.match.params.id);

    const getCliente = async () => {
        await axios.get(api + "/clientes/" + id).then((response) => {
            setDataPedido(response.data.clnt.pedidos);
            setDataCompra(response.data.clnt.compras);
        }).catch(() => {
            setStatus({
                type: "error",
                message: "Erro: Sem conexão com a API."
            });
        });
    };

    useEffect(() => {
        getCliente();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex justify-content-between">
                    <div className="p-2">
                        <h1>Pedidos</h1>
                    </div>

                    <div className="d-flex align-items-center p-2">
                        <h3 className="text-info">Cliente #{id}</h3>
                    </div>
                </div>

                {status.type === "error" ? <Alert color="danger">{status.message}</Alert> : ""}

                <Table striped>
                    <thead>
                        <tr>
                            <th>Pedido ID</th>
                            <th>Data</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataPedido.map(item => (
                            <tr key={item.id}>
                                <th>{item.id}</th>
                                <td>{item.data}</td>
                                <td>
                                    <Link to={"/pedidos/" + item.id + "/servicos"} className="btn btn-outline-info btn-sm">Consultar</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>

            <Container>
                <div className="d-flex">
                    <div className="p-2">
                        <h1>Compras</h1>
                    </div>
                </div>

                {status.type === "error" ? <Alert color="danger">{status.message}</Alert> : ""}

                <Table striped>
                    <thead>
                        <tr>
                            <th>Compra ID</th>
                            <th>Data</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataCompra.map(item => (
                            <tr key={item.id}>
                                <th>{item.id}</th>
                                <td>{item.data}</td>
                                <td className>
                                    <Link to={"/compras/" + item.id + "/produtos"} className="btn btn-outline-info btn-sm">Consultar</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};