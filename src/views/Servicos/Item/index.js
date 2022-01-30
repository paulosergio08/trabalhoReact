// import {axios} from "axios";
// import { useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useState } from "react";
// import { Alert, Container, Table } from "reactstrap";
// import { api } from "../../config";


// export const Item = (props) => {
//     console.log(props.match.params.id);

//     const [data, seData] = useState([]);

//     const [id] = useState(props.match.params.id);

//     const [status, setStatus] = useState({
//         type: '',
//         message: '',
//     });

//     const getItens = async () => {
//         await axios.get(api + "/servicos/"+id+"/pedidos")
//             .then((Response) => {
//                 console.log(Response.data.item);
//                 seData(Response.data.item);
//             })
//             .catch(() => {
//                 setStatus({
//                     type: 'error',
//                     message: 'Erro:sem conexão com a API',
//                 })
//                  console.log("Erro:sem conexão com a API")
//             })
//     }
//     useEffect(() => {
//         getItens();
//     }, [id]);
//     return (
//         <div>
//             <Container>
//                 <div>
//                     <h1> Pedidos do serviço</h1>
//                 </div>
//                 {status.type == 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
//                 <Table striped>
//                     <thead>
//                         <tr>
//                             <th>Pedido</th>
//                             <th>Quantidade</th>
//                             <th>valor</th>
//                             <th>Visualizar</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {data.map(item => (
//                             <tr key={item.ServicoId}>
//                                 <td>{item.PedidoId}</td>
//                                 <td>{item.quantidade}</td>
//                                 <td>{item.valor}</td>
//                                 <td className="text-center/">
//                                     <Link to={"/listar-pedido/"}
//                                     className="btn btn-outline-primary btn-sm">
//                                         Consultar
//                                     </Link>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </Table>
//             </Container>
//         </div>
//     );
// };