import React,{useState, useEffect} from "react";

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import {Form, Col ,Row, Table, Container} from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles.css"


function Home() {
  
  const [codIBGE, setCodIBGE] = useState('')
  const [municipio, setMunicipio] = useState('')
  const [estado, setEstado] = useState('')
  const [cadastro, setCadastro] = useState([])

  
  function handleAddCadastro(event){
    event.preventDefault()
    const data ={
      id: new Date().getTime(),
      codIBGE,
      municipio,
      estado
    }

    if (codIBGE === ""){
      alert('Favor preencher código IBGE!')
      return
    }

    if (municipio === ""){
      alert('Favor preencher município!')
      return
    }

    if (estado === ""){
      alert('Favor, preencher estado!')
      return
    }
    
    setCadastro([...cadastro,data])

    setCodIBGE('')
    setMunicipio('')
    setEstado('')

  }

  function handleDelete(id){
    setCadastro(cadastro.filter(cad => cad.id !== id))
  }

  useEffect(() =>{
    function loadData(){
      const storagedCadastro = localStorage.getItem('@cadCidade:cadastroCity')

      if(storagedCadastro){
        setCadastro(JSON.parse(storagedCadastro))
      }
    }
    loadData()
  },[])


  useEffect(() =>{
    function saveData(){
      localStorage.setItem('@cadCidade:cadastroCity',JSON.stringify(cadastro))
    }
    saveData()
  }, [cadastro])

  
  return (
    <div className="pagina">
    <Card >
    <Form onSubmit={handleAddCadastro}>
      <Card.Header style ={{textAlign: 'center',color: 'blue'}}><b>Cadastro de Municípios</b></Card.Header>
      <Card.Body>
    <Row>
      
      <Col sm={3}>
        <Form.Label><b>Código IBGE</b></Form.Label>
        <Form.Control  value={codIBGE} type="number" placeholder="Código IBGE" onChange={(event) => setCodIBGE(event.target.value)}/>
      </Col>

      <Col sm={6}>
        <Form.Label><b>Município</b></Form.Label>
        <Form.Control  value={municipio} type="text" placeholder="Municipio" onChange={(event) => setMunicipio(event.target.value)} />
      </Col>

      <Col sm={3}>
        <Form.Label><b>Estado</b></Form.Label>
        <Form.Control  value={estado} type="text" placeholder="Estado" onChange={(event) => setEstado(event.target.value)} />
      </Col>

    </Row>
  
      </Card.Body>
      <Card.Footer style ={{textAlign: 'center'}}><Button type="submit" className="btn-sm btn-primary" >Inserir</Button></Card.Footer>
      </Form>
    </Card>

  <Container style ={{maxWidth:"645px",marginTop:"2rem"}}>
    <Table bordered hover responsive>
    <thead>
      <tr>
        <th>Código IBGE</th>
        <th>Munícipio</th>
        <th>Estado</th>
        <th colSpan={1}>Ações</th>
      </tr>
    </thead>
    <tbody>
      {cadastro.map(cad =>(
      <tr key={cad.id}>
        <td>{cad.codIBGE}</td>
        <td>{cad.municipio}</td>
        <td>{cad.estado}</td>
        <td><Button className="btn-sm btn-danger" onClick={() => handleDelete(cad.id)} >Excluir</Button></td>
      </tr>
      ))}
    </tbody>

    </Table>
  </Container>

    </div>
  );
}

export { Home };
