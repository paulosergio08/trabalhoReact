import axios from "axios";
import { useEffect, useState } from "react"
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../config";

export const AtualizarProduto = (props) => {

    const [status, setStatus] = useState({
        type: "",
        message: ""
    });

    const [ProdutoId] = useState(props.match.params.id);

    const [produto, setProduto] = useState({
        nome: "",
        descricao: ""
    });

    const valorInput = e => setProduto({
        ...produto, [e.target.name]: e.target.value
    });

    const limparInput = () => setProduto({
        nome: "",
        descricao: ""
    });

    const getProduto = async () => {
        await axios.get(api + "/produtos/" + ProdutoId).then((response) => {
            setProduto(response.data.prod);
        }).catch(() => {
            setStatus({
                type: "error",
                message: "Erro: Sem conexão com a API."
            });
        });
    };

    const atualizar = async e => {
        e.preventDefault();

        const headers = {
            "Content-Type": "application/json"
        };

        await axios.put(api + "/produtos/" + ProdutoId + "/atualizarproduto", produto, { headers }).then((response) => {
            setStatus({
                type: "success",
                message: response.data.message
            });
        }).catch(() => {
            setStatus({
                type: "error",
                message: "Erro: Sem conexão com a API."
            });
        });
    };

    useEffect(() => {
        getProduto();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="p-2">
                        <h1>Alterar dados do produto</h1>
                    </div>
                </div>

                {status.type === "success" ? <Alert color="success">{status.message}</Alert> : ""}
                {status.type === "error" ? <Alert color="danger">{status.message}</Alert> : ""}

                <Form className="p-2" onSubmit={atualizar}>
                    <FormGroup className="p-2">
                        <Label>Nome</Label>
                        <Input type="text" name="nome" placeholder="Nome do produto" value={produto.nome} onChange={valorInput} />
                    </FormGroup>

                    <FormGroup className="p-2">
                        <Label>Descrição</Label>
                        <Input type="text" name="descricao" placeholder="Descrição do produto" value={produto.descricao} onChange={valorInput} />
                    </FormGroup>

                    <Button type="submit" className="m-2" outline color="success">Salvar</Button>
                    <Button type="button" className="m-2" outline color="secondary" onClick={limparInput}>Limpar</Button>
                </Form>
            </Container>
        </div>
    );
};