import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";
import { api } from "../../config";

// import { api } from "../../config";

export const Servicos = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: "",
        message: ""
    });

    const getServicos = async () => {
        await axios.get(api + "/servicos").then((response) => {
            setData(response.data.servicos);
        }).catch(() => {
            setStatus({
                type: "error",
                message: "Erro: sem conexão com a API."
            });
        });
    }

    const excluir = async (id) => {
        const headers = {
            "Content-Type": "application/json"
        };

        await axios.get(api + "/servicos/" + id + "/excluirservico", { headers }).then((response) => {
            setStatus({
                type: "success",
                message: response.data.message
            });
            getServicos();
        }).catch(() => {
            setStatus({
                type: "error",
                message: "Erro: Sem conexão com a API."
            });
        });
    };

    useEffect(() => {
        getServicos();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex justify-content-between">
                    <div className="p-2">
                        <h1>Lista de Serviços ({data.length})</h1>
                    </div>

                    <div className="d-flex align-items-center p-2">
                        <Link to="/novoservico" className="btn btn-outline-info btn-sm">Novo Serviço</Link>
                    </div>
                </div>

                {status.type === "error" ? <Alert color="danger">{status.message}</Alert> : ""}

                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <th>{item.id}</th>
                                <td>{item.nome}</td>
                                <td>{item.descricao}</td>
                                <td>
                                    <Link to={"/servicos/" + item.id + "/pedidos"} className="btn btn-outline-info btn-sm">Consultar</Link>
                                    <Link to={"/atualizarservico/" + item.id} className="btn btn-outline-warning btn-sm">Editar</Link>
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