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
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import io from 'socket.io-client'
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import pagarme from 'pagarme'
var rows = [];
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

const headCells = [
  { id: 'id', numeric: false, disablePadding: true, label: 'ID' },
  { id: 'data', numeric: false, disablePadding: true, label: 'Data' },
  { id: 'servico', numeric: false, disablePadding: true, label: 'Serviço' },
  { id: 'solicitante', numeric: false, disablePadding: false, label: 'Solicitante' },
  { id: 'endereco', numeric: false, disablePadding: false, label: 'Endereço' },
  { id: 'pet', numeric: false, disablePadding: false, label: 'Pet' },
  { id: 'porte', numeric: false, disablePadding: false, label: 'Porte' },
  { id: 'periodo', numeric: false, disablePadding: false, label: 'Periodo' },
  { id: 'motorista', numeric: false, disablePadding: false, label: 'Motorista' },
  { id: 'valortotal', numeric: false, disablePadding: false, label: 'Valor Total' },
  { id: 'deleter', numeric: false, disablePadding: false, label: '' },
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
            Solicitações
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
    marginLeft: '10%',
    width: '85%',

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

const [order, setOrder] = React.useState('asc');
const [orderBy, setOrderBy] = React.useState('calories');
const [selected, setSelected] = React.useState([]);
const [page, setPage] = React.useState(0);
const [dense, setDense] = React.useState(false);
const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [func, setFunc] = React.useState({
    soli: 0
  })

  const [data, setData] = React.useState({
    endereco: [],

    alerta: '',
  });

  const [data1, setData1] = React.useState({
    id: 0
  });

  const [data2, setData2] = React.useState({
    manha: false
  });
  const [data3, setData3] = React.useState({
    tarde: false
  });

  const [data4, setData4] = React.useState({
    adisposicao: false
  });

  const [data5, setData5] = React.useState({
    id_motorista: 0
  });
  const [data6, setData6] = React.useState({
    pessoa: 0
  });
  const [data7, setData7] = React.useState({
    id_endereco: 0
  });

  const [data8, setData8] = React.useState({
    id_pet: 0
  });
  const [data9, setData9] = React.useState({
    data: ""
  });

  const [data10, setData10] = React.useState({
    motorista: 0
  });
 
  const [data11, setData11] = React.useState({
    id_transacao: 0
  });
 

  const [solicitacoes, setSolicitacoes] = React.useState({
    solicitacoes: []
  }


  );
  const [motorista, setMotorista] = React.useState({
    motorista: [],

  });
  
  let socket = io(`http://192.168.0.37:4555/`);
  const [controle, setControle] = React.useState(false);
  useEffect((props) => {
    pegaSolicitacao();
    pegaMotorista();
    socket.on('notificacao', function (notifica) {
      if (idUser == notifica.id_empresa) {
        pegaMotorista()
        rows.push(notifica)
        //setData20({...data, data: JSON.parse(notifica)})
        setControle(true);
      }


    });
  },{});
 
  const estorno = async () => {
    pagarme.client.connect({ api_key: 'ak_test_KpivEkrnxyTXHnEQ2XOmTm5NPs3lcV' })
    .then(client => client.transactions.refund({
      id: data11.id_transacao
    }))
  }

const delet = async () => {
    rows = [];
    




    
      await fetch('http://www.ipet.kinghost.net/v1/account/CancelarSolicitacao', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "id": data1.id    
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
              console.log("responsecancela",responseJson)
              pegaSolicitacao();
              estorno();
              
    
            }
            )
            .catch((error) => { console.log("erro fetch cancela", error) });
    

    await fetch('http://localhost:8080/api/notificar', {
        method: "POST",
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          "id_solicitacao": solicitacoes.solicitacoes.id_solicitacao,
          "status": "recusado"
        })
    })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
        }
        )
        .catch((error) => { console.log("erro fetch", error) });
  
  }



const handleChange = (event) => {
  setFunc({ soli: event.target.value });
};
const pegaMotorista = async () => {

  await fetch('http://www.ipet.kinghost.net/v1/account/Motorista', {
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
      setMotorista({ motorista: responseJson })


    }
    )
    .catch((error) => { console.log("erro fetch", error) });
}

const pegaSolicitacao = async () => {
  rows= [];
  
  await fetch('http://www.ipet.kinghost.net/v1/account/PegaSolicitacaoAdmin', {
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
      
      JSON.parse(responseJson).map((d)=> {
        console.log("sou d", d)
        rows.push(d)
      })
      //setSolicitacoes({solicitacoes: JSON.parse(responseJson)})


    }
    )
    .catch((error) => { console.log("erro fetch", error) });
}


