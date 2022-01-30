import axios from "axios";
import { useEffect, useState } from "react"
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../config";

export const AtualizarPedido = (props) => {

    const [status, setStatus] = useState({
        type: "",
        message: ""
    });

    const [PedidoId] = useState(props.match.params.id);

    const [pedido, setPedido] = useState({
        data: "",
        ClienteId: ""
    });

    const valorInput = e => setPedido({ ...pedido, [e.target.name]: e.target.value });

    const limparInput = () => setPedido({
        data: "",
        ClienteId: ""
    });

    const getPedido = async () => {
        await axios.get(api + "/pedidos/" + PedidoId).then((response) => {
            setPedido(response.data.ped);
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

        await axios.put(api + "/pedidos/" + PedidoId + "/atualizarpedido", pedido, { headers }).then((response) => {
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
        getPedido();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="p-2">
                        <h1>Alterar dados do pedido</h1>
                    </div>
                </div>

                {status.type === "error" ? <Alert color="danger">{status.message}</Alert> : ""}
                {status.type === "success" ? <Alert color="success">{status.message}</Alert> : ""}

                <Form className="p-2" onSubmit={atualizar}>
                    <FormGroup className="p-2">
                        <Label>Data</Label>
                        <Input type="date" name="data" placeholder="Data do pedido" value={pedido.data} onChange={valorInput} />
                    </FormGroup>

                    <FormGroup className="p-2">
                        <Label>Cliente Id</Label>
                        <Input type="text" name="ClienteId" placeholder="Número ID do cliente" value={pedido.ClienteId} onChange={valorInput} />
                    </FormGroup>

                    <Button type="submit" className="m-2" outline color="success">Salvar</Button>
                    <Button type="button" className="m-2" outline color="secondary" onClick={limparInput}>Limpar</Button>
                </Form>
            </Container>
        </div>
    );
};