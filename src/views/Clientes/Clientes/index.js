import {axios} from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";
import { api } from "../../config";
import { Cliente } from "../Consultar";

export const Clientes = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: "",
        message: ""
    });

    const getClientes = async () => {
        await axios.get(api + "/clientes").then((response) => {
            setData(response.data.clientes);
        }).catch(() => {
            setStatus({
                type: "error",
                message: "Erro: sem conexão com a API."
            });
        });
    };

    const excluir = async (id) => {
        const headers = {
            "Content-Type": "application/json"
        };

        await axios.get(api + "/clientes/" + id + "/excluircliente", { headers }).then((response) => {
            setStatus({
                type: "success",
                message: response.data.message
            });
            getClientes();
        }).catch((response) => {
            setStatus({
                type: "error",
                message: response.data.message
            });
        });
    };

    useEffect(() => {
        getClientes();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex justify-content-between">
                    <div className="p-2">
                        <h1>Lista de Clientes ({data.length})</h1>
                    </div>

                    <div className="d-flex align-items-center p-2">
                        <Link to="/novocliente" className="btn btn-outline-info btn-sm">Novo Cliente</Link>
                    </div>
                </div>

                {status.type === "error" ? <Alert color="danger"> {status.message} </Alert> : ""}

                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Endereço</th>
                            <th>Cidade</th>
                            <th>UF</th>
                            <th>Nascimento</th>
                            <th>Cliente desde</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <th>{item.id}</th>
                                <td>{item.nome}</td>
                                <td>{item.endereco}</td>
                                <td>{item.cidade}</td>
                                <td>{item.uf}</td>
                                <td>{item.nascimento}</td>
                                <td>{item.clienteDesde}</td>
                                <td>
                                    <Link to={"/clientes/" + item.id} className="btn btn-outline-info btn-sm">Consultar</Link>
                                    <Link to={"/atualizarcliente/" + item.id} className="btn btn-outline-warning btn-sm">Editar</Link>
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