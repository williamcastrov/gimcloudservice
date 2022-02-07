<?php

namespace App\Http\Controllers\API\Ventas;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Ventas\RegistroLlamadas;

class RegistroLlamadasController extends Controller
{
    //
    public function create(Request $request){
        try {
            $insert['cliente_rll']         = $request['cliente_rll'];
            $insert['motivollamada_rll']   = $request['motivollamada_rll'];
            $insert['contacto_rll']        = $request['contacto_rll'];
            $insert['fecha_rll']           = $request['fecha_rll'];
            $insert['equipo_rll']          = $request['equipo_rll'];
            $insert['observaciones_rll']   = $request['observaciones_rll'];

            RegistroLlamadas::insert($insert);
    
            $response['message'] = "Registro llamada a Cliente grabada!";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
           
          return $response;
        }
  
        public function listar_registrollamadas(){
  
          try {

            $data = DB::select("SELECT t0.*, t1.*, t2.nombre_ciu, t4.direccion_dequ, t4.referencia_dequ, 
                                t4.modelo_dequ,
                                concat(t3.primer_nombre_con,' ',t3.primer_apellido_con) as nombrecontacto
            FROM seguimientoclientes t0 INNER JOIN interlocutores_cli as t1 INNER JOIN ciudades as t2
                                        INNER JOIN contactos as t3 INNER JOIN datosadicionalequipos as t4
            WHERE t0.cliente_rll = t1.id_cli and t1.ciudad_cli = t2.id_ciu and t3.id_con = t0.contacto_rll
              and t0.equipo_rll = t4.id_dequ");
  
            $response['data'] = $data;
            $response['message'] = "load successful";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
          return $response;
        }

        public function listar_registrollamadascliente($cliente_rll){
          try {
    
            $data = DB::select("SELECT t0.*, t1.*, t4.direccion_dequ, t4.referencia_dequ, t4.modelo_dequ
            FROM seguimientoclientes t0 INNER JOIN interlocutores_cli as t1 INNER JOIN datosadicionalequipos as t4
            WHERE t0.cliente_rll = t1.id_cli and t0.cliente_rll = $cliente_rll and t0.equipo_rll = t4.id_dequ");
    
            if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
            }
            else {
              $response['data'] = null;
              $response['message'] = "Not found data cliente_rll => $cliente_rll";
              $response['success'] = false;
            }
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
          return $response;
        }
  
        public function get($id_rll){
          try {
            $data = DB::select("SELECT t0.*, t1.*
            FROM seguimientoclientes t0 INNER JOIN interlocutores_cli as t1
            WHERE t0.cliente_rll = t1.id_cli and t0.id_rll = $id_rll");
    
            if ($data) {
              $response['data'] = $data;
              $response['message'] = "Load successful";
              $response['success'] = true;
            }
            else {
              $response['data'] = null;
              $response['message'] = "Not found data id_rll => $id_rll";
              $response['success'] = false;
            }
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
          return $response;
        }
  
        public function update(Request $request, $id_rll){
          try {
            $data['cliente_rll']       = $request['cliente_rll'];
            $data['motivollamada_rll'] = $request['motivollamada_rll'];
            $data['contacto_rll']      = $request['contacto_rll'];
            $data['fecha_rll']         = $request['fecha_rll'];
            $data['equipo_rll']        = $request['equipo_rll'];
            $data['observaciones_rll'] = $request['observaciones_rll'];
            //Console::info('mymessage');
  
            $res = RegistroLlamadas::where("id_rll",$id_rll)->update($data);
  
            $response['res'] = $res;
            $response['message'] = "Updated successful";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
          return $response;
        }
  
        public function delete($id_rll){
          try {
            $res = RegistroLlamadas::where("id_rll",$id_rll)->delete($id_rll);
            $response['res'] = $res;
  
            $response['message'] = "Deleted successful";
            $response['success'] = true; 
            
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
    
          return $response;
        }

}
