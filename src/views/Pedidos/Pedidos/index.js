// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Alert, Container, Table } from "reactstrap";
// import { api } from "../../../config";

// export const Pedidos = () => {

//     const [data, setData] = useState([]);

//     const [status, setStatus] = useState({
//         type: "",
//         message: ""
//     });

//     const getPedidos = async () => {
//         await axios.get(api + "/pedido").then((response) => {
//             setData(response.data.pedidos);
//         }).catch((response) => {
//             setStatus({
//                 type: "error",
//                 message: response.data.message
//             });
//         });
//     };

//     const excluir = async (id) => {
//         const headers = {
//             "Content-Type": "application/json"
//         };

//         await axios.get(api + "/pedido/" + id + "/excluirpedido", { headers }).then((response) => {
//             setStatus({
//                 type: "success",
//                 message: response.data.message
//             });
//             getPedidos();
//         }).catch((response) => {
//             setStatus({
//                 type: "error",
//                 message: response.data.message
//             });
//         });
//     };

//     useEffect(() => {
//         getPedidos();
//     }, []);

//     return (
//         <div>
//             <Container>
//                 <div className="d-flex justify-content-between">
//                     <div className="p-2">
//                         <h1>Lista de Pedidos ({data.length})</h1>
//                     </div>

//                     <div className="d-flex align-items-center p-2">
//                         <Link to="/novopedido" className="btn btn-outline-info btn-sm">Novo Pedido</Link>
//                     </div>
//                 </div>

//                 {status.type === "error" ? <Alert color="danger">{status.message}</Alert> : ""}

//                 <Table striped>
//                     <thead>
//                         <tr>
//                             <th>ID</th>
//                             <th>Cliente</th>
//                             <th>Data</th>
//                             <th>Ação</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {data.map(item => (
//                             <tr key={item.id}>
//                                 <th>{item.id}</th>
//                                 <td>{item.ClienteId}</td>
//                                 <td>{item.data}</td>
//                                 <td>
//                                     <Link to={"/pedido/" + item.id + "/servicos"} className="btn btn-outline-info btn-sm">Consultar</Link>
//                                     <Link to={"/atualizarpedido/" + item.id} className="btn btn-outline-warning btn-sm">Editar</Link>
//                                     <span className="btn btn-outline-danger btn-sm" onClick={() => excluir(item.id)}>Excluir</span>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </Table>
//             </Container>
//         </div>
//     );
// };
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";
import { api } from "../../config";

export const Pedidos = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: "",
        message: ""
    });

    const getPedidos = async () => {
        await axios.get(api + "/pedidos").then((response) => {
            setData(response.data.pedidos);
        }).catch((response) => {
            setStatus({
                type: "error",
                message: response.data.message
            });
        });
    };

    const excluir = async (id) => {
        const headers = {
            "Content-Type": "application/json"
        };

        await axios.get(api + "/pedidos/" + id + "/excluirpedido", { headers }).then((response) => {
            setStatus({
                type: "success",
                message: response.data.message
            });
            getPedidos();
        }).catch((response) => {
            setStatus({
                type: "error",
                message: response.data.message
            });
        });
    };

    useEffect(() => {
        getPedidos();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex justify-content-between">
                    <div className="p-2">
                        <h1>Lista de Pedidos ({data.length})</h1>
                    </div>

                    <div className="d-flex align-items-center p-2">
                        <Link to="/novopedido" className="btn btn-outline-info btn-sm">Novo Pedido</Link>
                    </div>
                </div>

                {status.type === "error" ? <Alert color="danger">{status.message}</Alert> : ""}

                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Cliente</th>
                            <th>Data</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <th>{item.id}</th>
                                <td>{item.ClienteId}</td>
                                <td>{item.data}</td>
                                <td>
                                    <Link to={"/pedidos/" + item.id + "/servicos"} className="btn btn-outline-info btn-sm">Consultar</Link>
                                    <Link to={"/atualizarpedido/" + item.id} className="btn btn-outline-warning btn-sm">Editar</Link>
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