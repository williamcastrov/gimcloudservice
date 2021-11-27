<?php

namespace App\Http\Controllers\API\Costos;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class InformesCostosRealesController extends Controller
{
    //
    public function get($periodo){
        try { 
          $data = DB::select("SELECT t0.*, t1.descripcion_tcv
          FROM costosvariableperiodo as t0 INNER JOIN tipocostovariable_tcv as t1
          WHERE t0.periodo_cvp = $periodo and t0.tipocosto_cvp = t1.id_tcv");
      
          if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
          }
          else {
              $response['data'] = null;
              $response['message'] = "Not found data id_cvp => $id_cvp";
              $response['success'] = false;
          }
          } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
          }
          return $response;
    }

    public function equipostotales(){
        try { 
          $data = DB::select("SELECT COUNT(*) as totalequipos
          FROM equipos as t0 INNER JOIN estadoscliente AS t1
          WHERE tipo_equ = 8 AND t1.id_estcli = t0.estadocliente_equ and estadocliente_equ IN (2,4)");
              
//              "SELECT COUNT(*) as totalequipos
//          FROM equipos as t0 INNER JOIN ubicaciones as t1 INNER JOIN ciudades as t2
//          WHERE t0.estadocontable_equ = 1 and tipo_equ = 8 and t1.equipo_ubi = t0.id_equ and t2.id_ciu = t1.ciudad_ubi 
//            and t1.estado_ubi = 31");
      
          if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
          }
          else {
              $response['data'] = null;
              $response['message'] = "Not found data estadocontable_equ => 1";
              $response['success'] = false;
          }
          } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
          }
          return $response;
    }

    public function equipostotalesrenta(){
        try { 
          $data = DB::select("SELECT COUNT(*) as totalequiposrenta
          FROM equipos as t0 INNER JOIN estadoscliente AS t1 INNER JOIN ubicaciones AS t2 INNER JOIN ciudades AS t3
          WHERE tipo_equ = 8 AND t1.id_estcli = t0.estadocliente_equ and estadocliente_equ IN (2,4)
            AND t2.equipo_ubi = t0.id_equ AND t3.id_ciu = t2.ciudad_ubi AND t2.estado_ubi = 31 
            and t3.departamento_ciu = '05'");
      
          if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
          }
          else {
              $response['data'] = null;
              $response['message'] = "Not found data estadocontable_equ => 1";
              $response['success'] = false;
          }
          } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
          }
          return $response;
    }

    public function leeinformacionequipos($periodo){
        try { 
          $data = DB::select("SELECT t0.*, t1.valorenlibros_act, t2.valorrentames_ctr, t1.depreciacionmensual_act, t4.nombre_ciu,
                                     t4.departamento_ciu, vista_contrataciones.codigo, vista_contrataciones.valorcontrataciones,
                                     vista_consumosrepuestos.codigo_cre, vista_consumosrepuestos.valorconsumosrepuestos,
                                     seguros.valorcomercial_seg
                              FROM   equipos as t0 INNER JOIN activos as t1 INNER JOIN contratos as t2 INNER JOIN ubicaciones as t3
                                     INNER JOIN ciudades as t4
                                     left join vista_contrataciones on (vista_contrataciones.documentoref = t0.codigo_equ AND 
                                     vista_contrataciones.periodo = $periodo)   
                                     left join vista_consumosrepuestos on (vista_consumosrepuestos.idequipo_cre = t0.codigo_equ and 
                                     vista_consumosrepuestos.periodo_cre = $periodo)
                                     left join seguros on (seguros.equipo_seg = t0.id_equ and activo_seg = 'S')   
                  WHERE  t0.tipo_equ = 8 and t1.codigo_act = t0.id_equ and t2.id_ctr = t0.id_equ and t3.equipo_ubi = t0.id_equ
                    and  t4.id_ciu   = t3.ciudad_ubi and t3.estado_ubi = 31");
      
          if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
          }
          else {
              $response['data'] = null;
              $response['message'] = "Not found data periodo => 1";
              $response['success'] = false;
          }
          } catch (\Exception $e) {
              $response['message'] = $e->getMessage();
              $response['success'] = false;
          }
          return $response;
    }
}
