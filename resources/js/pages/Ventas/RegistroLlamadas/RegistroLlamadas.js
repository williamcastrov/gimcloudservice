import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Grid } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import Moment from 'moment';
import swal from 'sweetalert';

// Componentes de Conexion con el Backend
import estadosServices from "../../../services/Parameters/Estados";
import clientesServices from "../../../services/Interlocutores/Clientes";
import registrollamadasServices from "../../../services/Ventas/RegistroLlamadas";

const useStyles = makeStyles((theme) => ({
  modal: {
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
  iconos: {
    cursor: 'pointer'
  },
  inputMaterial: {
    width: '100%'
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 415,
  },
  typography: {
    fontSize: 16,
    color: "#ff3d00"
  },
  button: {
    color: theme.palette.getContrastText(blueGrey[500]),
    backgroundColor: green[700],
    margin: theme.spacing(1),
    fontSize: 12,
    '&:hover': {
      backgroundColor: blue[700],
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

function RegistroLlamadas() {
  const styles = useStyles();
  const [listRegistroLlamadas, setListRegistroLlamadas] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [formError, setFormError] = useState(false);
  const [listEstados, setListEstados] = useState([]);
  const [listarClientes, setListarClientes] = useState([]);
  const [actualiza, setActualiza] = useState(false);

  const fechaactual = Moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
  const [registroLlamadasSeleccionado, setRegistroLlamadasSeleccionado] = useState({
    id_rll: "",
    cliente_rll: "",
    motivollamada_rll: "",
    pedientellamada_rll: "",
    comentarios_rll: "",
    fecha_rll: "",
    estadollamada_rll: "",
  })

  useEffect(() => {
    async function fetchDataLlamadas() {
      const res = await registrollamadasServices.listarregistrollamadas();
      setListRegistroLlamadas(res.data)
      //console.log(res.data);
      setActualiza(false);
    }
    fetchDataLlamadas();
  }, [actualiza])

  useEffect(() => {
    async function fetchDataEstados() {
      const res = await estadosServices.listEstadosLlamadas();
      setListEstados(res.data)
      //console.log(res.data);
      setActualiza(false);
    }
    fetchDataEstados();
  }, [actualiza])

  useEffect(() => {
    async function fetchDataClientes() {
      const res = await clientesServices.listClientes();
      setListarClientes(res.data)
      //console.log(res.data);
    }
    fetchDataClientes();
  }, [])

  const handleChange = e => {
    const { name, value } = e.target;

    setRegistroLlamadasSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarLlamada = (llamada, caso) => {
    setRegistroLlamadasSeleccionado(llamada);
    (caso === "Editar") ? abrirCerrarModalEditar() : abrirCerrarModalEliminar()
  }

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  }

  const grabarRegistroLlamada = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!registroLlamadasSeleccionado.cliente_rll) {
      errors.cliente_rll = true;
      formOk = false;
    }

    if (!registroLlamadasSeleccionado.motivollamada_rll) {
      errors.motivollamada_rll = true;
      formOk = false;
    }

    if (!registroLlamadasSeleccionado.pedientellamada_rll) {
      errors.pedientellamada_rll = true;
      formOk = false;
    }

    if (!registroLlamadasSeleccionado.pedientellamada_rll) {
      errors.pedientellamada_rll = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log(registroLlamadasSeleccionado);
      const res = await registrollamadasServices.save(registroLlamadasSeleccionado);

      if (res.success) {
        swal("Registro Llamadas", "Registro Llamada Creado de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalInsertar();
      } else {
        swal("Registro Llamadas", "Error Creando el Registro de Llamadas!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      swal("Registro Llamadas", "Debe Ingresar Todos los Datos, Revisar Información!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
    setActualiza(true);
  }

  const actualizarRegistroLlamada = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!registroLlamadasSeleccionado.cliente_rll) {
      errors.cliente_rll = true;
      formOk = false;
    }

    if (!registroLlamadasSeleccionado.motivollamada_rll) {
      errors.motivollamada_rll = true;
      formOk = false;
    }

    if (!registroLlamadasSeleccionado.pedientellamada_rll) {
      errors.pedientellamada_rll = true;
      formOk = false;
    }

    if (!registroLlamadasSeleccionado.pedientellamada_rll) {
      errors.pedientellamada_rll = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
console.log("DATA REGISTRO LLAMADA : ", registroLlamadasSeleccionado)
      const res = await registrollamadasServices.update(registroLlamadasSeleccionado);

      if (res.success) {
        swal("Registro Llamadas", "Registro de Llamada actualizado de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEditar();
      } else {
        swal("Registro Llamadas", "Error Actualizando el Registro de Llamadas!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEditar();
      }
    }
    else {
      swal("Registro Llamadas", "Debe Ingresar Todos los Datos, Revisar Información!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEditar();
    }
    setActualiza(true);
  }

  const borrarRegistroLlamada = async () => {

    const res = await registrollamadasServices.delete(registroLlamadasSeleccionado.id_rll);

    if (res.success) {
      swal("Registro Llamadas", "Registro de Llamada Borrado de forma Correcta!", "success", { button: "Aceptar" });
      console.log(res.message)
      abrirCerrarModalEliminar();
    }
    else {
      swal("Registro Llamadas", "Error Borrando El Registro de Llamada!", "error", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEliminar();
    }
    setActualiza(true);
  }
  // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Cliente',
      field: 'razonsocial_cli'
    },
    {
      title: 'Motivo',
      field: 'motivollamada_rll'
    },
    {
      title: 'Pendiente',
      field: 'pedientellamada_rll',
      cellStyle: { minWidth: 300 }
    },
    {
      title: 'Comentarios',
      field: 'comentarios_rll'
    },
    {
      title: 'Fecha',
      field: 'fecha_rll'
    },
    {
      title: 'Estado',
      field: 'nombre_est'
    }
  ]

  const llamadaInsertar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block">Agregar Registro de Llamada </Typography>
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEmpresa"> Cliente </InputLabel>
        <Select
          labelId="selectCliente"
          name="cliente_rll"
          id="idselectcliente_rll"
          onChange={handleChange}
        >
          <MenuItem value="">  <em>None</em> </MenuItem>
          {
            listarClientes.map((itemselect) => {
              return (
                <MenuItem value={itemselect.id_cli}>{itemselect.razonsocial_cli}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
      <TextField className={styles.inputMaterial} label="Motivo de Llamada" name="motivollamada_rll" onChange={handleChange} />
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEmpresa"> Pendiente Llamada </InputLabel>
        <Select
          labelId="selectPendiente"
          name="pedientellamada_rll"
          id="idselectpedientellamada_rlll"
          onChange={handleChange}
        >
          <MenuItem value="">  <em>None</em> </MenuItem>
          {
            listEstados.map((itemselect) => {
              return (
                <MenuItem value={itemselect.id_est}>{itemselect.nombre_est}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
      <TextField className={styles.inputMaterial} label="Comentarios" name="comentarios_rll" onChange={handleChange} />

      <TextField type="date" InputLabelProps={{ shrink: true }} name="fecha_rll"
        defaultValue={Moment(fechaactual).format('YYYY-MM-DD')} label="Fecha Llamada"
        fullWidth onChange={handleChange} />

      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEstadoLlamada"> Estado </InputLabel>
        <Select
          labelId="selectEstadoLlamada"
          name="estadollamada_rll"
          id="idselectestadollamada_rll"
          onChange={handleChange}
        >
          <MenuItem value="">  <em>None</em> </MenuItem>
          {
            listEstados.map((itemselect) => {
              return (
                <MenuItem value={itemselect.id_est}>{itemselect.nombre_est}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
      <br /><br />
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => grabarRegistroLlamada()} >Insertar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )
  //value={registroLlamadasSeleccionado && registroLlamadasSeleccionado.empresa_estcli}
  const llamadaeditar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block">Actualizar Estados del Cliente</Typography>
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEmpresa"> Cliente </InputLabel>
        <Select
          labelId="selectCliente"
          name="cliente_rll"
          id="idselectcliente_rll"
          onChange={handleChange}
          value={registroLlamadasSeleccionado && registroLlamadasSeleccionado.cliente_rll}
        >
          <MenuItem value="">  <em>None</em> </MenuItem>
          {
            listarClientes.map((itemselect) => {
              return (
                <MenuItem value={itemselect.id_cli}>{itemselect.razonsocial_cli}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
      <TextField className={styles.inputMaterial} label="Motivo de Llamada" name="motivollamada_rll" onChange={handleChange} />
      <br />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEmpresa"> Pendiente Llamada </InputLabel>
        <Select
          labelId="selectPendiente"
          name="pedientellamada_rll"
          id="idselectpedientellamada_rlll"
          onChange={handleChange}
          value={registroLlamadasSeleccionado && registroLlamadasSeleccionado.pedientellamada_rll}
        >
          <MenuItem value="">  <em>None</em> </MenuItem>
          {
            listEstados.map((itemselect) => {
              return (
                <MenuItem value={itemselect.id_est}>{itemselect.nombre_est}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
      <TextField className={styles.inputMaterial} label="Comentarios" name="comentarios_rll" onChange={handleChange} />
      <TextField type="date" InputLabelProps={{ shrink: true }} name="fecha_rll"
        defaultValue={Moment(fechaactual).format('YYYY-MM-DD')} label="Fecha Llamada"
        value={registroLlamadasSeleccionado && registroLlamadasSeleccionado.fecha_rll}
        fullWidth onChange={handleChange} />
      <FormControl className={styles.formControl}>
        <InputLabel id="idselectEstadoLlamada"> Estado </InputLabel>
        <Select
          labelId="selectEstadoLlamada"
          name="estadollamada_rll"
          id="idselectestadollamada_rll"
          onChange={handleChange}
          value={registroLlamadasSeleccionado && registroLlamadasSeleccionado.estadollamada_rll}
        >
          <MenuItem value="">  <em>None</em> </MenuItem>
          {
            listEstados.map((itemselect) => {
              return (
                <MenuItem value={itemselect.id_est}>{itemselect.nombre_est}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
      <br /><br />
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => actualizarRegistroLlamada()} >Editar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const llamadaEliminar = (
    <div className={styles.modal}>
      <p>Eliminar el Registro de Llamada <b>{registroLlamadasSeleccionado && registroLlamadasSeleccionado.fecha_rll} {"-"}
        {registroLlamadasSeleccionado && registroLlamadasSeleccionado.motivollamada_rll}</b>? </p>
      <div align="right">
        <Button className={styles.button} color="secondary" onClick={() => borrarRegistroLlamada()}> Confirmar </Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEliminar()}> Cancelar </Button>

      </div>

    </div>
  )

  return (
    <div className="App">
      <br />
      <Button variant="contained" startIcon={<SaveIcon />} color="primary" onClick={() => abrirCerrarModalInsertar()} >Agregar Llamada</Button>
      <MaterialTable
        columns={columnas}
        data={listRegistroLlamadas}
        title="CONSULTAR REGISTRO DE LLAMADA"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Llamada',
            onClick: (event, rowData) => seleccionarLlamada(rowData, "Editar")
          },
          {
            icon: 'delete',
            tooltip: 'Borrar Llamada',
            onClick: (event, rowData) => seleccionarLlamada(rowData, "Eliminar")
          }
        ]}
        options={{
          actionsColumnIndex: -1
        }}
        localization={{
          header: {
            actions: "Acciones"
          }
        }}
      />{ }
      <Modal
        open={modalInsertar}
        onClose={abrirCerrarModalInsertar}
      >
        {llamadaInsertar}
      </Modal>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {llamadaeditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {llamadaEliminar}
      </Modal>
    </div>
  );
}

export default RegistroLlamadas;