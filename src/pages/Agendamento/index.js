import React, { useState, useEffect, Text } from 'react'

import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Menu from '../../components/menu';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import * as moment from 'moment'
import { Alert } from '@material-ui/lab';
import LoadingSpin from 'react-loading-spin';
import io from 'socket.io-client'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  rootx: {
    maxWidth: 400,
  },
  paper: {
    marginLeft: '20%',
    width: '60%',

  },
  table: {
    minWidth: 500,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  button:{
    background: 'linear-gradient(45deg, #836FFF 30%, #6A5ACD 90%)',
    border: 5,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 40,
    padding: '0 30px',
  },
  appbar:{
    background: 'linear-gradient(45deg, #836FFF 30%, #6A5ACD 90%)',
    border: 5,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 45,
    padding: '0 30px',
  },
  bar:{
    background: 'linear-gradient(45deg, #836FFF 30%, #6A5ACD 90%)',
    border: 35,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',


  },
  title: {
    flex: '1 1 100%',
  },
  button:{
    background: 'linear-gradient(45deg, #836FFF 30%, #6A5ACD 90%)',
    border: 5,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 40,
    padding: '0 30px',
  },
}));


export default function EnhancedTable(props) {

const idUser = localStorage.getItem('@ipetidempresa');
const classes = useStyles();
const [manha, setManha] = React.useState(false);
const [tarde, setTarde] = React.useState(false);
const [adisposicao, setAdisposicao] = React.useState(false);
var idrandom = props.location.state.id_solicitacao;
const [tempo, setTempo] = React.useState({
    controle: false,
  })
const [date, setDate] = React.useState({
  data: "2020-11-16"
})

const [data, setData] = React.useState({
    alerta: ""
  })

const handleChangeA = (event) => {
    console.log(event.target.checked)
    setManha(event.target.checked);
  };

  const handleChangeB = (event) => {
    console.log(event.target.checked)
    setTarde(event.target.checked);
  };

  const handleChangeC = (event) => {
    console.log(event.target.checked)
    setAdisposicao(event.target.checked);
  };

  const alteraData = (d) => {
    
    const NewDate = moment(d.target.value, 'YYYY-MM-DD')
    var datanova = NewDate.format('DD/MM/YYYY')
    setDate({ data: datanova })

  }
  let socket = io(`http://localhost:4555/`)
  useEffect (() => {
  
     
    socket.on('notificacao', function (notifica) {
     console.log(notifica)
     if(props.location.state.id_solicitacao == notifica.id_solicitacao){
       
       if(notifica.status == "aceito")
       {
         
         setTempo({controle: false});
         //setOpen(true);
       }
       if(notifica.status == "recusado"){
         setTempo({controle: false});
         //setOpen1(true);
       }
       
     }
   
   
    
   });

 

 

},{});

  const carregando = () => {

    return(
      <div>
  
      <div style={{marginLeft: '50%', alignItems: 'center'}}>
      <LoadingSpin
      />
      </div>   
      <div style={{marginLeft: '43%'}}>
      Aguardando estabelecimento...
     </div>
  
  
      </div>
  
    
    )
  }

  const adicionar = async () => {
    console.log("entrei")
    console.log("vt", props.location.state.valor_total)
    console.log("vf", props.location.state.valor_frete)
    console.log("vs", props.location.state.valor_servico)
    console.log("moto", props.location.state.motorista)
    console.log("formap", props.location.state.formapagamento)
    console.log("idpet", props.location.state.id_pet)
    console.log("idpe", props.location.state.id_pessoa)
    console.log("idsempresa", props.location.state.id_servico_empresa)
    console.log("idend", props.location.state.id_endereco !== "" ? parseInt(props.location.state.id_endereco) : 0)
    console.log("m", manha)
    console.log("t", tarde)
    console.log("a", adisposicao)
    console.log("data", date.data)


    const NewDate = moment(date.data, 'DD-MM-YYYY')
    var datanova = NewDate.format('YYYY-MM-DD')

    await fetch('http://www.ipet.kinghost.net/v1/account/AlteraStatusRequisicao', {
        method: "POST",
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
     },
     body: JSON.stringify({
        "valor_total": parseFloat(props.location.state.valor_total),
        "valor_frete": parseFloat(props.location.state.valor_frete),
        "valor_servico": parseFloat(props.location.state.valor_servico),
        "statusmotorista": parseInt(props.location.state.motorista),
        "id_formaPagamento": parseInt(props.location.state.formapagamento),
        "id_pet": parseInt(props.location.state.id_pet),
        "id_pessoa": parseInt(props.location.state.id_pessoa),
        "id_status": 6,
        "id_ServicoEmpresa": parseInt(props.location.state.id_servico_empresa),
        "id_endereco": props.location.state.id_endereco !== "" ? parseInt(props.location.state.id_endereco) : 0,
        "manha": manha,
        "tarde": tarde,
        "data": datanova,
        "adisposicao": adisposicao,
        "agendamento": "s"
      })
    })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log("response do agendamento",responseJson)
          props.history.push({
            pathname: '/solicitacao'})
        }
        )
        .catch((error) => { console.log("erro fetch cadastro agendamento", error) });
    }
    
  


  const agendamento = async () => {
      
     props.location.state.agendamento = "s";
     props.location.state.data = date.data
     props.location.state.manha = manha;
     props.location.state.tarde = tarde;
     props.location.state.adisposicao = adisposicao;
     const NewDate = moment(date.data, 'DD-MM-YYYY')
     var datanova = NewDate.format('YYYY/MM/DD')
    console.log(props.location.state)
    
    if(manha !== true && tarde !== true && adisposicao !== true){
        setData({...data, alerta: "Selecione um periodo"})
    } 
    else if(manha == true && tarde == true && adisposicao == true){
       setData({...data, alerta: "Selecione apenas um periodo"})
    } else {
        await adicionar();
        await fetch('http://localhost:8080/api/notificar', {
        method: "POST",
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
     },
        body: JSON.stringify(props.location.state)
    })
        .then((response) => response.json())
        .then((responseJson) => {
          setTempo({controle: true});
          console.log(responseJson)
        }
        )
        .catch((error) => { console.log("erro fetch", error) });
    }
    
}

  return (
    <div className={classes.root}>
      <div style={{width: "100%"}}>
         <Menu/>
      </div>
    <div style={{marginTop: 25, marginLeft: '25%', marginBottom: 5}} class="ui action input">
   
    </div>
    
    <div style={{marginTop: 25, width: '100%'}}>
    
      <Paper className={classes.paper}>
      <Typography style={{marginBottom: 10}} variant="h6" id="tableTitle" component="div">
            Etapa 2
     </Typography>

      <div style={{marginLeft: 10, marginTop: 10}}>
      {tempo.controle ? carregando() : tempo.controle}
      {data.alerta ? <Alert variant="filled" severity="error" style={{marginLeft: 15, height: '100%', marginBottom: 10}}>{data.alerta}</Alert> : data.alerta}
      <TextField
        style={{ marginBottom: 25}}
        id="date"
        label="Selecione a Data"
        type="date"
        defaultValue="2020-11-16"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={d => alteraData(d)}
      />
      <FormControlLabel style={{marginTop: 10, marginLeft: 10}}
        control={<Checkbox checked={manha} onChange={handleChangeA} name="checkedA" />}
        label="Manhã"
      />
      <FormControlLabel style={{marginTop: 10}}
        control={<Checkbox checked={tarde} onChange={handleChangeB} name="checkedA" />}
        label="Tarde"
      />
      <FormControlLabel style={{marginTop: 10}}
        control={<Checkbox checked={adisposicao} onChange={handleChangeC} name="checkedA" />}
        label="A disposição"
      />
      <button className={classes.button}  onClick={(d) => agendamento()}style={{marginLeft: 10}}>Agendar</button>   
      </div>

  
    
    </Paper>
     
      
   
     
      </div>
    
     
    </div>
  );
}

