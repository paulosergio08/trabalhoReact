import axios from "axios";
import { api } from "../../config";
import { Alert, Container, Table } from "reactstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Produtos = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: "",
        message: ""
    });

    const getProdutos = async () => {
        await axios.get(api + "/produtos").then((response) => {
            setData(response.data.produtos);
        }).catch(() => {
            setStatus({
                type: "error",
                message: "Erro: Sem conexão com a API."
            });
        });
    };

    const excluir = async (id) => {
        const headers = {
            "Content-Type": "application/json"
        };

        await axios.get(api + "/produtos/" + id + "/excluir", { headers }).then((response) => {
            setStatus({
                type: "success",
                message: response.data.message
            });
            getProdutos();
        }).catch(() => {
            setStatus({
                type: "error",
                message: "Erro: Sem conexão com a API."
            });
        });
    };

    useEffect(() => {
        getProdutos();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex justify-content-between">
                    <div className="p-2">
                        <h1>Lista de Produtos ({data.length})</h1>
                    </div>

                    <div className="d-flex align-items-center p-2">
                        <Link to="/novoproduto" className="btn btn-outline-info btn-sm">Novo Produto</Link>
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
                                    <Link to={"/produtos/" + item.id + "/compras"} className="btn btn-outline-info btn-sm">Consultar</Link>
                                    <Link to={"/atualizarproduto/" + item.id} className="btn btn-outline-warning btn-sm">Editar</Link>
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