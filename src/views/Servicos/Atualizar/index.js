import axios from "axios";
import { useEffect, useState } from "react"
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../config";

export const AtualizarServico = (props) => {

    const [status, setStatus] = useState({
        type: "",
        message: ""
    });

    const [ServicoId] = useState(props.match.params.id);

    const [servico, setServico] = useState({
        nome: "",
        descricao: ""
    });

    const valorInput = e => setServico({
        ...servico, [e.target.name]: e.target.value
    });

    const limparInput = () => setServico({
        nome: "",
        descricao: ""
    });

    const getServico = async () => {
        await axios.get(api + "/servicos/" + ServicoId).then((response) => {
            setServico(response.data.serv);
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

        await axios.put(api + "/servicos/" + ServicoId + "/atualizarservico", servico, { headers }).then((response) => {
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
        getServico();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="p-2">
                        <h1>Alterar dados do serviço</h1>
                    </div>
                </div>

                {status.type === "success" ? <Alert color="success">{status.message}</Alert> : ""}
                {status.type === "error" ? <Alert color="danger">{status.message}</Alert> : ""}

                <Form className="p-2" onSubmit={atualizar}>
                    <FormGroup className="p-2">
                        <Label>Nome</Label>
                        <Input type="text" name="nome" placeholder="Nome do serviço" value={servico.nome} onChange={valorInput} />
                    </FormGroup>

                    <FormGroup className="p-2">
                        <Label>Descrição</Label>
                        <Input type="text" name="descricao" placeholder="Descrição do serviço" value={servico.descricao} onChange={valorInput} />
                    </FormGroup>

                    <Button type="submit" className="m-2" outline color="success">Salvar</Button>
                    <Button type="button" className="m-2" outline color="secondary" onClick={limparInput}>Limpar</Button>
                </Form>
            </Container>
        </div>
    );
};