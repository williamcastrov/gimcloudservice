import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import MaterialTable from "material-table";
import { Modal, Button, TextField, Select, MenuItem, FormControl, InputLabel, Grid, Typography } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import NumberFormat from 'react-number-format';
import { useHistory } from "react-router-dom";
import Moment from 'moment';
import { MultiSelect } from "react-multi-select-component";
import SaveIcon from '@material-ui/icons/Save';

// Componentes de Conexion con el Backend
import equiposServices from "../../../services/Mantenimiento/Equipos";
import clientesServices from "../../../services/Interlocutores/Clientes";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 750,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  modal2: {
    position: 'absolute',
    width: 500,
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
  iconos: {
    cursor: 'pointer'
  },
  inputMaterial: {
    width: '100%'
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 325,
    maxWidth: 325,
  },
  button: {
    color: theme.palette.getContrastText(blueGrey[500]),
    backgroundColor: green[700],
    margin: theme.spacing(1),
    fontSize: 12,
    '&:hover': {
      backgroundColor: blue[700],
    },
  }
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

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

function OfrecerServicios(props) {
  const { consecutivo, prefijo, idUsu, consecutivoActivo } = props;
  const history = useHistory();
  //console.log("CONSECUTIVO : ", prefijo)
  const styles = useStyles();
  const [listarEquipos, setListarEquipos] = useState([]);
  const [modalCodigoCliente, setModalCodigoCliente] = useState(true);
  const fechaactual = Moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
  const [clientesMultiselect, setClientesMultiselect] = useState([]);
  const [actualiza, setActualiza] = useState(false);
  const [selected, setSelected] = useState([]);

  let frecuencia = 1

  const [equiposSeleccionado, setEquiposSeleccionado] = useState({
    'id_equ': "",
    'codigo_equ': consecutivo,
    'tipo_equ': 8,
    'descripcion_equ': "",
    'empresa_equ': 1,
    'frecuencia_equ': frecuencia,
    'propietario_equ': "",
    'marca_equ': "",
    'antiguedad_equ': "",
    'grupoequipo_equ': "",
    'subgrupoparte_equ': "",
    'valoradquisicion_equ': "",
    'estadocontable_equ': 1,
    'estadocliente_equ': 1,
    'estadomtto_equ': 1,
    'estadocalidad_equ': 1,
    'ctacontable_equ': 0,
    'ctadepreciacion_equ': 0,
    'manejamatricula_equ': "N",
    'manejamarcacion_equ': "N",
    'fecharetornaequipo_equ': fechaactual,
    'combogrupo_equ': 0,
    'datoauxiliarpropietario_equ': 0,
    'datoauxiliaradmon_equ': 0,
    'datoauxiliarcontabilidad_equ': 0,
    'datoauxiliaralza_equ': 0,
    'datoauxiliaraquimejora_equ': 0,
    'datoauxiliarcalidad_equ': 0
  })

  const consultarCliente = () => {
  console.log("CLIENTE SELECCIONADO : ", selected);
  
  async function fetchDataEquipos() {
      const res = await equiposServices.listar_equiposofrecerservicios(selected[0].value);
      setListarEquipos(res.data);
      //console.log(res.data)
    }
    fetchDataEquipos();
    abrirCerrarModalCodigoCliente();
  }

  useEffect(() => {
    async function fetchDataClientesMultiselect() {
      const res = await clientesServices.listar_clientesmultiselect();
      setClientesMultiselect(res.data)
      //console.log(res.data);
    }
    fetchDataClientesMultiselect();
  }, [])

  const abrirCerrarModalCodigoCliente = () => {
    setModalCodigoCliente(!modalCodigoCliente);
  }

  // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      field: 'codigo_equ',
      title: 'Codigo',
      cellStyle: { minWidth: 50 }
    },
    {
      field: 'descripcion_equ',
      title: 'Descripción  del Equipo',
      cellStyle: { minWidth: 190 }
    },
    {
      field: 'referencia_dequ',
      title: 'Referencia',
      cellStyle: { minWidth: 70 }
    },
    {
      field: 'modelo_dequ',
      title: 'Modelo',
      cellStyle: { minWidth: 70 }
    },
    {
      field: 'serie_dequ',
      title: 'Serie',
      cellStyle: { minWidth: 70 }
    },
    {
      field: 'annofabricacion_dequ',
      title: 'Año Fabricacion',
      cellStyle: { minWidth: 70 }
    },
    {
      field: 'fecharetornaequipo_equ',
      title: 'Fecha de venta',
      cellStyle: { minWidth: 70 }
    },
    {
      field: 'razonsocial_cli',
      title: 'Propietario',
      cellStyle: { minWidth: 120 }
    },
    {
      field: 'antiguedad_equ',
      title: 'Antiguedad Años',
      cellStyle: { minWidth: 70 }
    },
    {
      field: 'descripcion_grp',
      title: 'Descripción Grupo del Equipo',
      cellStyle: { minWidth: 160 }
    },
    {
      field: 'valoradquisicion_equ',
      title: 'Valor Equipo',
    }
  ]

  const codigoCliente = (
    <div className="App" >
      <div className={styles.modal2}>
        <Typography align="center" className={styles.typography} variant="button" display="block" >
          Seleccionar Codigo Cliente
        </Typography>
        <Grid item xs={12} md={4}>
          <MultiSelect className="inputmultiselect"
            options={clientesMultiselect}
            value={selected}
            onChange={setSelected}
            labelledBy="Seleccione el Cliente"
            overrideStrings={{
              allItemsAreSelected:
                "All items are selected.",
              clearSearch:
                "Limpiar",
              noOptions:
                "No options",
              search: "Buscar",
              selectAll:
                "Marcar solo uno",
              selectAllFiltered:
                "Select All (Filtered)",
              selectSomeItems:
                "Seleccionar Cliente ...",
            }}
          />
        </Grid>
        <br />
        <div align="center">
          <Button className={styles.button} variant="contained" startIcon={<SaveIcon />} color="primary"
            onClick={() => consultarCliente() } 
          >  
            Consultar Cliente
          </Button>
        </div>
      </div>
    </div>
  )



  return (
    <div className="App">
      <MaterialTable
        columns={columnas}
        data={listarEquipos}
        title=" MAESTRA DE EQUIPOS"
      />
      <Modal
        open={modalCodigoCliente}
        onClose={abrirCerrarModalCodigoCliente}
      >
        {codigoCliente}
      </Modal>
    </div>
  );
}

/*
 <MaterialTable
        columns={columnas}
        data={listarEquipos}
        title=" MAESTRA DE EQUIPOS"
      />
*/

export default OfrecerServicios;