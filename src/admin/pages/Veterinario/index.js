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
import Menu from '../../../components/menu_vet';
import DeleteIcon from '@material-ui/icons/Delete';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { Alert } from '@material-ui/lab';
import Avatar from '@material-ui/core/Avatar';
import CommentIcon from '@material-ui/icons/Comment';
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
  { id: 'pet', numeric: false, disablePadding: false, label: 'Pet' },
  { id: 'cliente', numeric: false, disablePadding: true, label: 'Cliente' },
  { id: 'raca', numeric: false, disablePadding: false, label: 'Raça' },
  { id: 'peso', numeric: false, disablePadding: false, label: 'Porte' },
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
          Observações da Consulta
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



export default function EnhancedTable(props) {
const idUser = localStorage.getItem('@ipetid');
const idEmpresa = localStorage.getItem('@ipetidempresa');
const classes = useStyles();

const [order, setOrder] = React.useState('asc');
const [orderBy, setOrderBy] = React.useState('calories');
const [selected, setSelected] = React.useState([]);
const [page, setPage] = React.useState(0);
const [dense, setDense] = React.useState(false);
const [rowsPerPage, setRowsPerPage] = React.useState(5);



const [data, setData] = React.useState({
      consulta: []
  });

  
const [data9, setData9] = React.useState({
  alerta: ""
});

const [data1, setData1] = React.useState({
    pet: ""
});

const [data2, setData2] = React.useState({
  raca: ""
});

const [data3, setData3] = React.useState({
 peso: ""
});

const [data4, setData4] = React.useState({
  foto: ""
});

const [data5, setData5] = React.useState({
  id_pet: 0
});

const [data6, setData6] = React.useState({
  id_solicitacao: 0
});

const [data7, setData7] = React.useState({
  comentario: ""
});

const [data8, setData8] = React.useState({
  data: ""
});

const concluiProntuario = async () => {


  await fetch('http://www.ipet.kinghost.net/v1/account/ConcluiProntuario', {
    method: "POST",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({     
      "id": data6.id_solicitacao
    })
})
    .then((response) => response.json())
    .then((responseJson) => {
      pegaConsulta();
      console.log("prontuario concluido")
      //setData({...data, consulta: JSON.parse(responseJson) })

    }
    )
    .catch((error) => { console.log("erro fetch concluido", error) });

}







const adicionaProntuario = async () => {

  console.log({
    "comentario":  data7.comentario,
    "data": data8.data,
    "id_solicitacao": data6.id_solicitacao,
    "id_pet": data5.id_pet,
    "id_veterinario": parseInt(idUser),
    "id_empresa": parseInt(idEmpresa),

  })
  await fetch('http://www.ipet.kinghost.net/v1/account/InsereProntuario', {
    method: "POST",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "comentario":  data7.comentario,
      "data": data8.data,
      "id_solicitacao": data6.id_solicitacao,
      "id_pet": data5.id_pet,
      "id_veterinario": parseInt(idUser),
      "id_empresa": parseInt(idEmpresa),

    })
})
    .then((response) => response.json())
    .then((responseJson) => {
      console.log("prontuario adicionado")
      concluiProntuario();
      setData9({alerta: "Prontuário incluido com sucesso." })

    }
    )
    .catch((error) => { console.log("erro fetch", error) });

}

useEffect ((props) => { 
   pegaConsulta();
},{});

const handleChange = (event) => {
  setData({ ...data, [event.target.name]: event.target.checked });
};




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
    
    const NewDate = moment(name.data, 'DD/MM/YYYY')
    var datanova = NewDate.format('YYYY-MM-DD')
    setData1({pet: name.pet})
    setData2({raca: name.raca})
    setData3({peso: name.peso})
    setData4({foto: name.foto})
    setData5({id_pet: name.id_pet})
    setData6({id_solicitacao: name.Id})
    setData8({data: datanova})

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


  const pegaConsulta = async () => {
    
    await fetch('http://www.ipet.kinghost.net/v1/account/PegaConsulta', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "id_empresa": parseInt(idEmpresa),
    
        })
    })
        .then((response) => response.json())
        .then((responseJson) => {
          
          setData({...data, consulta: JSON.parse(responseJson) })

        }
        )
        .catch((error) => { console.log("erro fetch", error) });

        //disponibilidadeMotorista();
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
    {data9.alerta ? <Alert variant="filled" severity="success" style={{marginLeft: 15, height: '100%'}}>{data9.alerta}</Alert> : data9.alerta}
    </div>
    <div style={{marginLeft: '25%', marginBottom: 10}}class="ui action input">
    <Avatar style={{marginLeft: 15}} src={data4.foto}  size="large"/>    
    <TextField id="nome" label="Nome" variant="outlined" value={data1.pet}style={{marginLeft: 15}} size={'small'} onChange={e => setData1({ pet: e.target.value })} /> 
    <TextField id="raca" label="Raca" variant="outlined" value={data2.raca} style={{marginLeft: 15}} size={'small'} onChange={b => setData2({ raca: b.target.value })}/>
    <TextField id="peso" label="Peso" variant="outlined" value={data3.peso}style={{marginLeft: 15}} size={'small'} onChange={d => setData3({ peso: d.target.value })}/>
    </div>
    <div style={{marginTop: 5, marginLeft: '25%', marginBottom: 10}}class="ui action input">
    <TextField
          id="outlined-multiline-static"
          label="Observações"
          multiline
          rows={6}
          variant="outlined"
          onChange={d => setData7({ comentario: d.target.value })}
          style={{marginLeft: 15, width: 580}}
        /> 
    <button className={classes.button} onClick={() => adicionaProntuario()}style={{marginLeft: 15}}>Adicionar</button>
    
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
              {stableSort(data.consulta, getComparator(order, orderBy))
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
                        {row.pet}
                      </TableCell>
                      
                      <TableCell align="left">{row.pessoa}</TableCell>
                      <TableCell align="left">{row.raca}</TableCell>
                      <TableCell align="left">{row.porte}</TableCell>
                    

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
