import React, { useState, useEffect, Text } from 'react'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Menu from '../../components/menu';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { Rating } from '@material-ui/lab';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
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
    flex:1,
    margin: theme.spacing(1),
  },
  search: {
    flex:2,
    flexDirection:'row',
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
}));

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
 
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);




export default function Home(props)  {
  const classes = useStyles();
  
const [data, setData] = React.useState({
    resposta: [],
    texto: "",
    dadosPessoais: [],
    dadosLoginID: props.location.state.user.id,
 });





const filtroAvalicao = () => {


    fetch('http://www.ipet.kinghost.net/api/corridas/ServicosEmpresaAvaliacao', {
      method: "POST",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          "Cidade": "Pinhais",
  
      })
  })
      .then((response) => response.json())
      .then((responseJson) => {
         console.log(responseJson);
         setData({resposta: JSON.parse(responseJson)})
      }
      )
      .catch((error) => { console.log("erro fetch", error) });

  
}  


const filtroValor = () => {

    fetch('http://www.ipet.kinghost.net/api/corridas/ServicosEmpresaValor', {
      method: "POST",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          "Cidade": "Pinhais",
  
      })
  })
  
      .then((response) => response.json())
      .then((responseJson) => {
         console.log(responseJson);
         setData({resposta: JSON.parse(responseJson)})
      }
      )
      .catch((error) => { console.log("erro fetch", error) });

}

const filtroRegiao = () => {

    fetch('http://www.ipet.kinghost.net/api/corridas/ServicosEmpresaCidade', {
    method: "POST",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "Cidade": "Pinhais",

    })
})

    .then((response) => response.json())
    .then((responseJson) => {
       console.log(responseJson.nome);
       setData({resposta: JSON.parse(responseJson)})
    }
    )
    .catch((error) => { console.log("erro fetch", error) });

  
}

const [age, setAge] = React.useState('');
const handleChange = (event) => {
  
  if(event.target.value == 1){
    setAge(event.target.value);
    filtroAvalicao();
    console.log("trocou",event.target.value)
  }

  if(event.target.value == 2){
    setAge(event.target.value);
    filtroRegiao();
    console.log("trocou",event.target.value)
  }

  
  if(event.target.value == 3){
    setAge(event.target.value);
    filtroValor();
    console.log("trocou",event.target.value)
  }
  
};

var texto = "";
const searchtext = (event) => {
  texto =  event.target.value  
};

const search = (event) => {
  console.log(texto)
  fetch('http://www.ipet.kinghost.net/api/corridas/ServicosEmpresaNome', {
    method: "POST",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "Cidade": "Pinhais",
        "nomeFantasia": texto

    })
})
    .then((response) => response.json())
    .then((responseJson) => {
       console.log("ServicosEmpresa",responseJson);
       setData({resposta: JSON.parse(responseJson)})
    }
    )
    .catch((error) => { console.log("erro fetch", error) });

}

useEffect(() => {
  localStorage.setItem('@ipetid', data.dadosLoginID)
  if(data.dadosPessoais.length == 0){
    //console.log("state teste",props)
    fetch('http://www.ipet.kinghost.net/v1/account/RetornaDados', {
      method: "POST",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          "Id": data.dadosLoginID,
  
      })
  })
      .then((response) => response.json())
      .then((responseJson) => {
        localStorage.setItem('@dadospessoais', responseJson)
         console.log("DadosPessoais",responseJson);
         setData({...data,
          dadosPessoais: props.location.state})
      },
      
      )
      .catch((error) => { console.log("erro fetch", error) });
  
}
}, {});

  return (
    
    
    <div className={classes.root}>
       <div style={{width: "100%"}}>
         <Menu/>
    </div>
      <GridList cellHeight={480}className={classes.gridList} cols={2}>
      
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }} onTouchTap={(e) => console.log(e)}>

 
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="demo-customized-select-native">Filtro</InputLabel>
        <NativeSelect
          id="demo-customized-select-native"
          value={age}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          <option value={0}></option>
          <option value={1}>Avaliação</option>
          <option value={2}>Região</option>
          <option value={3}>Valor</option>
        </NativeSelect>
      </FormControl>
      
       
      <FormControl className={classes.margin}>
        <div style={{marginTop: 25}}class="ui action input">
          <input type="text" onChange={searchtext} placeholder="Procurar..."/>
          <button color='orange' class="ui basic button" onClick={search}>OK</button>
        </div>
      </FormControl>    
         
       

        </GridListTile>
        {data.resposta.map((tile) => (
          
          <GridListTile key={tile.foto} onClick={(e) => props.history.push({
            pathname: '/info',
            state: tile
          })}>
          <Rating name="read-only" value={tile.avaliacao} readOnly />
            <img src={tile.foto} alt={tile.nomeFantasia} />
            <GridListTileBar
              title={tile.nomeFantasia}
              subtitle={"TESTE HUDASHUDHUASHUDA /N AAAAAAAAA"}
              actionIcon={
                <IconButton aria-label={`info about ${tile.nomeFantasia}`} className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

