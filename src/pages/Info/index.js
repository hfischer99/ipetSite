import React, { useState, useEffect, Text } from 'react'
import { Rating } from '@material-ui/lab';
import Menu from '../../components/menu';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import 'react-credit-cards/es/styles-compiled.css';
import { Alert } from '@material-ui/lab';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  gridList: {
    width: 1500,
    padding: 30,
    cols: 1
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  margin: {
    flex: 1,
    margin: theme.spacing(1),
  },
  search: {
    flex: 2,
    flexDirection: 'row',
    position: 'relative',

    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade('#6A5ACD', 0.15),
    '&:hover': {
      backgroundColor: fade('#6A5ACD', 0.25),
    },

    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  centered: {
    maxWidth: '50%',
    marginTop: 50,
    justifycontent: 'center',
    width: "60%",
  },

  chip: {
    margin: theme.spacing(1),
  },
  section1: {
    margin: theme.spacing(2, 2),
  },
  section2: {
    margin: theme.spacing(2),
  },
  section3: {
    margin: theme.spacing(3, 2),
  },
  section4: {
    margin: theme.spacing(2,2,1),
  },
  section5: {
    margin: theme.spacing(2,2,1),
  },
  rootx: {

    marginLeft: '30%',
    maxWidth: 400,

  },
  alert: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));






