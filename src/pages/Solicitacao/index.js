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
import { Alert } from '@material-ui/lab';
import Avatar from '@material-ui/core/Avatar';
import { Rating } from '@material-ui/lab';
import moment from 'moment';
import pagarme from 'pagarme'
import io from 'socket.io-client'
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
  { id: 'empresa', numeric: false, disablePadding: true, label: 'Empresa' },
  { id: 'servico', numeric: false, disablePadding: false, label: 'Serviço' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
  { id: 'pet', numeric: false, disablePadding: false, label: 'Pet' },
  { id: 'pessoa', numeric: false, disablePadding: false, label: 'Solicitante' },
  { id: 'valor', numeric: false, disablePadding: false, label: 'Valor Total' },
  { id: 'data', numeric: false, disablePadding: false, label: 'Data' },
  { id: 'avaliacao', numeric: false, disablePadding: false, label: 'Avaliação' },
  { id: 'cancelar', numeric: false, disablePadding: false, label: '' },
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
    marginLeft: '25%',
    width: '60%',

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
      solicitacao: [],
      endereco: [],
      alerta: '',
      alertaKey: '',
      key: '',
      checkedA: false,
      checkedB: false,
  });




const [data1, setData1] = React.useState({
    id_ServicoEmpresa: '',
});
const [data2, setData2] = React.useState({
    avaliacao: 0,
});

const [data3, setData3] = React.useState({
    Status: '',
});


const [data7, setData7] = React.useState({
  id_servico: '',
});
  
const [data8, setData8] = React.useState({
  alerta: '',
  tipo: ''
});

const [data9, setData9] = React.useState({
  id_solicitacao: 0
});
const [data10, setData10] = React.useState({
  id_transacao: 0
});

let socket = io(`http://localhost:4555/`);



 
  useEffect((props) => {
    pegaSolicitacao();

    socket.on('notificacao', function (notifica) {
      pegaSolicitacao();
      setData8({alerta: "Seu pedido foi aprovado. Se você aguarda por um motorista, fique atento!!!"})
    });
  },{});

const estorno = async () => {
  pagarme.client.connect({ api_key: 'ak_test_KpivEkrnxyTXHnEQ2XOmTm5NPs3lcV' })
  .then(client => client.transactions.refund({
    id: data10.id_transacao
  }))
}
const cancelaSolicitacao = async () => {
  console.log("entrei cancela",data9.id_solicitacao)

  await fetch('http://www.ipet.kinghost.net/v1/account/CancelarSolicitacao', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "id": data9.id_solicitacao    
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
}

const pegaSolicitacao = async () => {
    
    await fetch('http://www.ipet.kinghost.net/v1/account/PegaSolicitacao', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "id_pessoa": parseInt(idUser),
    
        })
    })
        .then((response) => response.json())
        .then((responseJson) => {
          
          setData({...data, solicitacao: JSON.parse(responseJson) })

        }
        )
        .catch((error) => { console.log("erro fetch", error) });

        //disponibilidadeMotorista();
  }

  const avaliacao = async (avaliacao) => {
    console.log("entrei", data2.avaliacao)
    if(data3.Status == "Pendente"){
        setData8({...data8,alerta: "O Status ainda é pendente, você não pode avaliar.", tipo: "error"})
    }else if(data2.avaliacao == 0 && data3.Status == "Concluído" || data3.Status == "Cancelado" ){
      console.log("Eu sou a avaliação",{
        "id_Solicitacoes": parseInt(data7.id_servico),
        "id_ServicoEmpresa": parseInt(data1.id_ServicoEmpresa),
        "valoravaliacao": avaliacao

   
       } )
        await fetch('http://www.ipet.kinghost.net/v1/account/Avaliacao', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
             "id_Solicitacoes": parseInt(data7.id_servico),
             "id_ServicoEmpresa": parseInt(data1.id_ServicoEmpresa),
             "valoravaliacao": avaliacao
     
        
            })
        })
            .then((responseJson) => {
             console.log("resposta",responseJson);
             pegaSolicitacao();
             setData8({...data8,alerta: "Obrigado por realizar sua avaliação.", tipo: "success"})       
            }
            )
            .catch((error) => { console.log("erro fetch", error) });   
    } else if(data3.Status == "Confirmado"){
      setData8({...data8,alerta: "Você não pode avaliar ainda.", tipo: "error"})
    }
    else{
        setData8({...data8,alerta: "Você já avaliou essa solicitação.", tipo: "error"})
    }
    
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
    console.log("id solicitacao",name.Id)
    setData7({id_servico: name.Id})
    setData1({id_ServicoEmpresa: name.id_ServicoEmpresa})
    setData2({avaliacao: name.avaliacao})
    setData3({Status: name.status})
    setData9({id_solicitacao: name.Id})
    setData10({id_transacao: name.id_transacao})




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
    {data.alerta ? <Alert variant="filled" severity="error" style={{marginLeft: 15, height: '100%'}}>{data.alerta}</Alert> : data.alerta}
    </div>

    <div style={{marginTop: 25, marginLeft: '25%'}} class="ui action input">
 

</div>

      <Paper className={classes.paper}>
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
              {stableSort(data.solicitacao, getComparator(order, orderBy))
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
                        {row.nomefantasia}
                      </TableCell>
                      
                      <TableCell align="left">{row.descricao}</TableCell>
                      <TableCell align="left">{row.status}</TableCell>
                      <TableCell align="left">{row.pet}</TableCell>
                      <TableCell align="left">{row.pessoa}</TableCell>
                      <TableCell align="left">{parseFloat(row.valor_total)}</TableCell>
                      <TableCell align="left">{row.data}</TableCell>
                      

                      <Rating name="read-only" value={row.avaliacao}  onChange={(e, newValue) => avaliacao(newValue)} size={'small'} style={{marginTop: 15}} />
                      {row.status == "Aguardando Estabelecimento" && (
                      <TableCell align="left">
                        <Tooltip style={{marginTop: 5}} title="Delete">
                      <IconButton aria-label="delete" onClick={() => cancelaSolicitacao()}>              
                      <DeleteIcon/>
                      </IconButton>       
                      </Tooltip>
                        </TableCell>)}
                    
                    
                    
                    
                    
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
