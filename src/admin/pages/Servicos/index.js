import React, { useState, useEffect, Text } from 'react'
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles, withStyles  } from '@material-ui/core/styles';
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
import Menu from '../../../components/menu_admin';
import DeleteIcon from '@material-ui/icons/Delete';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { Alert } from '@material-ui/lab';
import Avatar from '@material-ui/core/Avatar';
import { Input } from 'semantic-ui-react'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import moment from 'moment'
const rows = [
    {
        "Id": 1,
        "id_servico": 2,
        "valor": 100.00,
        "motorista": 0,
        "precoKm": 25.00,
        "valorMini": 10.00,
        "valorP": 20.00,
        "valorM": 30.00,
        "valorG": 40.00,
        "formaPagamento": 1
    },
    {
        "Id": 2,
        "id_servico": 5,
        "valor": 200.00,
        "motorista": 1,
        "precoKm": 25.00,
        "valorMini": 10.00,
        "valorP": 20.00,
        "valorM": 30.00,
        "valorG": 40.00,
        "formaPagamento": 0
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
  { id: 'id_servico', numeric: false, disablePadding: true, label: 'Serviço' },
  { id: 'valor', numeric: false, disablePadding: false, label: 'Valor Médio' },
  { id: 'valormini', numeric: false, disablePadding: false, label: 'Valor Porte Mini' },
  { id: 'valorpequeno', numeric: false, disablePadding: false, label: 'Valor Porte Pequeno' },
  { id: 'valormedio', numeric: false, disablePadding: false, label: 'Valor Porte Médio' },
  { id: 'valorgrande', numeric: false, disablePadding: false, label: 'Valor Porte Grande' },
  { id: 'formap', numeric: false, disablePadding: false, label: 'Forma Pagamento' },
  { id: 'motorista', numeric: false, disablePadding: false, label: 'Motorista' },
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
const idUser = localStorage.getItem('@ipetidempresa');
const classes = useStyles();
const [servico, setServico] = React.useState('');
const [pagamento, setPagamento] = React.useState('');
const [order, setOrder] = React.useState('asc');
const [orderBy, setOrderBy] = React.useState('calories');
const [selected, setSelected] = React.useState([]);
const [page, setPage] = React.useState(0);
const [dense, setDense] = React.useState(false);
const [rowsPerPage, setRowsPerPage] = React.useState(5);



const [data, setData] = React.useState({
      alerta: '',
      alertaKey: '',
      key: '',
      checkedA: false,
      checkedB: false,
  });


const [data0, setData0] = React.useState({
  servico: [],
});

const [data1, setData1] = React.useState({
  descricao: '',
});
const [data2, setData2] = React.useState({
    vm: '',
});

const [data3, setData3] = React.useState({
    vpm: '',
});
const [data4, setData4] = React.useState({
    vpp: '',
});
const [data5, setData5] = React.useState({
    vpme: '',
});
const [data6, setData6] = React.useState({
  selectFile: '',
  profileImage: ''
});

const [data7, setData7] = React.useState({
    vpg: '',
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

const [data12, setData12] = React.useState({
  id: ''
});

useEffect ((props) => { 
 pegaServico();
},{});

const handleChange = (event) => {
  setData({ ...data, [event.target.name]: event.target.checked });
};

const handleChangeBox = (event) => {
  
    if(event.target.value == 1){
      setServico(event.target.value);
    }
  
    if(event.target.value == 2){
        setServico(event.target.value);
    }
  
    
    if(event.target.value == 3){
        setServico(event.target.value);
    }

    if(event.target.value == 4){
        setServico(event.target.value); 
      }
    
  };

  const handleChangeBox1 = (event) => { 
    if(event.target.value == 1){
      setPagamento(event.target.value);
    } 
    if(event.target.value == 2){
        setPagamento(event.target.value);
    }    
    if(event.target.value == 3){
        setPagamento(event.target.value);
    }   
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

  const alteraServico = async (id) => {
    var controlemotorista = 0;
    if(data.checkedA){
      controlemotorista = 1;
    } else {
      controlemotorista = 0;
    }
    console.log("serv", servico)
    
    if(!servico || !pagamento || !data1.descricao){
      setData({...data, alerta: 'Verifique se todos os dados estão preenchidos.'})
    } else{
  
      if(data9.controle == 0){
        console.log("entrei no controle 0")
        console.log(data10.foto)
        let formData = new FormData();
        formData.append('id', data12.id);
        formData.append('id_servico', servico);
        formData.append('id_empresa', parseInt(idUser));
        formData.append('valor', data2.vm);
        formData.append('descricao', data1.descricao);
        formData.append('motorista', controlemotorista);
        formData.append('precoKm', data8.key);
        formData.append('Image', data6.selectFile, data6.selectFile.name);
        formData.append('valorMini', data3.vpm);
        formData.append('valorP', data4.vpp);
        formData.append('valorM', data5.vpme);
        formData.append('valorG', data7.vpg);
        formData.append('formaPagamento', pagamento);
        formData.append('imagem', data10.foto);
        await fetch('http://www.ipet.kinghost.net/v1/account/AlterarPet', {
          method: "POST",      
          body: formData
      })
          .then((responseJson) => {
           console.log(responseJson);
            pegaServico();
          }
          )
          .catch((error) => { console.log("erro fetch", error) });
       }else {
        console.log("entrei no controle fetch 1")
        let formData = new FormData();
        formData.append('id', data12.id);
        formData.append('id_servico', servico);
        formData.append('id_empresa', parseInt(idUser));
        formData.append('valor', data2.vm);
        formData.append('descricao', data1.descricao);
        formData.append('motorista', controlemotorista);
        formData.append('precoKm', data8.key);
        formData.append('Image', data6.selectFile, data6.selectFile.name);
        formData.append('valorMini', data3.vpm);
        formData.append('valorP', data4.vpp);
        formData.append('valorM', data5.vpme);
        formData.append('valorG', data7.vpg);
        formData.append('formaPagamento', pagamento);
        formData.append('Image', data6.selectFile, data6.selectFile.name);
        await fetch('http://www.ipet.kinghost.net/v1/account/AlterarServico', {
          method: "POST",      
          body: formData
      })
          .then((responseJson) => {
           console.log(responseJson);
            pegaServico();
          }
          )
          .catch((error) => { console.log("erro fetch", error) });
       }  
      }
  
     
          
  }
const pegaServico = async () => {
    console.log(idUser)
    await fetch('http://www.ipet.kinghost.net/v1/account/PegaServico', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "id_empresa": parseInt(idUser),
    
        })
    })
        .then((response) => response.json())
        .then((responseJson) => {
          //console.log(responseJson)
          setData0({servico: responseJson})
        }
        )
        .catch((error) => { console.log("erro fetch", error) });

        //disponibilidadeMotorista();
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
    var controlem = false;
    console.log(name)
    if(name.motorista == 0){
      controlem = false;
    } else {
      controlem = true;
      setData8({key: name.precoKm})
    }
    setData12({id: name.id})
    setData1({descricao: name.descricao})
    setData2({vm: name.valor})
    setData3({vpm: name.valorMini})
    setData4({vpp: name.valorP})
    setData5({vpme: name.valorM})
    setData7({vpg: name.valorG})
    setServico(name.id_servico)
    setPagamento(name.formaPagamento)
    setData({checkedA: controlem})
    setData10({foto: name.foto})


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


  const novoServico = async () => {
 
    var controlemotorista = 0;
    if(data.checkedA){
      controlemotorista = 1;
    } else {
      controlemotorista = 0;
    }

    let formData = new FormData();
    formData.append('id_servico', servico);
    formData.append('id_empresa', parseInt(idUser));
    formData.append('valor', data2.vm);
    formData.append('descricao', data1.descricao);
    formData.append('motorista', controlemotorista);
    formData.append('precoKm', data8.key);
    formData.append('Image', data6.selectFile, data6.selectFile.name);
    formData.append('valorMini', data3.vpm);
    formData.append('valorP', data4.vpp);
    formData.append('valorM', data5.vpme);
    formData.append('valorG', data7.vpg);
    formData.append('formaPagamento', pagamento);

    if(!servico || !pagamento || !data1.descricao){
      setData({...data, alerta: 'Verifique se todos os dados estão preenchidos.'})
    } else{

    fetch('http://www.ipet.kinghost.net/v1/account/InsereServico',{
        method: "POST",
        body: formData
    })
    
       .then((response) => response.text())
       .then((responseJson) => {
        console.log(responseJson);
        pegaServico();       
       }
       )
       .catch((error) => {console.log("erro fetch",error)});
  
      
    }
  }
  
  const motoristaDisponivel = () => {
    if(data.checkedA == true){
      return (

        <div class="ui action input">
        <TextField id="nome" label="Preço por KM rodado" variant="outlined" value={data8.key}style={{marginLeft: 245}} size={'small'} onChange={e => setData8({ key: e.target.value })} />   
        </div>
  
      );
    }
    
  }


  const isSelected = (id) => selected.indexOf(id) !== -1;

  
  return (
    <div className={classes.root}>
        <div style={{width: "100%"}}>
         <Menu/>
    </div>
    <div style={{marginTop: 25, marginLeft: '25%', marginBottom: 5}} class="ui action input">
   
    </div>
    <div style={{marginTop: 25, marginBottom: 20}} class="ui action input">
    <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            Cadastro de Serviços
          </Typography>
    {data.alerta ? <Alert variant="filled" severity="error" style={{marginLeft: 15, height: '100%'}}>{data.alerta}</Alert> : data.alerta}
    </div>
    <div style={{marginLeft: '25%', marginBottom: 10}}class="ui action input">

    </div>
    <div style={{marginTop: 5, marginLeft: '25%', marginBottom: 10}}class="ui action input">
    <Avatar style={{marginLeft: 15}} src={data6.profileImage}  size="large"/>
    <Input type="file" style={{marginLeft: 15, width: 330}} onChange={handleImageChange}/>
    <button className={classes.button} onClick={novoServico} style={{marginLeft: 20}}> Cadastrar</button>    
    <button className={classes.button} onClick={alteraServico} style={{marginLeft: 20}}>Editar</button>
    
    </div>
    <div style={{marginLeft: '25%', marginBottom: 10}}class="ui action input"> 
    
    </div>
    <div style={{marginLeft: '25%', marginBottom: 10}}class="ui action input"> 
    
    </div>
    <div style={{marginLeft: '1%', marginBottom: 10}}class="ui action input"> 
          <FormControl>
        <InputLabel htmlFor="demo-customized-select-native">Tipo de Serviço</InputLabel>
        <NativeSelect
          id="demo-customized-select-native"
          value={servico}
          onChange={handleChangeBox}
          input={<BootstrapInput />}
        >
          <option value={0}></option>
          <option value={1}>Banho</option>
          <option value={3}>Tosa</option>
          <option value={2}>Banho e Tosa</option>
          <option value={5}>Consulta Veterinaria</option>
        </NativeSelect>
      </FormControl>

      <FormControl style={{marginLeft: 27}}>
        <InputLabel htmlFor="demo-customized-select-native">Forma de Pagamento</InputLabel>
        <NativeSelect
          id="demo-customized-select-native"
          value={pagamento}
          onChange={handleChangeBox1}
          input={<BootstrapInput />}
        >
          <option value={0}>                        </option>
          <option value={1}>Dinheiro/Cartão</option>
          <option value={2}>Pagar.me</option>
          <option value={3}>Todos</option>
        </NativeSelect>
      </FormControl>
    </div>

    <div style={{marginLeft: '25%', marginBottom: 10}}class="ui action input"> 
    
    </div>
    <div style={{marginTop: 5, marginLeft: '25%', marginBottom: 10}}class="ui action input">
        
    <TextField id="descricao" label="Descrição" variant="outlined" value={data1.descricao} style={{marginLeft: 15}} size={'small'} onChange={b => setData1({ descricao: b.target.value })}/>    
    <TextField id="valor" label="Valor Médio" variant="outlined" value={data2.vm}style={{marginLeft: 15}} size={'small'} onChange={e => setData2({ vm: e.target.value })} />
    <TextField id="valorm" label="R$ Valor Porte mini" variant="outlined" value={data3.vpm}style={{marginLeft: 15}} size={'small'} onChange={e => setData3({ vpm: e.target.value })}/>
    </div>
   
    <div style={{marginLeft: '25%', marginBottom: 10}}class="ui action input"> 
    <TextField id="valorm" label="R$ Valor Porte pequeno" variant="outlined" value={data4.vpp}style={{marginLeft: 15}} size={'small'} onChange={e => setData4({ vpp: e.target.value })}/>
    <TextField id="valorm" label="R$ Valor Porte médio" variant="outlined" value={data5.vpme}style={{marginLeft: 15}} size={'small'} onChange={e => setData5({ vpme: e.target.value })}/>
    <TextField id="valorm" label="R$ Valor Porte grande" variant="outlined" value={data7.vpg}style={{marginLeft: 15}} size={'small'} onChange={e => setData7({ vpg: e.target.value })}/>
    </div>
    
    <div style={{marginLeft: '25%', marginBottom: 10}}class="ui action input"> 
    
    </div>

    <div style={{marginLeft: '25%', marginBottom: 10}}class="ui action input"> 
    <div class="ui action input">
 
<FormControlLabel
control={<Switch checked={data.checkedA} onChange={handleChange} name="checkedA" />}
label="Motorista Dísponivel."
color={"primary"}
swi
/>
{data.checkedA ? motoristaDisponivel() : data.checkedA}

</div>
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
              {stableSort(data0.servico, getComparator(order, orderBy))
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
                      key={row.id_servico}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                          color={"primary"}
                        />
                      </TableCell>
                      {row.id_servico == 2 && (<TableCell align="left">Banho e Tosa</TableCell>)}
                      {row.id_servico == 5 && (<TableCell align="left">Consulta Veterinaria</TableCell>)}
                      <TableCell align="left">R$ {row.valor}</TableCell>
                      <TableCell align="left">R$ {row.valorMini}</TableCell>
                      <TableCell align="left">R$ {row.valorP}</TableCell>
                      <TableCell align="left">R$ {row.valorM}</TableCell>
                      <TableCell align="left">R$ {row.valorG}</TableCell>
                      
                      {row.formaPagamento == 0 && (<TableCell align="left">Dinheiro/Cartão(Local)</TableCell>)}
                      {row.formaPagamento == 1 && (<TableCell align="left">Todos</TableCell>)}
                      {row.motorista == 0 && (<TableCell align="left">Não Disponivel</TableCell>)}
                      {row.motorista == 1 && (<TableCell align="left">Disponivel</TableCell>)}
                      
                      
                      <Tooltip style={{marginTop: 5}} title="Delete">
                      <IconButton aria-label="delete" onClick={() => console.log("oi")}>              
                      <DeleteIcon/>
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
