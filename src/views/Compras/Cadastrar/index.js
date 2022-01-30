import axios from "axios";
import { api } from "../../config";
import { useState } from 'react';
import { Button, Container, Form, FormGroup, Label, Input, Alert, Col, Row } from "reactstrap"
import { Link } from "react-router-dom";
// import { FiPlusCircle } from "react-icons/fi";

export const NovaCompra = () => {

    const [compra, setCompra] = useState({
        data: "",
        ClienteId: ""
    });

    const [itens, setItem] = useState([
        {
            ProdutoId: "",
            quantidade: "",
            valor: ""
        }
    ]);

    const [status, setStatus] = useState({
        type: "",
        message: ""
    });

    const valorInputCompra = e => setCompra({
        ...compra, [e.target.name]: e.target.value
    });

    const valorInputItem = (e, i) => {
        const { name, value } = e.target;
        const lista = [...itens]
        lista[i][name] = value;
        setItem(lista);
    }

    const botaoAddItem = () => {
        setItem([...itens, {
            ProdutoId: "",
            quantidade: "",
            valor: ""
        }]);
    }

    const botaoRemoverItem = (i) => {
        const lista = [...itens];
        lista.splice(i, 1);
        setItem(lista);
    }

    const cadCompra = async e => {
        e.preventDefault();

        const headers = {
            "Content-Type": "application/json"
        };

        await axios.post(api + "/compras/novacompra", compra, { headers }).then((response) => {
            setStatus({
                type: "success",
                message: response.data.message
            });

            itens.forEach(function (item, i) {
                cadItem(response.data.comp.id, item, i);
            });

        }).catch(() => {
            setStatus({
                type: "error",
                message: "Erro: Sem conexão com a API."
            });
        });
    };

    // function para cadastro do itemCompra
    const cadItem = async (CompraId, item) => {

        const headers = {
            "Content-Type": "application/json"
        };

        await axios.post(api + "/compras/" + CompraId + "/novo_item_compra", item, { headers });
    };

    return (
        <Container>
            <div className="d-flex">
                <div className="p-2">
                    <h1>Cadastrar Compra</h1>
                </div>
            </div>

            {status.type === "error" ? <Alert color="danger">{status.message}</Alert> : ""}
            {status.type === "success" ? <Alert color="success">{status.message}</Alert> : ""}

            <Form className="p-2" onSubmit={cadCompra}>
                <FormGroup className="p-2">
                    <Label>Data</Label>
                    <Input type="date" name="data" placeholder="Data da compra" value={compra.data} onChange={valorInputCompra} />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>Cliente ID</Label>
                    <Input type="text" name="ClienteId" placeholder="Número ID do cliente" value={compra.ClienteId} onChange={valorInputCompra} />
                </FormGroup>

                {itens.map((item, i) => {
                    return (
                        <div>
                            <FormGroup id={i} key={i}>
                                <Row>
                                    <Col xs lg="2">
                                        <Label>Produto ID</Label>
                                        <Input type="text" name="ProdutoId" placeholder="ID do produto" value={item.ProdutoId} onChange={e => valorInputItem(e, i)} />
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

                <Button style={{ borderRadius: 40 }} outline value="AdicionarItem" onClick={botaoAddItem}> item</Button>

                <div className="d-flex justify-content-between">
                    <div></div>
                    <Col className="d-flex flex-row-reverse">
                        <Button type="submit" outline color="success">Cadastrar</Button>
                        <Link to="/compras" className="btn btn-outline-secondary btn">Voltar</Link>
                    </Col>
                </div>
            </Form>
        </Container>
    )
}