import axios from "axios";
import { api } from "../../config";
import { useState } from 'react';
import { Button, Container, Form, FormGroup, Label, Input, Alert } from "reactstrap"

export const NovoProduto = () => {

    const [produto, setProduto] = useState({
        nome: "",
        descricao: ""
    });

    const [status, setStatus] = useState({
        type: "",
        message: ""
    });

    const valorInput = e => setProduto({
        ...produto, [e.target.name]: e.target.value
    });

    const limparInput = () => setProduto({
        nome: "",
        descricao: ""
    });

    const cadProduto = async e => {
        e.preventDefault();

        const headers = {
            "Content-Type": "application/json"
        };

        await axios.post(api + "/produtos/novoproduto", produto, { headers }).then((response) => {
            if (response.data.error) {
                setStatus({
                    type: "error",
                    message: response.data.message
                });
            } else {
                setStatus({
                    type: "success",
                    message: response.data.message
                });
            };
        }).catch(() => {
            console.log("Erro: Sem conexão com a API.");
        });
    };

    return (
        <Container>
            <div className="d-flex">
                <div className="p-2">
                    <h1>Cadastrar Produto</h1>
                </div>
            </div>

            {status.type === "error" ? <Alert color="danger">{status.message}</Alert> : ""}
            {status.type === "success" ? <Alert color="success">{status.message}</Alert> : ""}

            <Form className="p-2" onSubmit={cadProduto}>
                <FormGroup className="p-2">
                    <Label>Nome</Label>
                    <Input type="text" name="nome" placeholder="Nome do produto" value={produto.nome} onChange={valorInput} />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>Descrição</Label>
                    <Input type="text" name="descricao" placeholder="Descrição do produto" value={produto.descricao} onChange={valorInput} />
                </FormGroup>

                <Button className="m-2" type="submit" outline color="success">Cadastrar</Button>
                <Button className="m-2" type="button" outline color="secondary" onClick={limparInput}>Limpar</Button>
            </Form>
        </Container>
    );
};