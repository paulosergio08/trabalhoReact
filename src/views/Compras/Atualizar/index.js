import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../config";

export const AtualizarCompra = (props) => {

    const [status, setStatus] = useState({
        type: "",
        message: ""
    });
    const [CompraId] = useState(props.match.params.id);

    const [compra, setCompra] = useState({
        data: "",
        ClienteId: ""
    });

    const valorInput = e => setCompra({ ...compra, [e.target.name]: e.target.value });

    const limparInput = () => setCompra({
        data: "",
        ClienteId: ""
    });

    const getCompra = async () => {
        await axios.get(api + "/compras/" + CompraId).then((response) => {
            setCompra(response.data.comp);
        }).catch((response) => {
            setStatus({
                type: "error",
                message: response.data.message
            });
        });
    };

    const atualizar = async e => {
        e.preventDefault();

        const headers = {
            "Content-Type": "application/json"
        };

        await axios.put(api + "/compras/" + CompraId + "/atualizarcompra", compra, { headers }).then((response) => {
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
        getCompra();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="p-2">
                        <h1>Alterar dados da compra</h1>
                    </div>
                </div>

                {status.type === "error" ? <Alert color="danger">{status.message}</Alert> : ""}
                {status.type === "success" ? <Alert color="success">{status.message}</Alert> : ""}

                <Form className="p-2" onSubmit={atualizar}>
                    <FormGroup className="p-2">
                        <Label>Data</Label>
                        <Input type="date" name="data" placeholder="Data da compra" value={compra.data} onChange={valorInput} />
                    </FormGroup>

                    <FormGroup className="p-2">
                        <Label>Cliente Id</Label>
                        <Input type="text" name="ClienteId" placeholder="Número ID do cliente" value={compra.ClienteId} onChange={valorInput} />
                    </FormGroup>

                    <Button type="submit" className="m-2" outline color="success">Salvar</Button>
                    <Button type="button" className="m-2" outline color="secondary" onClick={limparInput}>Limpar</Button>
                </Form>
            </Container>
        </div>
    );
};