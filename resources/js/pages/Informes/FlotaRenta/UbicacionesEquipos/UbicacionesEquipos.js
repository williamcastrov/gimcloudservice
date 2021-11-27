import React, { useEffect, useState } from 'react';
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Button, Typography } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import Moment from 'moment';

import ubicacionesServices from "../../../../services/DatosEquipos/Ubicaciones";
import cumplimientooserv from '../../../../services/GestionOrdenes/CumplimientoOserv';

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

function UbicacionesEquipos() {
    const styles = useStyles();
    const [listarUbicacionesMT, setListarUbicacionesMT] = useState([]);
    const fechaactual = Moment(new Date()).format('YYYY-MM-DD');

    useEffect(() => {
        async function fetchDataUbicacionesMT() {
            const res = await ubicacionesServices.listUbicaciones();
            setListarUbicacionesMT(res.data);
            console.log("UBICACIONES EQUIPOS : ", res.data);
        }
        fetchDataUbicacionesMT();
    }, [])

    return (
        <div>
            <div align="center" >
                <Button className={styles.button} color="primary" >
                    <ReactHTMLTableToExcel
                        table="ubicacionesequipos"
                        filename="Ubicaciones equipos"
                        sheet="Sheet"
                        buttonText="Exportar a Excel"
                    />
                </Button>
            </div>
            <table id="ubicacionesequipos" className="table">
                <thead>
                    <tr>
                        <th>EQUIPO</th>
                        <th>DESCRIPCIÓN</th>
                        <th>CLIENTE</th>
                        <th>DIRECCIÓN</th>
                        <th>CIUDAD</th>
                        <th>ESTADO</th>   
                    </tr>
                </thead>
                <tbody>
                    {
                        listarUbicacionesMT && listarUbicacionesMT.map((hojavida, index) => {
                            return (
                                <tr>
                                    <td>{hojavida.codigo_equ}</td>
                                    <td>{hojavida.descripcion_equ}</td>
                                    <td>{hojavida.razonsocial_cli}</td>
                                    <td>{hojavida.direccion_ubi}</td>
                                    <td>{hojavida.nombre_ciu}</td> 
                                    <td>{hojavida.nombre_est}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </div>
    );
}

export default UbicacionesEquipos;