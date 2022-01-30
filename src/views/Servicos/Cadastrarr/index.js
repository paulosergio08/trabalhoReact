// import { axios } from "axios";
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { Button, Container, Form, FormGroup, Input, Label, } from "reactstrap";
// import { api } from "../../config";

// export const Cadastrar = () => {

//     const [status, setStatus] = useState({
//         type: '',
//         message: ''
//     });
//     const [servico, setServico] = useState({
//         descricao: '',
//         nome: ''

//     })
//     const valorInput = e => setServico({
//         ...servico, [e.target.name]: e.target.value
//     });
//     const cadServico = async e => {
//         e.preventDefault();
//         console.log(servico);

//         const headers = {
//             'Contene-Type': 'application/json'
//         }
//         await axios.post(api + "/servicos", servico, { headers })
//             .then((response) => {
//                 // console.log(response)
//                 if (response.data.error) {
//                     setStatus({
//                         type: 'error',
//                         message: response.data.message
//                     });
//                 } else {
//                     setStatus({
//                         type: 'success',
//                         message: response.data.message
//                     });
//                 }
//             })
//             .catch(() => {
//                 console.log("Erro,Sem conexã com a API.")
//             })

//     }
//     return (
//         <Container>
//             <div className="d-flex">
//                 <div className="m-auto p-2">
//                     <h1>Cadastrar Serviço</h1>
//                 </div>
//                 <div className="p-2">
//                     <Link to="/listar-servico"
//                         className="btn btn-outline-sucess-sm">Serviços</Link>
//                 </div>
//             </div>
//             <hr className="m-1" />
//             <Form className="p-2" onSubmit={cadServico}>
//                 <FormGroup className="p-2">
//                     <Label>Nome</Label>
//                     <Input type="text" name="nome" placeholder="Nome do serviço"
//                         ouChange={valorInput} />
//                 </FormGroup>
//                 <FormGroup className="p-2">
//                     <Label>Descrição</Label>
//                     <Input type="text" name="descricao" placeholder="Descrição do serviço"
//                         ouChange={valorInput} />
//                 </FormGroup>
//                 <Button type="submit" outline color="sucess">Cadastrar</Button>
//             </Form>
//         </Container>

//     );
// };