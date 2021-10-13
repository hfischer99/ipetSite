import React, { useState, useEffect, Text } from 'react'
import Menu from '../../components/menu';
import {makeStyles, withStyles } from '@material-ui/core/styles';
import pagarme from 'pagarme'
import 'react-credit-cards/es/styles-compiled.css';
import Cards from 'react-credit-cards';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Alert } from '@material-ui/lab';
import * as moment from 'moment'
const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        backgroundColor: theme.palette.background.paper,
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    centered: {
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        position: 'fixed',
        top: '50%',
        left: '50%',
        //marginTop: '-100px',
        marginLeft: '-300px',
    },
    centeredCard: {
        alignItems: 'center',
        alignContent: 'center',
        justifycontent: 'center',

        marginTop: '10%',
        marginLeft: '-170px',

    },
    button: {
        margin: theme.spacing(1),
        width: '96%',
    },


}));






export default function TitlebarGridList(props) {
    const classes = useStyles();

    const [data, setData] = React.useState({
        resposta: [],
        texto: "",
        cvc: '',
        expiry: '',
        focus: '',
        name: '',
        number: '',
        valor: '',
        cardhash: '',
        nomePessoa: '',
        email: '',
        cpf: '',
        error: '',


    });

    const [date, setDate] = React.useState({
        data: "2020-11-16"
      })
    
    const [data1, setData1] = React.useState({
        alerta: ''

    });
    
    const [data2, setData2] = React.useState({
        card: ''

    });
    const card = {
        card_number: data.number,
        card_holder_name: data.name,
        card_expiration_date: data.expiry,
        card_cvv: data.cvc
    }

    var cardhash = '';

    const hash = () => {
        pagarme.client.connect({ encryption_key: 'ek_test_NA3xJ9GOfZQylBmi0ifhbOE6rOfUkm' })
        .then(client => client.security.encrypt(card))
        .then(card_hash => setData2({card: card_hash}))

        
    }

    const cardHash = async () => {  
        await hash();
        await fazPagamento();
    }

    

    const handleInputChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const adicionar = async (tid) => {
        /*console.log("entrei", tid)
        console.log("vt", props.location.state.valor_total)
        console.log("vf", props.location.state.valor_frete)
        console.log("vs", props.location.state.valor_servico)
        console.log("moto", props.location.state.motorista)
        console.log("formap", props.location.state.formapagamento === "1" ? 0 : 1)
        console.log("idpet", props.location.state.id_pet)
        console.log("idpe", props.location.state.id_pessoa)
        console.log("idsempresa", props.location.state.id_servico_empresa)
        console.log("idend", props.location.state.id_endereco !== "" ? parseInt(props.location.state.id_endereco) : 0)
        console.log("data", date.data)*/
    
    
        const NewDate = moment("16/11/2020", 'DD-MM-YYYY')
        var datanova = NewDate.format('YYYY-MM-DD')
    
        await fetch('http://www.ipet.kinghost.net/v1/account/AlteraStatusRequisicao', {
            method: "POST",
            headers: {
              'Accept': '*/*',
              'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            "valor_total": parseFloat(props.location.state.valor_total),
            "valor_frete": parseFloat(props.location.state.valor_frete),
            "valor_servico": parseFloat(props.location.state.valor_servico),
            "statusmotorista": parseInt(props.location.state.motorista),
            "id_formaPagamento": props.location.state.formapagamento === "1" ? 0 : 1,
            "id_pet": parseInt(props.location.state.id_pet),
            "id_pessoa": parseInt(props.location.state.id_pessoa),
            "id_status": 6,
            "id_ServicoEmpresa": parseInt(props.location.state.id_servico_empresa),
            "id_endereco": props.location.state.id_endereco !== "" ? parseInt(props.location.state.id_endereco) : 0,
            "manha": false,
            "tarde": false,
            "data": datanova,
            "adisposicao": false,
            "agendamento": props.location.state.agendamento,
            "id_transacao": parseInt(tid)
          })
        })
            .then((response) => response.json())
            .then((responseJson) => {
              console.log(responseJson)
            }
            )
            .catch((error) => { console.log("erro fetch cadastro", error) });
        }


    const fazPagamento = async () => {

    
        fetch('https://api.pagar.me/1/transactions?', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              
                    "api_key": "ak_test_KpivEkrnxyTXHnEQ2XOmTm5NPs3lcV",
                    "amount": 10000,
                    "card_hash": data2.card,
                    "customer": {
                      "external_id": "#3311",
                      "name": props.location.state.solicitante, //data.nomePessoa,
                      "type": "individual",
                      "country": "br",
                      "email": "teste@teste.com", //data.email,
                      "documents": [
                        {
                          "type": "cpf",
                          "number": "106.390.099-99",//data.cpf
                        }
                      ],
                      "phone_numbers": ["+5511999998888", "+5511888889999"],
                    "birthday": "1965-01-01"
                    },
                    "billing": {
                      "name": "Trinity Moss",
                      "address": {
                        "country": "br",
                        "state": "sp",
                        "city": "Cotia",
                        "neighborhood": "Rio Cotia",
                        "street": "Rua Matrix",
                        "street_number": "9999",
                        "zipcode": "06714360"
                      }
                    },
                    "shipping": {
                      "name": "Neo Reeves",
                      "fee": 1000,
                      "delivery_date": "2000-12-21",
                      "expedited": true,
                      "address": {
                        "country": "br",
                        "state": "sp",
                        "city": "Cotia",
                        "neighborhood": "Rio Cotia",
                        "street": "Rua Matrix",
                        "street_number": "9999",
                        "zipcode": "06714360"
                      }
                    },
                    "items": [
                      {
                        "id": "r123",
                        "title": "Red pill",
                        "unit_price": 10000,
                        "quantity": 1,
                        "tangible": true
                      },
                      {
                        "id": "b123",
                        "title": "Blue pill",
                        "unit_price": 10000,
                        "quantity": 1,
                        "tangible": true
                      }
                    ]
                }
        
            )
        })
            .then((response) => response.json())
            .then((responseJson) => {
               console.log(responseJson);
               if (responseJson.status == "paid"){
                if(props.location.state.agendamento == "s"){
                    props.history.push({
                        pathname: '/agendamento',
                        state: props.location.state })
                }else{
                    adicionar(responseJson.tid);
                    
                    props.history.push({
                        pathname: '/solicitacao',
                        state: props.location.state })
                }
                
               }else {
                console.log("entrrei no else")
                setData1({...data1, alerta: "Verifique os dados do seu cartão."})
               }
            }
            )
            .catch((error) => { console.log("erro fetch pagamento", error) });
    }
        
    
    


    return (


        <div className={classes.root}>

            <div style={{ width: "100%" }}> <Menu /></div>
            
            <div className={classes.centeredCard}>
                <Cards
                    cvc={data.cvc}
                    expiry={data.expiry}
                    focused={data.focus}
                    name={data.name}
                    number={data.number}
                />
            </div>
           
            <div className={classes.centered}>
            {data1.alerta ? <Alert variant="filled" severity="error">{data1.alerta}</Alert> : data1.alerta}

                <form action="" >
                    <TextField id="outlined-basic" label="Nome" variant="outlined"
                        name="name"
                        onChange={handleInputChange}
                    //onFocus={handleInputFocus}
                    />
                    <TextField id="outlined-basic" label="Data" variant="outlined"
                        name="expiry"
                        onChange={handleInputChange}
                    />
                </form>
                <form action="" >
                    <TextField id="outlined-basic" label="Número do Cartão" variant="outlined"
                        type="text"
                        name="number"
                        onChange={handleInputChange}
                    />
                    <TextField id="outlined-basic" label="CVC" variant="outlined"
                        type="number"
                        name="cvc"
                        onChange={handleInputChange}
                    />
                  
                </form>
                <Button className={classes.button}
                        variant="contained"
                        color="#44FD12"
                        onClick={cardHash}
                        
                    >
                        Pagar
                   </Button>

            </div>

        </div>


    );
}