export default function TitlebarGridList(props) {
  const classes = useStyles();
  const idUser = localStorage.getItem('@ipetid');
  const [data, setData] = React.useState({
    endereco: [],
    dadosPagamento: [],
    dinheiro: false,
    pagarme: false,
    color1: "default",
    color2: "default",
    colorMotorista1: "default",
    colorMotorista2: "default",
    vlrBtn: 0,
    vlrBtnMotorista: 0,
    alerta: '',
    controleMotorista: '',
    controlePagamento: props.location.state.formapagamento,
    latitudeOrigem : props.location.state.latitude,
    longitudeOrigem: props.location.state.longitude,
    precokm: props.location.state.precokm,
    resposta: props.location.state,
    valorFrete: 0,
    valorTotal: 0,
    valor: props.location.state.valor,
    pet: [],
    end: "",
    controlaEffect: 0
  });

  const [data2, setData2] = React.useState({
    endereco: [],
    controleEndereco: '',
    controlePet: '',
    controle: 0,
  })

  const [data3, setData3] = React.useState({
    pet: [],
    controle: 0
  })

  const [data4, setData4] = React.useState({
    controleMotorista: '',
    disponibilidadeMotorista: props.location.state.motorista,
  })
    useEffect ((props) => {

      console.log(idUser)
          pegaEnd();
         //calculaValorFrete();
         disponibilidadeMotorista();
         pegaPet();
      
       
        //const username = localStorage.getItem('@dadospessoais');

      
   
      
    
  },{});

  const pegaValor = async (id) => {
    var porte = id.target.value.porte;
    setData3({...data3, controle: 1})

    var calcula = 0;
    if(porte == "Mini"){  
      calcula = parseFloat(data.resposta.valorMini) + parseFloat(data.valorFrete);  
      setData({...data, valor: data.resposta.valorMini, valorTotal: calcula.toFixed(2)})
    }
    if(porte == "P"){
      calcula = parseFloat(data.resposta.valorP) + parseFloat(data.valorFrete);  
      setData({...data, valor: data.resposta.valorP, valorTotal: calcula.toFixed(2)})
    }
    if(porte == "M"){
      calcula = parseFloat(data.resposta.valorM) + parseFloat(data.valorFrete); 
      setData({...data, valor: data.resposta.valorM, valorTotal: calcula.toFixed(2)})
    }
    if(porte == "G"){
      calcula = parseFloat(data.resposta.valorG) + parseFloat(data.valorFrete); 
      setData({...data, valor: data.resposta.valorG, valorTotal: calcula.toFixed(2)})
    }
    
    
    
  }

  const pegaEnd = async () => {
    await fetch('http://www.ipet.kinghost.net/v1/account/PegaEndereco', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "id": parseInt(idUser),
    
        })
    })
        .then((response) => response.json())
        .then((responseJson) => {

          setData2({...data2, endereco: JSON.parse(responseJson) })
         
        }
        )
        .catch((error) => { console.log("erro fetch", error) });
        
        
  }
  
  const pegaPet = async () => {
    
    await fetch('http://www.ipet.kinghost.net/v1/account/PegaPet', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "id": parseInt(idUser),
    
        })
    })
        .then((response) => response.json())
        .then((responseJson) => {
          
          setData3({...data3, pet: JSON.parse(responseJson) })

        }
        )
        .catch((error) => { console.log("erro fetch", error) });

        //disponibilidadeMotorista();
  }


  const calculaValorFrete = async (id) => {

      setData2({...data2, controle: 1})
      
      var valorF = 0;
      var valorT = 0;
      var soma = 0;
      await fetch('http://www.ipet.kinghost.net/api/corridas/distanciakm', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "latitudeOrigem": data.latitudeOrigem,
          "longitudeOrigem": data.longitudeOrigem,
          "latitudeDestino": id.target.value.latitude,
          "longitudeDestino": id.target.value.longitude
    
        })
    })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          valorF = responseJson;
        }
        )
        .catch((error) => { console.log("erro fetch", error) });

        valorF = parseFloat(data.precokm * valorF / 1000).toFixed(2);
        valorT = parseFloat(data.valor);
        soma = parseFloat(valorF) + parseFloat(valorT);
      setData({...data, valorTotal: soma.toFixed(2), valorFrete: valorF})

      
}  


  const disponibilidadeMotorista =  () => {

    if(data4.disponibilidadeMotorista == 0){
      setData4({...data4, disponibilidadeMotorista: "Não Disponivel", controleMotorista: '0'})
    }
    if(data4.disponibilidadeMotorista == 1){
      setData4({...data4, disponibilidadeMotorista: "Disponivel", controleMotorista: '1'})
    }

  }
  const Check = (btn) =>{  
    if(btn == "1"){
      setData({...data,color1:"primary", color2: "default", vlrBtn: 1, alerta: ''})
    }else{
      setData({...data,color1: "default", color2: "primary", vlrBtn: 2, alerta: ''})
    }
  }

  const CheckMotorista = (btn) =>{  
    if(btn == "1"){
      setData({...data,colorMotorista1:"primary", colorMotorista2: "default", vlrBtnMotorista: 1, alerta: ''})
    }else{
      setData({...data,colorMotorista1: "default", colorMotorista2: "primary", vlrBtnMotorista: 2, alerta: ''})
    }
  }

 const CheckPagina = () => {
   if(data.disponibilidadeMotorista == "Disponivel"){
    if(data.vlrBtn == 0 || data.vlrBtnMotorista == 0 || data3.controle == 0 || data2.controle == 0) {
      setData({...data, alerta: "Verifique as informações."})
    } else{
     if(data.vlrBtn == 1){
       props.history.push({
         pathname: '/app' })
      } else {
       props.history.push({
         pathname: '/checkout' })
      }
    }
   }else{
    if(data.vlrBtn == 0 || data3.controle == 0) {
      setData({...data, alerta: "Verifique as informações."})
    } else{
     if(data.vlrBtn == 1){
       props.history.push({
         pathname: '/app' })
      } else {
       props.history.push({
         pathname: '/checkout' })
      }


   }
  

 }
}


 const retornaBotao = () => {
   if(data4.controleMotorista == 1){
    return (
      <div>
        <Chip className={classes.chip} label="Quero um motorista" clickable onClick={(e) => CheckMotorista("1")} color={data.colorMotorista1} />
      <Chip className={classes.chip} label="Não quero um motorista" clickable onClick={(e) => CheckMotorista("2")} color={data.colorMotorista2} />
      </div>
      
     )
   }

   
 }
 const handleChange = (event) => {
   setData({...data, end: event.target.value})
 console.log(event.target)
};

 const retornaBotaoPagamento = () => {
  if(data.controlePagamento == 0){
    return(
      <div>
      <Chip className={classes.chip} label="Dinheiro/Cartão" clickable onClick={(e) => Check("1")} color={data.color1} />
      <Chip className={classes.chip} label="Pagar me" clickable onClick={(e) => Check("2")} color={data.color2} /></div>
    ) 
  }else {
    return(
    <Chip className={classes.chip} label="Dinheiro/Cartão" clickable onClick={(e) => Check("1")} color={data.color1} />
    )
   
  }

  
}

