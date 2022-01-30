import axios from "axios";
import { api } from "../../config";
import { Alert, Container, Table } from "reactstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Compras = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: "",
        message: ""
    });

    const getCompras = async () => {
        await axios.get(api + "/compras").then((response) => {
            setData(response.data.compras);
        }).catch((response) => {
            setStatus({
                type: "error",
                message: response.data.message
            });
        });
    };

    const excluir = async (id) => {
        const headers = {
            "Content-Type": "application/json"
        };

        await axios.get(api + "/compras/" + id + "/excluircompra", { headers }).then((response) => {
            setStatus({
                type: "success",
                message: response.data.message
            });
            getCompras();
        }).catch((response) => {
            setStatus({
                type: "error",
                message: response.data.message
            });
        });
    };

    useEffect(() => {
        getCompras();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex justify-content-between">
                    <div className="p-2">
                        <h1>Lista de Compras ({data.length})</h1>
                    </div>

                    <div className="d-flex align-items-center p-2">
                        <Link to="/novacompra" className="btn btn-outline-info btn-sm">Nova Compra</Link>
                    </div>
                </div>

                {status.type === "error" ? <Alert color="danger">{status.message}</Alert> : ""}

                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Cliente</th>
                            <th>Data</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <th>{item.id}</th>
                                <td>{item.ClienteId}</td>
                                <td>{item.data}</td>
                                <td>
                                    <Link to={"/compras/" + item.id + "/produtos"} className="btn btn-outline-info btn-sm">Consultar</Link>
                                    <Link to={"/atualizarcompra/" + item.id} className="btn btn-outline-warning btn-sm">Editar</Link>
                                    <span className="btn btn-outline-danger btn-sm" onClick={() => excluir(item.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};