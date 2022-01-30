import axios from "axios";
import { api } from "../../config";
import { useState } from 'react';
import { Button, Container, Form, FormGroup, Label, Input, Alert, Row, Col } from "reactstrap";
//  import { FiPlusCircle } from "react-icons/fi";
import { Link } from "react-router-dom";

export const NovoPedido = () => {

    const [pedido, setPedido] = useState({
        data: "",
        ClienteId: ""
    });

    const [itens, setItem] = useState([
        {
            ServicoId: "",
            quantidade: "",
            valor: ""
        }
    ]);

    const [status, setStatus] = useState({
        type: "",
        message: ""
    });

    const valorInputPedido = e => setPedido({
        ...pedido, [e.target.name]: e.target.value
    });

    const valorInputItem = (e, i) => {
        const { name, value } = e.target;
        const lista = [...itens]
        lista[i][name] = value;
        setItem(lista);
    }

    const addItem = () => {
        setItem([...itens, {
            ServicoId: "",
            quantidade: "",
            valor: ""
        }]);
    }

    const botaoRemoverItem = (i) => {
        const lista = [...itens];
        lista.splice(i, 1);
        setItem(lista);
    }

    const cadPedido = async e => {
        e.preventDefault();

        const headers = {
            "Content-Type": "application/json"
        };

        await axios.post(api + "/pedidos/novopedido", pedido, { headers }).then((response) => {
            setStatus({
                type: "success",
                message: response.data.message
            });

            itens.forEach(function (item, i) {
                cadItem(response.data.ped.id, item, i);
            });

        }).catch((response) => {
            setStatus({
                type: "error",
                message: response.data.message
            });
        });
    };

    // function para cadastro do itemPedido
    const cadItem = async (PedidoId, item) => {

        const headers = {
            "Content-Type": "application/json"
        };

        await axios.post(api + "/pedidos/" + PedidoId + "/novo_item_pedido", item, { headers });
    };

    return (
        <Container>
            <div className="d-flex justify-content-between">
                <div className="p-2">
                    <h1>Cadastrar Pedido</h1>
                </div>
            </div>

            {status.type === "error" ? <Alert color="danger">{status.message}</Alert> : ""}
            {status.type === "success" ? <Alert color="success">{status.message}</Alert> : ""}

            <Form className="p-2" onSubmit={cadPedido}>
                <FormGroup className="p-2">
                    <Label>Data</Label>
                    <Input type="date" name="data" placeholder="Data do pedido" value={pedido.data} onChange={valorInputPedido} />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>Cliente ID</Label>
                    <Input type="text" name="ClienteId" placeholder="Número ID do cliente" value={pedido.ClienteId} onChange={valorInputPedido} />
                </FormGroup>

                {itens.map((item, i) => {
                    return (
                        <div>
                            <FormGroup id={i} key={i}>
                                <Row>
                                    <Col xs lg="2">
                                        <Label>Serviço ID</Label>
                                        <Input type="text" name="ServicoId" placeholder="ID do serviço" value={item.ServicoId} onChange={e => valorInputItem(e, i)} />
                                    </Col>

                                    <Col xs lg="2">
                                        <Label>Quantidade</Label>
                                        <Input type="text" name="quantidade" placeholder="Quantidade" value={item.quantidade} onChange={e => valorInputItem(e, i)} />
                                    </Col>

                                    <Col>
                                        <Label>Preço</Label>
                                        <Input type="text" name="valor" placeholder="Valor do serviço" value={item.valor} onChange={e => valorInputItem(e, i)} />
                                    </Col>

                                    <Col className="d-flex justify-content-left align-items-end" xs lg="1">
                                        {itens.length !== 1 &&
                                            <Button value="Remover" className="btn btn-sm btn-danger" onClick={() => botaoRemoverItem(i)}>X</Button>}
                                    </Col>
                                </Row>
                            </FormGroup>
                        </div>
                    );
                })}

                <Button style={{ borderRadius: 40 }} outline value="AdicionarItem" onClick={addItem}> item</Button>

                <div className="d-flex justify-content-between">
                    <div></div>
                    <Col className="d-flex flex-row-reverse">
                        <Button type="submit" outline color="success">Cadastrar</Button>
                        <Link to="/pedidos" className="btn btn-outline-secondary btn">Voltar</Link>
                    </Col>
                </div>
            </Form>
        </Container>
    );
};