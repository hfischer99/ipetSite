import React, { useState, useEffect, Text } from 'react'
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
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
import { Alert } from '@material-ui/lab';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import * as moment from 'moment'
import FormControlLabel from '@material-ui/core/FormControlLabel';
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

const headCellsSolicita = [
  
  { id: 'numero', numeric: false, disablePadding: false, label: 'Número' },
  { id: 'data', numeric: false, disablePadding: false, label: 'Data' },
  { id: 'descricao', numeric: false, disablePadding: false, label: 'Serviço' },
  { id: 'endereco', numeric: false, disablePadding: false, label: 'Endereço' },
  { id: 'formaPagamento', numeric: false, disablePadding: false, label: 'Forma Pagamento' },
  { id: 'valor', numeric: false, disablePadding: false, label: 'Valor Total' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
];

const headCellsPagamento = [
  { id: 'numero', numeric: false, disablePadding: false, label: 'Número' },
  { id: 'data', numeric: false, disablePadding: false, label: 'Data' }, 
  { id: 'valorfrete', numeric: false, disablePadding: false, label: 'Valor Frete' },
  { id: 'valorfrete', numeric: false, disablePadding: false, label: 'Valor Servico' },
  { id: 'valor', numeric: false, disablePadding: false, label: 'Valor Total' },
  { id: 'formaPagamento', numeric: false, disablePadding: false, label: 'Forma Pagamento' },
  { id: 'idtransacao', numeric: false, disablePadding: false, label: 'ID Transação' },

];


function EnhancedTableHeadPagamento(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">

        </TableCell>
        {headCellsPagamento.map((headCell) => (
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

EnhancedTableHeadPagamento.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableHeadSolicita(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">

        </TableCell>
        {headCellsSolicita.map((headCell) => (
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

EnhancedTableHeadSolicita.propTypes = {
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
          Lista de Endereço
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
            Lista de Solicitações
          </Typography>
        
      </Toolbar>
    );
  };
  
  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

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
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export default function EnhancedTable() {

const idUser = localStorage.getItem('@ipetidempresa');
const classes = useStyles();
const [order, setOrder] = React.useState('asc');
const [orderBy, setOrderBy] = React.useState('calories');
const [selected, setSelected] = React.useState([]);
const [page, setPage] = React.useState(0);
const [dense, setDense] = React.useState(false);
const [rowsPerPage, setRowsPerPage] = React.useState(5);
const [value, setValue] = React.useState(0);
const [func, setFunc] = React.useState({
  status: 5,
})
const [agenda, setAgenda] = React.useState(false);
const [date, setDate] = React.useState({
  data: "2020-11-16"
})
const [data, setData] = React.useState({
      solicitacoes: [],
      id_status: 0,
  });

const [id, setId] = React.useState({
  id: 0
})

const [data1, setData1] = React.useState({
  agendamento: "n"
})

  
useEffect ((props) => { 
  pegaSolicitacao();  
},{});


const pegaSolicitacao = async () => {
    console.log(idUser)
     await fetch('http://www.ipet.kinghost.net/v1/account/PegaSolicitacaoEmpresa', {
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
            console.log("PegaSolicitacaoEmpresa",responseJson)
         setData({...data, solicitacoes: JSON.parse(responseJson)})

         
        }
        )
        .catch((error) => { console.log("erro fetch", error) });
        
        
  }

  const pegaSolicitacaoData = async () => {

    console.log(date.data)

    await fetch('http://www.ipet.kinghost.net/v1/account/PegaSolicitacaoEmpresaFiltroData', {
      method: "POST",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "id_empresa": parseInt(idUser),
        "data": date.data
  
      })
  })
      .then((response) => response.json())
      .then((responseJson) => {
          console.log("PegaSolicitacaoData", responseJson)
       setData({...data, solicitacoes: JSON.parse(responseJson)})      
      }
      )
      .catch((error) => { console.log("erro fetch", error) });

  }
  
  const pegaSolicitacaoStatus= async () => {

    await fetch('http://www.ipet.kinghost.net/v1/account/PegaSolicitacaoEmpresaFiltroStatus', {
      method: "POST",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "id_empresa": parseInt(idUser),
        "id_status": parseInt(func.status),
        "agendamento": data1.agendamento
  
      })
  })
      .then((response) => response.json())
      .then((responseJson) => {
          console.log("PegaSolicitacaoStatus",responseJson)
       setData({...data, solicitacoes: JSON.parse(responseJson)})      
      }
      )
      .catch((error) => { console.log("erro fetch", error) });

  }

  const pegaSolicitacaoStatusData= async () => {

    await fetch('http://www.ipet.kinghost.net/v1/account/PegaSolicitacaoEmpresaFiltroDataStatus', {
      method: "POST",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "id_empresa": parseInt(idUser),
        "id_status": parseInt(func.status),
        "data": date.data
  
      })
  })
      .then((response) => response.json())
      .then((responseJson) => {
          console.log("PegaSolicitacaoStatusData",responseJson)
       setData({...data, solicitacoes: JSON.parse(responseJson)})      
      }
      )
      .catch((error) => { console.log("erro fetch", error) });

  }



  const pegaSolicitacaoId= async () => {

    await fetch('http://www.ipet.kinghost.net/v1/account/PegaSolicitacaoEmpresaId', {
      method: "POST",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "id_empresa": parseInt(idUser),
        "id": parseInt(id.id),
  
      })
  })
      .then((response) => response.json())
      .then((responseJson) => {
          console.log("PegaSolicitacaoId",responseJson)
       setData({...data, solicitacoes: JSON.parse(responseJson)})      
      }
      )
      .catch((error) => { console.log("erro fetch", error) });

  }

  const pegaSolicitacaoPagamento =  async () => {

    await fetch('http://www.ipet.kinghost.net/v1/account/PegaSolicitacaoPagamento', {
      method: "POST",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "id_empresa": parseInt(idUser),
        "id_formapagamento": parseInt(func.status),
  
      })
  })
      .then((response) => response.json())
      .then((responseJson) => {
          console.log("PegaSolicitacaoPagamento",responseJson)
       setData({...data, solicitacoes: JSON.parse(responseJson)})      
      }
      )
      .catch((error) => { console.log("erro fetch", error) });

  }

  const pegaSolicitacaoPagamentoData =  async () => {

    await fetch('http://www.ipet.kinghost.net/v1/account/PegaSolicitacaoPagamentoData', {
      method: "POST",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "id_empresa": parseInt(idUser),
        "data": date.data,
  
      })
  })
      .then((response) => response.json())
      .then((responseJson) => {
          console.log("PegaSolicitacaoPagamento",responseJson)
       setData({...data, solicitacoes: JSON.parse(responseJson)})      
      }
      )
      .catch((error) => { console.log("erro fetch", error) });

  }

  const pegaSolicitacaoPagamentoDataForma =  async () => {
    console.log("data",date.data)
    console.log("id_formapagamento", func.status)
    console.log("id_empresa", idUser)
    await fetch('http://www.ipet.kinghost.net/v1/account/PegaSolicitacaoPagamentoDataForma', {
      method: "POST",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "id_empresa": parseInt(idUser),
        "data": date.data,
        "id_formaPagamento": parseInt(func.status),
  
      })
  })
      .then((response) => response.json())
      .then((responseJson) => {
       console.log("PegaSolicitacaoPagamentoDataForma",responseJson)
       setData({...data, solicitacoes: JSON.parse(responseJson)})      
      }
      )
      .catch((error) => { console.log("erro fetch", error) });

  }

  const filtro = () => {
    console.log(date.data)
    console.log(func.status)
    if(id.id != 0){
      pegaSolicitacaoId();
    } else if (date.data == "2020-11-16"){
      pegaSolicitacaoStatus();
    } else if (date.data != "2020-11-16" && func.status == 5){
      pegaSolicitacaoData();
    } else {
      pegaSolicitacaoStatusData();
    }

  }

  const filtroPagamento = () => {

    setData({...data, solicitacoes: []})
   
    if(id.id != 0){
      pegaSolicitacaoId();
    }else if (date.data == "2020-11-16"){
      pegaSolicitacaoPagamento();
    } else if(date.data != "2020-11-16" && func.status == 5){
      pegaSolicitacaoPagamentoData();
    } else {
      pegaSolicitacaoPagamentoDataForma();
    }
    

  }

  const alteraData = (d) => {
    
    const NewDate = moment(d.target.value, 'YYYY-MM-DD')
    var datanova = NewDate.format('DD/MM/YYYY')
    setDate({ data: datanova })

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

  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  

  

  const handleChangeFiltroStatus = (event) => {
    console.log(event.target.value)
    setFunc({ status: event.target.value });

  };
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    

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
  var soma = 0;
  var frete = 0;
  var servico = 0;
  const somaValor = (valor) => {   
    soma =  soma + valor;
  }
  const somaValorFrete = (valor) => {   
    frete =  soma + valor;
  }
  const somaValorServico = (valor) => {   
    servico =  soma + valor;
  }
  const handleChangeA = (event) => {
    console.log(event.target.checked)
    setAgenda(event.target.checked)
    if(event.target.checked == true){
      setData1({agendamento: "s"})
    } 
  };
  return (
    <div className={classes.root}>
      <div style={{width: "100%"}}>
         <Menu/>
      </div>
    <div style={{marginTop: 25, marginLeft: '25%', marginBottom: 5}} class="ui action input">
   
    </div>
    <div style={{marginTop: 25, width: '100%'}}>
    <AppBar position="static"className={classes.appbar} style={{width:'60%', marginLeft: '20%'}  }>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" indicatorColor="secondary" centered>
          <Tab label="Solicitações" {...a11yProps(0)} />
          <Tab label="PAGAMENTOS" {...a11yProps(1)} />
          
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
      <Paper className={classes.paper}>
     
      <TextField
        id="date"
        label="Número Solicitação"
        type="text"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={d => setId({ id: d.target.value })}
      />
      <TextField
        style={{marginLeft: 10}}
        id="date"
        label="Selecione a Data"
        type="date"
        //defaultValue="2020-11-16"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={d => alteraData(d)}
      />
  

      <FormControl style={{ marginTop: 5, marginLeft: 20 }}>
                    <NativeSelect
                      id="demo-customized-select-native"
                      value={func.status}
                      onChange={handleChangeFiltroStatus}
                      input={<BootstrapInput />}
                    >
                      <option value={5}>Todos</option>   
                      <option value={1}>Pendente</option>
                      <option value={2}>Confirmado</option>
                      <option value={3}>Concluido</option>
                      <option value={4}>Cancelado</option>                       
                    </NativeSelect>
                  </FormControl>
                  <FormControlLabel style={{marginLeft: 10}}
        control={<Checkbox checked={agenda} onChange={handleChangeA} name="checkedA" />}
        label="Agendamento"
      />
                  <button className={classes.button} onClick={() => filtro()} style={{marginTop: 5, marginLeft: 15}}> Filtrar</button>
                  <button className={classes.button} onClick={() => pegaSolicitacao()} style={{marginTop: 5, marginLeft: 15}}> Limpar Filtro</button>
      <TableContainer>
        
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size={dense ? 'small' : 'medium'}
          aria-label="enhanced table"
        >
          
          <EnhancedTableHeadSolicita
            classes={classes}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {stableSort(data.solicitacoes, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row);
                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.endereco}
                    selected={isItemSelected}
                  >
                     <TableCell padding="checkbox">
                        
                      </TableCell>

                    <TableCell align="left">{row.Id}</TableCell>
                    <TableCell align="left">{row.data}</TableCell>
                    <TableCell align="left">{row.descricao}</TableCell>
                    <TableCell align="left">{row.endereco}, {row.numero}</TableCell>
                    <TableCell align="left">{row.formapagamento}</TableCell>
                    <TableCell align="left">R$ {row.valor_total}</TableCell>
                    <TableCell align="left">{row.status}</TableCell>
                   
                  </TableRow>
                );
              })}
           
          </TableBody>
        </Table>
      </TableContainer>

    </Paper>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Paper className={classes.paper}>
      <TextField
        id="date"
        label="Número Solicitação"
        type="text"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={d => setId({ id: d.target.value })}
      />
      <TextField
        style={{marginLeft: 10}}
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
  

      <FormControl style={{ marginTop: 5, marginLeft: 20 }}>
                    <NativeSelect
                      id="demo-customized-select-native"
                      value={func.status}
                      onChange={handleChangeFiltroStatus}
                      input={<BootstrapInput />}
                    >
                      <option value={2}>Todos</option>   
                      <option value={0}>Dinheiro/Cartão</option>
                      <option value={1}>Pagar.me</option>                       
                    </NativeSelect>
                  </FormControl>

                  <button className={classes.button} onClick={() => filtroPagamento()} style={{marginTop: 5, marginLeft: 15}}> Filtrar</button>
                  <button className={classes.button} onClick={() => pegaSolicitacao()} style={{marginTop: 5, marginLeft: 15}}> Limpar Filtro</button>
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size={dense ? 'small' : 'medium'}
          aria-label="enhanced table"
        >
          <EnhancedTableHeadPagamento
            classes={classes}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {stableSort(data.solicitacoes, getComparator(order, orderBy))
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
                    key={row.endereco}
                    selected={isItemSelected}
                  >
                    {
                        somaValor(parseInt(row.valor_total)),
                        somaValorFrete(parseInt(row.valor_frete)),
                        somaValorServico(parseInt(row.valor_servico))

                      }
                    <TableCell padding="checkbox">
                        
                        </TableCell>
                    <TableCell align="left">{row.Id}</TableCell>
                    <TableCell align="left">{row.data}</TableCell>                   
                    <TableCell align="left">R$ {row.valor_frete}</TableCell>
                    <TableCell align="left">R$ {row.valor_servico}</TableCell>
                    <TableCell align="left">R$ {row.valor_total}</TableCell>
                    <TableCell align="left">{row.formapagamento}</TableCell>
                    <TableCell align="left">{row.id_transacao}</TableCell>
                   
                  </TableRow>
                );
              })}
           
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{marginTop: 10}}>
      Valor Total: R$ {soma}
      </div>
      <div style={{marginTop: 10}}>
      Valor Frete: R$ {frete}
      </div>
      <div style={{marginTop: 10}}>
      Valor Servico: R$ {servico}
      </div>
      
      
    </Paper>
      </TabPanel>
     
      </div>
    
     
    </div>
  );
}