const retornaBotaoEndereco = () => {
  if(data4.controleMotorista == 1){

    return(
      <div className={classes.section1}>

      <FormControl variant="outlined" className={classes.formControl} style={{width: "100%"}}>
      <InputLabel id="demo-simple-select-outlined-label">Endereço</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={data2.endereco.nome}
        onChange={calculaValorFrete}
        label="Endereço"
      >
        <MenuItem value="">
          <em></em>
        </MenuItem>
        {data2.endereco.map( end => (

          <MenuItem value={end}>{end.endereco}</MenuItem>
       // <MenuItem value={end.Id}>{end.endereco}</MenuItem>
    ))}
      </Select>
    </FormControl>



      </div>
    ) 
  }else {
   <div> teste</div>
   
  }
}


  return (

    
    <div className={classes.root}>
      <div style={{ width: "100%" }}> <Menu /></div>
      <div className={classes.centered}>
        <Rating name="read-only" value={props.location.state.avaliacao} readOnly />
        <img style={{ width: "100%", alignItems: 'center' }} src={props.location.state.foto} alt={props.location.state.foto.nomeFantasia} />
        
        <div className={classes.rootx}>
        <div className={classes.alerta}>
        {data.alerta ? <Alert variant="filled" severity="error">{data.alerta}</Alert> : data.alerta}
        </div>
        <div className={classes.section1}>
<FormControl variant="outlined" className={classes.formControl} style={{width: "100%"}}>
<InputLabel id="demo-simple-select-outlined-label">Pet</InputLabel>
<Select
  labelId="demo-simple-select-outlined"
  id="demo-simple-select"
  value={data3.pet.nome}
  onChange={pegaValor}
  label="Pet"
>
  <MenuItem value="">
    <em></em>
  </MenuItem>
  {data3.pet.map( pets => (
  <MenuItem value={pets}>{pets.nome}</MenuItem>
))}
</Select>
</FormControl>



</div>

        {data4.controleMotorista ? retornaBotaoEndereco() : data4.controleMotorista}

        
      

        

        
          <div className={classes.section1}>
            
          <Grid container alignItems="center">
              <Grid item xs>
                <Typography gutterBottom variant="h4">
                {props.location.state.nomeFantasia}
                </Typography>
              </Grid>
              <Typography color="textSecondary" variant="subtitle1">
              {props.location.state.descricao}
            </Typography>
            </Grid>


            <Grid container alignItems="center">
              <Grid item xs>
                <Typography gutterBottom variant="h6">
                  Valor :
                </Typography>
              </Grid>
              <Grid item>
                <Typography gutterBottom variant="h6">
                  R$ {data.valor}
                </Typography>
              </Grid>
            </Grid>
            <Grid container alignItems="center">
              <Grid item xs>
                <Typography gutterBottom variant="h6">
                  Frete :
                </Typography>
              </Grid>
              <Grid item>
                <Typography gutterBottom variant="h6">
                  R$ {data.valorFrete}
                </Typography>
              </Grid>
            </Grid>
            <Grid container alignItems="center">
              <Grid item xs>
                <Typography gutterBottom variant="h6">
                  Total :
                </Typography>
              </Grid>
              <Grid item>
                <Typography gutterBottom variant="h6">
                  R$ {data.valorTotal}
                </Typography>
              </Grid>
            </Grid>
            

            
          </div>
          <Divider variant="middle" />

          <div className={classes.section4}>
            <Grid container alignItems="center">
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  Motorista
            </Typography>
              </Grid>
              <Grid item>
                <Typography gutterBottom variant="subtitle1">
                  {data4.disponibilidadeMotorista}
              </Typography>             
              </Grid>  
              <Grid item>
              {data4.controleMotorista ? retornaBotao() : data4.controleMotorista}
                </Grid>            
              <div>
            
           
          </div>
            </Grid>
          </div>

          <Divider variant="middle" light={true}/>
          <div className={classes.section5}>
          <Typography gutterBottom variant="subtitle1">
            Forma de pagamento:
          </Typography>
          </div>

          <div>
           {data.controlePagamento ? retornaBotaoPagamento() : retornaBotaoPagamento()}
          </div>
          <Divider variant="middle" light={true}/>
          <div className={classes.section3}>
  
            <Grid container alignItems="center">
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                
                <Button color="primary" onClick={(e) => CheckPagina()}>Solicitar Serviço</Button> 
            </Typography>
              </Grid>

            </Grid>
          </div>

        </div>

    
      </div>

    </div>

    
  );
}

