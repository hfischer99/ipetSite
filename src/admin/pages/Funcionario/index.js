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
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Menu from '../../../components/menu_admin';
import DeleteIcon from '@material-ui/icons/Delete';
import { Alert } from '@material-ui/lab';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';




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
  { id: 'Nome', numeric: false, disablePadding: true, label: 'Nome' },
  { id: 'cpf[', numeric: false, disablePadding: false, label: 'CPF' },
  { id: 'Cargo', numeric: false, disablePadding: false, label: 'Cargo' },
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
            Funcionarios
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
    minWidth: 300,
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
const [func, setFunc] = React.useState('');

const [data, setData] = React.useState({
      funcionario: [],
      alerta: '',
  });

const [data2, setData2] = React.useState({
    cpf: '',
});


  
useEffect ((props) => { 
  pegaFunc();  
},{});


const pegaFunc = async () => {
  console.log(idUser)
     await fetch('http://www.ipet.kinghost.net/v1/account/RetornaDadosFuncionario', {
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

         setData({...data, funcionario: JSON.parse(responseJson)})
         console.log(data.funcionario)

         
        }
        )
        .catch((error) => { console.log("erro fetch", error) });
        
        
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
    console.log(name)
    setData2({cpf: name.cpf})
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


  const novoFunc= () => {
    console.log(data2.cpf)
    console.log(func)
    console.log(idUser)
    if( !data2.cpf || !func){
      setData({...data, alerta: 'Verifique se todos os dados estão preenchidos.'})
   } else{
     var role;
     switch (func){
       case '4':
         role = 'veterinario'
         break;
        case '3':
          role = 'motorista'
          break;
        case '2':
          role = 'manager'
          break;

        default:
          null       
     }

    fetch('http://www.ipet.kinghost.net/v1/account/AlteraFuncionario',{
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          "cpf": data2.cpf,
          "tipo_usuario": func,
          "id_empresa": parseInt(idUser),
          "role": role
          
        
  
      })
    })
    
       
       .then((response) => response.json())
       .then((responseJson) => {
        console.log(responseJson);
        pegaFunc();
      
         
         
       }
       )
       .catch((error) => {console.log("erro fetch",error)});
  
      
    }
  }


  const deletaFunc = () => {
    console.log(data2.cpf)
    console.log(func)
    console.log(idUser)
    if( !data2.cpf || !func){
      setData({...data, alerta: 'Verifique se todos os dados estão preenchidos.'})
   } else{
    fetch('http://www.ipet.kinghost.net/v1/account/AlteraFuncionario',{
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          "cpf": data2.cpf,
          "tipo_usuario": "1",
          "id_empresa": 0,
          "role": "cliente"
          
          
        
  
      })
    })
    
       
       .then((response) => response.json())
       .then((responseJson) => {
        pegaFunc();
      
         
         
       }
       )
       .catch((error) => {console.log("erro fetch",error)});
  
      
    }
  }
  
  

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  
const handleChange = (event) => {
  
  if(event.target.value == 2){
    setFunc(event.target.value);
   
    console.log("trocou",event.target.value)
  }

  if(event.target.value == 3){
    setFunc(event.target.value);

    console.log("trocou",event.target.value)
  }

  
  if(event.target.value == 4){
    setFunc(event.target.value);

    console.log("trocou",event.target.value)
  }
  
};
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
        
    
   

    
    </div>
    <div style={{marginTop: 5, marginLeft: '25%', marginBottom: 10}}class="ui action input">
    <TextField id="cpf" label="CPF" variant="outlined" value={data2.cpf}style={{marginLeft: 15}} size={'small'} onChange={e => setData2({ cpf: e.target.value })} /> 
    <FormControl style={{marginLeft: 5}}>
        <NativeSelect
          id="demo-customized-select-native"
          value={func}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          <option value={0}></option>
          <option value={2}>Administrador</option>
          <option value={3}>Motorista</option>
          <option value={4}>Veterinario</option>
        </NativeSelect>
      </FormControl>
    <button class="ui basic button" onClick={novoFunc} style={{marginLeft: 15}} className={classes.button}>Novo Funcionario</button>    
    <button class="ui basic button" onClick={novoFunc} style={{marginLeft: 15}} className={classes.button}>Editar</button>
    
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
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(data.funcionario, getComparator(order, orderBy))
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
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.Nome}
                      </TableCell>

                      <TableCell align="left">{row.cpf}</TableCell>
                      {row.tipo_usuario == 2 && (<TableCell align="left">Administrador</TableCell>)}
                      {row.tipo_usuario == 3 && (<TableCell align="left">Motorista</TableCell>)}
                      {row.tipo_usuario == 4 && (<TableCell align="left">Veterinário</TableCell>)}
                      <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={() => deletaFunc()}>
              
            <DeleteIcon 
            
            />
          </IconButton>
        </Tooltip>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

      </Paper>
    </div>
  );
}
