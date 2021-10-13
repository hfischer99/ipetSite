import React, { useState, useEffect, Text } from 'react'
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Menu from '../../components/menu';
import DeleteIcon from '@material-ui/icons/Delete';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { Alert } from '@material-ui/lab';
import Avatar from '@material-ui/core/Avatar';
import { Input } from 'semantic-ui-react'
import Axios from "axios";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import moment from 'moment'
const rows = [
    {
        "Id": 1,
        "Endereco": "R Rio Itaqui",
        "Numero": 108,
        "Cidade": "Pinhais"
    },
    {
        "Id": 2,
        "Endereco": "Rua teste",
        "Numero": 100,
        "Cidade": "Curitiba"
    },

];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'foto', numeric: false, disablePadding: true, label: '' },
  { id: 'nome', numeric: false, disablePadding: true, label: 'Nome' },
  { id: 'raca', numeric: false, disablePadding: false, label: 'Raca' },
  { id: 'porte', numeric: false, disablePadding: false, label: 'Porte' },
  { id: 'peso', numeric: false, disablePadding: false, label: 'Peso' },
  { id: 'data_nascimento', numeric: false, disablePadding: false, label: 'Data Nascimento' },
  { id: 'deletar', numeric: false, disablePadding: false, label: '' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">

        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

var id = 0;
const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;
  
   
  return (
      
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Lista de Pet's
        </Typography>
      )}

      {numSelected > 0 ? (
          <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={() => console.log("estou deletando", id)}>
              
            <DeleteIcon 
            
            />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Delete">
        <IconButton aria-label="delete" onPress={() => console.log("estou deletando")}>
            
          <DeleteIcon 
          onPress={() => console.log("estou deletando")}
          />
        </IconButton>
      </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const EnhancedTableToolbarTeste = (props) => {
    const classes = useToolbarStyles();
    const { numSelected } = props;
    
  
    return (
        
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
          
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            Dados Cadastrais
          </Typography>
        
      </Toolbar>
    );
  };
  
  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  rootx: {
    maxWidth: 400,
  },
  paper: {
    marginLeft: '25%',
    width: '50%',

  },
  table: {
    minWidth: 0,
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
  switch:{
    trackColor: 'linear-gradient(45deg, #836FFF 30%, #6A5ACD 90%)'
  }
}));