const inserecorrida = () => {
  fetch('http://www.ipet.kinghost.net/api/corridas/InsereCorridaMotorista', {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "motorista_cod": 10,
      "cliente_cod": data6.pessoa,
      "endereco_cod": data7.id_endereco,
      "data_corrida": "2020-11-17",
      "status_corrida_cod": 4,
      "tipo_corrida_cod": 2,
      "pet_cod": data8.id_pet,
      "id_empresa": parseInt(idUser),
      "id_solicitacao": data1.id
    })
  })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log("insere corrida",responseJson)
      
    }
    )
    .catch((error) => { console.log("erro fetch insere corrida", error) });
}
const aprovar = () => {
  console.log("rows", rows)
  console.log("id", data1.id)
  console.log("manha", data2.manha)
  console.log("tarde", data3.tarde)
  console.log("adisposicao", data4.adisposicao)
  console.log("id_motorista", data5.id_motorista)
  fetch('http://www.ipet.kinghost.net/v1/account/AlteraStatusSolicitacoes', {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "id": data1.id,
      "manha": data2.manha,
      "tarde": data3.tarde,
      "adisposicao": data4.adisposicao,
      "id_status": 2,
      "id_motorista": 10
    })
  })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log("response", responseJson)
      pegaSolicitacao();
      if(data10.motorista == 1){
        console.log("entrei")

        if(responseJson !== "informações invalidas")
        inserecorrida();
      }
      
      
    }
    )
    .catch((error) => { console.log("erro fetch aprovar", error) });
    
    fetch('http://localhost:8080/api/notificar', {
      method: "POST",
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({
        "id_solicitacao": rows.id_solicitacao,
        "status": "aceito"
      })
  })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
      }
      )
      .catch((error) => { console.log("erro fetch", error) });
}

  
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };



  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    console.log("name",name)
    setData1({id: name.Id})
    setData2({manha: name.manha})
    setData3({tarde: name.tarde})
    setData4({adisposicao: name.adisposicao})
    setData5({id_motorista: name.id_motorista})
    setData6({pessoa: name.id_pessoa})
    setData7({id_endereco: name.id_endereco})
    setData8({id_pet: name.id_pet})
    setData9({data: name.data})
    setData10({motorista: name.motorista})
    setData11({id_transacao: name.id_transacao})
    //setSolicitacoes({ ...solicitacoes, solicitacoes: name })


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

  };




  const isSelected = (id) => selected.indexOf(id) !== -1;


  
  return (
    <div className={classes.root}>
        <div style={{width: "100%"}}>
         <Menu/>
    </div>
    <div style={{marginTop: 25, marginLeft: '25%', marginBottom: 5}} class="ui action input">
   
    </div>
    <div style={{marginTop: 25, marginBottom: 5}} class="ui action input">
    <EnhancedTableToolbarTeste/>

    </div>


      <Paper className={classes.paper}>
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
              //onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
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
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.Id}
                      </TableCell>
                      <TableCell align="left">
                        {row.data}
                      </TableCell>
                      <TableCell align="left">{row.descricao}</TableCell>
                      <TableCell align="left">{row.pessoa}</TableCell>
                      <TableCell align="left">{row.endereco}</TableCell>
                      <TableCell align="left">{row.pet}</TableCell>
                      <TableCell align="left">{row.porte}</TableCell>
                      <TableCell align="left">
                    <FormControl style={{ marginTop: 15 }}>
                      <NativeSelect
                        id="demo-customized-select-native"
                        value={func.soli}
                        onChange={handleChange}
                        input={<BootstrapInput />}
                      >
                        
                        {row.manha == true &&(<option value={row.id}>Manhã</option>) }
                        {row.tarde == true &&(<option value={row.id}>Tarde</option>) }
                        {row.adisposicao == true &&(<option value={row.id}>Á disposição</option>) }
                     </NativeSelect>
                    </FormControl>
                  
                  </TableCell>
                  <TableCell align="center">{row.motorista == 1 && (
                    <FormControl style={{ marginTop: 15, marginLeft: 20 }}>
                      <NativeSelect
                        id="demo-customized-select-native"
                        value={func.soli}
                        onChange={handleChange}
                        input={<BootstrapInput />}
                      >
                        {motorista.motorista.map((row) => {
                          return (<option value={row.id}>{row.nome}</option>)
  
                        })}
  
                      </NativeSelect>
                    </FormControl>
                  )}
                  {row.motorista == 2 && (<TableCell align="left">Não Disponivel</TableCell>)}</TableCell>
                  <TableCell align="left">{row.valor_total}</TableCell>

                  
                  
                    <Tooltip title="Aprovar">
                      <IconButton aria-label="aprovar" onClick={() => aprovar()}>
                        <ThumbUpIcon
                        />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                    <IconButton aria-label="delete" onClick={() => delet() }>
                      <DeleteIcon
                      />
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
