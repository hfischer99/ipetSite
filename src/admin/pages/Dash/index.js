import React, { useState, useEffect, Text } from 'react'
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { lighten, makeStyles,withStyles } from '@material-ui/core/styles';
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
import Tooltip from '@material-ui/core/Tooltip';
import Menu from '../../../components/menu_admin';
import DeleteIcon from '@material-ui/icons/Delete';
import { Alert } from '@material-ui/lab';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';



import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import IconButton from '@material-ui/core/IconButton';
import BarChartIcon from '@material-ui/icons/BarChart';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    marginLeft: '25%',
    width: '50%',
    marginTop: 30,
  },
  title: {
    flex: '1 1 100%',
  },
}));

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
    { id: 'Serviço', numeric: false, disablePadding: true, label: 'Serviço' },
    { id: 'Solicitante', numeric: false, disablePadding: false, label: 'Solicitante' },
    { id: 'FormaPagamento', numeric: false, disablePadding: false, label: 'Forma Pagamento'},
    { id: 'ValorTotal', numeric: false, disablePadding: false, label: 'Valor Total'},
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

export default function EnhancedTable() {
const classes = useStyles();
const idUser = localStorage.getItem('@ipetidempresa');
const [order, setOrder] = React.useState('asc');
const [orderBy, setOrderBy] = React.useState('calories');
const [selected, setSelected] = React.useState([]);
const [page, setPage] = React.useState(0);
const [dense, setDense] = React.useState(false);
const [rowsPerPage, setRowsPerPage] = React.useState(5);
const [func, setFunc] = React.useState('');
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

const [data, setData] = React.useState({
    solicitacoes: [],
    id_status: 0,
});

const [data1, setData1] = React.useState({
    valor1: 0

});
const [data2, setData2] = React.useState({
    valor2: 0
});

const [data3, setData3] = React.useState({
    valor3: 0
});

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
    console.log(name)

    setFunc(name.tipo_usuario);


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

  useEffect ((props) => { 
    pegaSolicitacao();
    pegaSolicitacao01();
    pegaSolicitacao02();
    pegaSolicitacao03();
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

  const pegaSolicitacao01 = async () => {
    console.log(idUser)
     await fetch('http://www.ipet.kinghost.net/v1/account/valorDiarioFormaPagamento', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "id_empresa": parseInt(idUser),
          "id_formaPagamento": 0
    
        })
    })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log("PegaSolicitacao01",responseJson)
         setData1({...data1, valor01: responseJson})

        }
        )
        .catch((error) => { console.log("erro fetch", error) });       
  }

  const pegaSolicitacao02 = async () => {
    console.log(idUser)
     await fetch('http://www.ipet.kinghost.net/v1/account/valorDiarioFormaPagamento', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "id_empresa": parseInt(idUser),
          "id_formaPagamento": 1
    
        })
    })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log("PegaSolicitacao02",responseJson)
         setData2({...data2, valor02: responseJson})

         
        }
        )
        .catch((error) => { console.log("erro fetch", error) });       
  }

  const pegaSolicitacao03 = async () => {
    console.log(idUser)
     await fetch('http://www.ipet.kinghost.net/v1/account/calculaQtdSolicitacoes', {
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
            console.log("PegaSolicitacao02",responseJson)
         setData3({...data3, valor03: responseJson})

         
        }
        )
        .catch((error) => { console.log("erro fetch", error) });       
  }
  
  
  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <div className={classes.root}>
        <div style={{width: "100%"}}>
         <Menu/>
    </div>

   
      <Paper className={classes.paper}>
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            Informações Diárias
          </Typography>
        
        <div style={{marginLeft:'10%', marginBottom: 10}}>
        
        <IconButton aria-label="valor diario" style={{marginTop: 5,backgroundColor: '#E1E2E4', width: 200, height: 80, marginBottom: 15,borderRadius: 5, border: 5, padding: '0 30px', boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'}}>
        
            <AttachMoneyIcon fontSize='large' color='action'
            
            />
            {data1.valor01} Dinheiro/Cartão
            
          </IconButton>
            
          <IconButton aria-label="valor mensal" style={{marginTop: 5, marginLeft: 10,backgroundColor: '#E1E2E4', width: 200, height: 80, marginBottom: 15,borderRadius: 5, border: 5, padding: '0 30px', boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'}}>
              
              <AttachMoneyIcon fontSize='large' color='action'
              
              />
              {data2.valor02} Pagar.me
          </IconButton>


          <IconButton aria-label="serviços" style={{marginTop: 5, marginLeft: 10,backgroundColor: '#E1E2E4', width: 200, height: 80, marginBottom: 15,borderRadius: 5, border: 5, padding: '0 30px', boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'}}>
              
              <BarChartIcon fontSize='large' color='action'
              
              />
              {data3.valor03} Solicitações
          </IconButton>
      
      
        
        </div>

        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            Ultimas Solicitações
          </Typography>

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
                      key={row.Nome}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">

                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.descricao}
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.pessoa}
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.formapagamento}
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.valor_total}
                      </TableCell>

                      <TableCell align="left">{row.cpf}</TableCell>


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