export default function EnhancedTable() {
const idUser = localStorage.getItem('@ipetid');
const classes = useStyles();

const [order, setOrder] = React.useState('asc');
const [orderBy, setOrderBy] = React.useState('calories');
const [selected, setSelected] = React.useState([]);
const [page, setPage] = React.useState(0);
const [dense, setDense] = React.useState(false);
const [rowsPerPage, setRowsPerPage] = React.useState(5);



const [data, setData] = React.useState({
      pet: [],
      endereco: [],
      alerta: '',
      alertaKey: '',
      key: '',
      checkedA: false,
      checkedB: false,
  });

const [dataImg, setImg] = React.useState({
    profileImage: "http://ipet.kinghost.net/imagens/pngwing.com.png",
    selectFile: null,
});



const [data1, setData1] = React.useState({
  porte: '',
});
const [data2, setData2] = React.useState({
    nome: '',
});

const [data3, setData3] = React.useState({
    raca: '',
});
const [data4, setData4] = React.useState({
    peso: '',
});
const [data5, setData5] = React.useState({
    data_nascimento: '',
});
const [data6, setData6] = React.useState({
  selectFile: '',
  profileImage: ''
});

const [data7, setData7] = React.useState({
  id: '',
});
  
const [data8, setData8] = React.useState({
  key: '',
  alerta: '',
  tipo: ''
});

const [data9, setData9] = React.useState({
  controle: 0
});

const [data10, setData10] = React.useState({
  foto: ''
});

const [data11, setData11] = React.useState({
  cod: ''
});
useEffect ((props) => { 
  pegaPet();  
},{});

const handleChange = (event) => {
  setData({ ...data, [event.target.name]: event.target.checked });
};

const handleImageChange = event =>{
 
  setData9({controle: 1})
    const file = URL.createObjectURL(event.target.files[0]);
      setData6({
      selectFile: event.target.files[0],
      profileImage: file
    })
    console.log(data6.selectFile)
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
          
          setData({...data, pet: JSON.parse(responseJson) })

        }
        )
        .catch((error) => { console.log("erro fetch", error) });

        //disponibilidadeMotorista();
  }

  const deletaPet = async (id) => {
    
    await fetch('http://www.ipet.kinghost.net/v1/account/DeletaPet', {
       method: "POST",
       headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
       },
       body: JSON.stringify({
         "Id": data7.id,
   
       })
   })
       .then((responseJson) => {
        console.log(responseJson);

          pegaPet();
        
       }
       )
       .catch((error) => { console.log("erro fetch", error) });
       
       
 }


 const alteraPet = async (id) => {

    
  var data = moment(data5.data_nascimento);
   if( !data2.nome || !data3.raca || !data4.peso || !data5.data_nascimento){
      setData({...data, alerta: 'Verifique se todos os dados estão preenchidos.'})
   } else{

    if(data9.controle == 0){
      console.log("entrei no controle 0")
      console.log(data10.foto)
      let formData = new FormData();
      formData.append('id', data7.id);
      formData.append('nome', data2.nome);
      formData.append('raca', data3.raca);
      formData.append('peso', data4.peso);
      formData.append('id_pessoa', parseInt(idUser));
      formData.append('data_nascimento', data.format("YYYY-MM-DD"));
      formData.append('foto', data10.foto);
      await fetch('http://www.ipet.kinghost.net/v1/account/AlterarPet', {
        method: "POST",      
        body: formData
    })
        .then((responseJson) => {
         console.log(responseJson);
          pegaPet();
        }
        )
        .catch((error) => { console.log("erro fetch", error) });
     }else {
      console.log("entrei no controle fetch 1")
      let formData = new FormData();
      formData.append('id', data7.id);
      formData.append('nome', data2.nome);
      formData.append('raca', data3.raca);
      formData.append('peso', data4.peso);
      formData.append('id_pessoa', parseInt(idUser));
      formData.append('data_nascimento', data5.data_nascimento);
      formData.append('Image', data6.selectFile, data6.selectFile.name);
      await fetch('http://www.ipet.kinghost.net/v1/account/AlterarPet', {
        method: "POST",      
        body: formData
    })
        .then((responseJson) => {
         console.log(responseJson);
          pegaPet();
        }
        )
        .catch((error) => { console.log("erro fetch", error) });
     }  
    }

   
        
}

  const geraChave = async (rowNome,rowId) =>{

    await fetch('http://www.ipet.kinghost.net/v1/account/Encode64', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "Id": parseInt(rowId),
          "Nome": rowNome
    
        })
    })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          setData({...data, alertaKey: "A chave de compartilhamento é: " + responseJson, key: responseJson})
          alteraChave(responseJson)
        }
        )
        .catch((error) => { console.log("erro fetch", error) });


    //setData({...data, alertaKey: "A chave de compartilhamento é:" + rowNome + rowId})
  }

  const alteraChave = async (chave) => {
    let formData = new FormData();
    var data = moment(data5.data_nascimento);

formData.append('id', data7.id);
formData.append('nome', data2.nome);
formData.append('raca', data3.raca);
formData.append('peso', data4.peso);
formData.append('id_pessoa', parseInt(idUser));
formData.append('data_nascimento', data.format("YYYY-MM-DD"));
formData.append('foto', data10.foto);
formData.append('cod', chave);
fetch('http://www.ipet.kinghost.net/v1/account/AlterarPet', {
  method: "POST",      
  body: formData
})
  .then((responseJson) => {
   console.log(responseJson);
    //pegaPet();
  }
  )
  .catch((error) => { console.log("erro fetch", error) });
  }

  const addPetCompartilhado = async (pet) =>{
    
    console.log(data8.key)
    await fetch('http://www.ipet.kinghost.net/v1/account/AdicionarPetCompartilhado', {
      method: "POST",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "cod": data8.key,
        "id_pessoa": parseInt(idUser)
      })
  })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        if(responseJson == "Chave não existe"){
          setData8({...data8, alerta: "Verifique a chave digitada.", tipo: "error"})
        }else{
          setData8({...data8, alerta: "Vinculo realizado com sucesso." , tipo: "success"})
          pegaPet();
        }
      }
      )
      .catch((error) => { console.log("erro fetch", error) });

    //setData({...data, alertaKey: "A chave de compartilhamento é:" + rowNome + rowId})
  }
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    
    setData2({nome: name.nome})
    setData3({raca: name.raca})
    setData4({peso: name.peso})
    setData5({data_nascimento: name.data_nascimento})
    setData7({id: name.Id})
    setData10({foto: name.foto})
    setData11({cod: name.cod})

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
    console.log(selected)
  };


  const novoPet = async () => {
    var data = moment(data5.data_nascimento);
    let formData = new FormData();
    formData.append('nome', data2.nome);
    formData.append('raca', data3.raca);
    formData.append('peso', data4.peso);
    formData.append('id_pessoa', parseInt(idUser));
    formData.append('data_nascimento', data.format("YYYY-MM-DD"));
    formData.append('Image', data6.selectFile, data6.selectFile.name);
  

    if(!data2.nome || !data3.raca || !data4.peso || !data5.data_nascimento){
      setData({...data, alerta: 'Verifique se todos os dados estão preenchidos.'})
    } else{

    fetch('http://www.ipet.kinghost.net/v1/account/AdicionarPet',{
        method: "POST",
        body: formData
    })
    
       .then((response) => response.text())
       .then((responseJson) => {
        console.log(responseJson);
        pegaPet();

         
         
       }
       )
       .catch((error) => {console.log("erro fetch",error)});
  
      
    }
  }
  
  const petCadastrado = () => {
    if(data.checkedA == true){
      return (

        <div class="ui action input">
        <TextField id="nome" label="Código do pet" variant="outlined" value={data8.key}style={{marginLeft: 15}} size={'small'} onChange={e => setData8({ key: e.target.value })} /> 
        <button className={classes.button} onClick={addPetCompartilhado} style={{marginLeft: 15}}>Ok</button>     
        </div>
  
      );
    }
    
  }


  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  
  return (
    <div className={classes.root}>
        <div style={{width: "100%"}}>
         <Menu/>
    </div>
    <div style={{marginTop: 25, marginLeft: '25%', marginBottom: 5}} class="ui action input">
   
    </div>
    <div style={{marginTop: 25, marginBottom: 5}} class="ui action input">
    <EnhancedTableToolbarTeste/>
    {data.alerta ? <Alert variant="filled" severity="error" style={{marginLeft: 15, height: '100%'}}>{data.alerta}</Alert> : data.alerta}
    </div>
    <div style={{marginLeft: '25%', marginBottom: 10}}class="ui action input">
        
    <TextField id="nome" label="Nome" variant="outlined" value={data2.nome}style={{marginLeft: 15}} size={'small'} onChange={e => setData2({ nome: e.target.value })} /> 
    <TextField id="raca" label="Raca" variant="outlined" value={data3.raca} style={{marginLeft: 15}} size={'small'} onChange={b => setData3({ raca: b.target.value })}/>
    <TextField id="peso" label="Peso" variant="outlined" value={data4.peso}style={{marginLeft: 15}} size={'small'} onChange={d => setData4({ peso: d.target.value })}/>
    <TextField id="data_nascimento" label="Data Nascimento" variant="outlined" value={data5.data_nascimento}style={{marginLeft: 15}} size={'small'} onChange={e => setData5({ data_nascimento: e.target.value })}/>
    </div>
    <div style={{marginTop: 5, marginLeft: '25%', marginBottom: 10}}class="ui action input">
    <Avatar style={{marginLeft: 15}} src={data6.profileImage}  size="large"/>
    <Input type="file" style={{marginLeft: 15, width: 330}} onChange={handleImageChange}/>
    <button className={classes.button} onClick={novoPet} style={{marginLeft: 15}}> Novo Pet</button>    
    <button className={classes.button} onClick={alteraPet} style={{marginLeft: 15}}>Editar</button>
    
    </div>
    <div style={{marginTop: 25, marginLeft: '25%'}} class="ui action input">
 
<FormControlLabel
control={<Switch checked={data.checkedA} onChange={handleChange} name="checkedA" />}
label="Desejo visualizar um pet já cadastrado."
color={"primary"}
swi
/>
{data.checkedA ? petCadastrado() : data.checkedA}

</div>

      <Paper className={classes.paper}>
      {data.alertaKey ? <Alert variant="filled" severity="success" style={{ height: '100%', marginTop: 10}}>{data.alertaKey}</Alert> : data.alertaKey}
      {data8.alerta ? <Alert variant="filled" severity={data8.tipo} style={{ height: '100%', marginTop: 10}}>{data8.alerta}</Alert> : data.alerta}
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(data.pet, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.nome}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                          color={"primary"}
                        />
                      </TableCell>
                      <TableCell align="left"><Avatar alt="Remy Sharp" src={row.foto} style={{ height: '50px', width: '50px' }} /></TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.nome}
                      </TableCell>
                      
                      <TableCell align="left">{row.raca}</TableCell>
                      <TableCell align="left">{row.porte}</TableCell>
                      <TableCell align="left">{row.peso}</TableCell>
                      <TableCell align="left">{row.data_nascimento}</TableCell>
                      
                      <Tooltip style={{marginTop: 5}} title="Delete">
                      <IconButton aria-label="delete" onClick={() => deletaPet()}>              
                      <DeleteIcon/>
                      </IconButton>       
                      </Tooltip>

                      <Tooltip style={{marginTop: 5}}title="Gera chave de compartilhamento">
                      <IconButton aria-label="key" onClick={() => geraChave(row.nome, row.Id)}>              
                      <VpnKeyIcon/>
                      </IconButton>       
                      </Tooltip>
                    </TableRow>
                  );
                })}
                    
              
              
            </TableBody>
            
          </Table>
          
        </TableContainer>
              
      </Paper>
    </div>
  );
}
