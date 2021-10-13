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
  { id: 'endereco', numeric: false, disablePadding: true, label: 'Endereco' },
  { id: 'numero', numeric: true, disablePadding: false, label: 'Numero' },
  { id: 'cidade', numeric: true, disablePadding: false, label: 'Cidade' },
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

const idUser = localStorage.getItem('@ipetid');
const classes = useStyles();
const [order, setOrder] = React.useState('asc');
const [orderBy, setOrderBy] = React.useState('calories');
const [selected, setSelected] = React.useState([]);
const [page, setPage] = React.useState(0);
const [dense, setDense] = React.useState(false);
const [rowsPerPage, setRowsPerPage] = React.useState(5);


const [data, setData] = React.useState({
      endereco: [],
      alerta: '',
  });

const [data2, setData2] = React.useState({
    endereco: '',
});

const [data3, setData3] = React.useState({
    numero: '',
});
const [data4, setData4] = React.useState({
    cep: '',
});
const [data5, setData5] = React.useState({
    cidade: '',
});
const [data6, setData6] = React.useState({
  complemento: '',
});

const [data7, setData7] = React.useState({
  id: '',
});
  
useEffect ((props) => { 
  pegaEnd();  
},{});


const pegaEnd = async () => {
    console.log(idUser)
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
    
         setData({...data, endereco: JSON.parse(responseJson)})

         
        }
        )
        .catch((error) => { console.log("erro fetch", error) });
        
        
  }

  const deletaEnd = async (id) => {
    
    await fetch('http://www.ipet.kinghost.net/v1/account/DeletaEndereco', {
       method: "POST",
       headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
       },
       body: JSON.stringify({
         "Id": parseInt(id),
   
       })
   })
       .then((responseJson) => {
        console.log(responseJson);
       pegaEnd();

        
       }
       )
       .catch((error) => { console.log("erro fetch", error) });
       
       
 }


 const alteraEnd = async (id) => {
   console.log("id", data7.id)
   console.log("endereco", data2.endereco)
   console.log("numer", data3.numero)
   console.log("cep", data4.cep)
   console.log("cidade", data5.cidade)
   console.log("complemento", data6.complemento)
   console.log("id_pessoa", parseInt(id))

   if( !data2.endereco || !data3.numero || !data4.cep || !data5.cidade || !data6.complemento){
      setData({...data, alerta: 'Verifique se todos os dados estão preenchidos.'})
   } else{

    await fetch('http://www.ipet.kinghost.net/v1/account/EditarEndereco', {
      method: "POST",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "Id": data7.id,
        "endereco": data2.endereco,
        "numero": data3.numero,
        "cep": data4.cep,
        "cidade": data5.cidade,
        "complemento": data6.complemento,
        "id_pessoa": parseInt(idUser), 
      })
  })
      .then((responseJson) => {
       console.log(responseJson);
       pegaEnd();    
      }
      )
      .catch((error) => { console.log("erro fetch", error) });
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
    
    console.log(name.Id);
    setData2({endereco: name.endereco})
    setData3({numero: name.numero})
    setData4({cep: name.cep})
    setData5({cidade: name.cidade})
    setData6({complemento: name.complemento})
    setData7({id: name.Id})


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


  const novoEndereco = () => {
    if( !data2.endereco || !data3.numero || !data4.cep || !data5.cidade){
      setData({...data, alerta: 'Verifique se todos os dados estão preenchidos.'})
   } else{
    fetch('http://www.ipet.kinghost.net/v1/account/AdicionarEndereco',{
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          "endereco": data2.endereco,
          "numero": data3.numero,
          "cep": data4.cep,
          "cidade": data5.cidade,
          "id_pessoa": parseInt(idUser),
          "complemento": data6.complemento
  
      })
    })
    
       
       .then((response) => response.json())
       .then((responseJson) => {
        console.log(responseJson);

        pegaEnd();
         
         
       }
       )
       .catch((error) => {console.log("erro fetch",error)});
  
      
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
        
    <TextField id="endereco" label="Endereco" variant="outlined" value={data2.endereco}style={{marginLeft: 15}} size={'small'} onChange={e => setData2({ endereco: e.target.value })} /> 
    <TextField id="numero" label="Número" variant="outlined" value={data3.numero} style={{marginLeft: 15}} size={'small'} onChange={b => setData3({ numero: b.target.value })}/>
    <TextField id="cep" label="CEP" variant="outlined" value={data4.cep} style={{marginLeft: 15}} size={'small'} onChange={c => setData4({ cep: c.target.value })}/>
    <TextField id="cidade" label="Cidade" variant="outlined" value={data5.cidade}style={{marginLeft: 15}} size={'small'} onChange={d => setData5({ cidade: d.target.value })}/>
    </div>
    <div style={{marginTop: 5, marginLeft: '25%', marginBottom: 10}}class="ui action input">
    <TextField id="complemento" label="Complemento" variant="outlined" value={data6.complemento}style={{marginLeft: 15}} size={'small'} onChange={e => setData6({ complemento: e.target.value })}/>
    <button class="ui basic button" onClick={novoEndereco} style={{marginLeft: 15}} className={classes.button}> Novo Endereço</button>    
    <button class="ui basic button" onClick={alteraEnd} style={{marginLeft: 15}} className={classes.button}>Editar</button>
    
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
              {stableSort(data.endereco, getComparator(order, orderBy))
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
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.endereco}
                      </TableCell>
                      <TableCell align="right">{row.numero}</TableCell>
                      <TableCell align="right">{row.cidade}</TableCell>
                      <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={() => deletaEnd(row.Id)}>
              
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
