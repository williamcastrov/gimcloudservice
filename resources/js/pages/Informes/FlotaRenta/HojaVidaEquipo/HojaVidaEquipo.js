import React, { useEffect, useState } from 'react';
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Button, Typography } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import Moment from 'moment';

import equiposServices from "../../../../services/Mantenimiento/Equipos";
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

function HojaVidaEquipos() {
    const styles = useStyles();
    const [listarActividadesOT, setListarActividadesOT] = useState([]);
    const fechaactual = Moment(new Date()).format('YYYY-MM-DD');

    useEffect(() => {
        async function fetchDataHojaVida() {
            const res = await cumplimientooserv.leerdatoshojadevida();
            setListarActividadesOT(res.data);
            console.log("ACTIVIDADES EQUIPOS : ", res.data);
        }
        fetchDataHojaVida();
    }, [])

    return (
        <div>
            <div align="center" >
                <Button className={styles.button} color="primary" >
                    <ReactHTMLTableToExcel
                        table="hojavidaequipos"
                        filename="Hoja de vida equipos"
                        sheet="Sheet"
                        buttonText="Exportar a Excel"
                    />
                </Button>
            </div>
            <table id="hojavidaequipos" className="table">
                <thead>
                    <tr>
                        <th>EQUIPO</th>
                        <th>DESCRIPCION</th>
                        <th>ID ACTIVIDAD</th>
                        <th>ID OT</th>
                        <th>FECHA OT</th>
                        <th>HOROMETRO</th>
                        <th>ACTIVIDAD REALIZADA</th>
                        <th>FECHA PENDIENTE</th>
                        <th>PENDIENTES</th>
                        <th>EQUIPO OPERATIVO</th>
                        <th>TIEMPOACTIVUDAD</th>   
                    </tr>
                </thead>
                <tbody>
                    {
                        listarActividadesOT && listarActividadesOT.map((hojavida, index) => {
                            return (
                                <tr>
                                    <td>{hojavida.codigo_equ}</td>
                                    <td>{hojavida.descripcion_equ}</td>
                                    <td>{hojavida.id_actividad}</td>
                                    <td>{hojavida.id_cosv}</td>
                                    <td>{hojavida.fechaprogramada_cosv}</td> 
                                    <td>{hojavida.horometro_cosv}</td>
                                    <td>{hojavida.descripcion_cosv}</td>
                                    <td>{hojavida.fecha_pot}</td>
                                    <td>{hojavida.descripcion_pot}</td>
                                    <td>{hojavida.nombre_est}</td>                             
                                    <td>{hojavida.tiempoactividad_cosv}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </div>
    );
}

export default HojaVidaEquipos;