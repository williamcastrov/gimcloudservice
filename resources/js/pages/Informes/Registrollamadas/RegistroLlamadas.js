import React, { useEffect, useState } from 'react';
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Button, Typography } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import Moment from 'moment';

import registrollamadasServices from "../../../services/Ventas/RegistroLlamadas";

const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 700,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    formControl: {
        margin: theme.spacing(0),
        minWidth: 300,
    },
    typography: {
        fontSize: 16,
        color: "#ff3d00"
    },
    button: {
        color: theme.palette.getContrastText(blueGrey[500]),
        backgroundColor: blue[700],
        margin: theme.spacing(1),
        fontSize: 12,
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    button2: {
        color: theme.palette.getContrastText(blueGrey[500]),
        backgroundColor: red[700],
        margin: theme.spacing(1),
        fontSize: 12,
        '&:hover': {
            backgroundColor: blue[700],
        },
    },
}));

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
            prefix="$"
        />
    );
}

function RegistroLlamadas() {
    const styles = useStyles();
    const [listarLlamadas, setListarLlamadas] = useState([]);
    const fechaactual = Moment(new Date()).format('YYYY-MM-DD');

    useEffect(() => {
        async function fetchDataLlamadas() {
            const res = await registrollamadasServices.listarregistrollamadas();
            setListarLlamadas(res.data);
            console.log("Registro de Llamada : ", res.data);
        }
        fetchDataLlamadas();
    }, [])

    return (
        <div>
            <div align="center" >
                <Button className={styles.button} color="primary" >
                    <ReactHTMLTableToExcel
                        table="emp"
                        filename="RegistroLlamadas"
                        sheet="Sheet"
                        buttonText="Exportar a Excel"
                    />
                </Button>
            </div>
            <table id="emp" className="table">
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Motivo Llamada</th>
                        <th>Fecha Llamada</th>
                        <th>Contacto</th>
                        <th>Ciudad</th>
                        <th>Dirección Cliente</th>
                        <th>Telefono</th>
                        <th>Email</th>
                        <th>Referencia</th>
                        <th>Modelo</th>
                        <th>Dirección Equipo</th>
                        <th>Observación</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listarLlamadas && listarLlamadas.map((llamadas, index) => {
                            return (
                                <tr>
                                    <td>{llamadas.razonsocial_cli}</td>
                                    <td>{llamadas.nombre_est}</td>
                                    <td>{llamadas.fecha_rll}</td>
                                    <td>{llamadas.nombrecontacto}</td>
                                    <td>{llamadas.nombre_ciu}</td>
                                    <td>{llamadas.direccion_cli}</td>
                                    <td>{llamadas.telefono_cli}</td>
                                    <td>{llamadas.email_cli}</td>
                                    <td>{llamadas.referencia_dequ}</td>
                                    <td>{llamadas.modelo_dequ}</td>
                                    <td>{llamadas.direccion_dequ}</td>
                                    <td>{llamadas.observaciones_rll}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </div>
    );
}

export default RegistroLlamadas;