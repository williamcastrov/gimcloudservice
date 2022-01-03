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
            $insert['consecutivo_rll']     = $request['consecutivo_rll'];
            $insert['cliente_rll']         = $request['cliente_rll'];
            $insert['motivollamada_rll']   = $request['motivollamada_rll'];
            $insert['pedientellamada_rll'] = $request['pedientellamada_rll'];
            $insert['comentarios_rll']     = $request['comentarios_rll'];
            $insert['fecha_rll']           = $request['fecha_rll'];
            $insert['estadollamada_rll']   = $request['estadollamada_rll'];

            RegistroLlamadas::insert($insert);
    
            $response['message'] = "Estado de Calidad Grabado de forma correcta";
            $response['success'] = true;
    
          } catch (\Exception $e) {
            $response['message'] = $e->getMessage();
            $response['success'] = false;
          }
           
          return $response;
        }
  
        public function listar_registrollamadas(){
  
          try {
  
            $data = DB::select("SELECT t0.*, t1.*, t2.nombre_est, t3.nombre_ciu
            FROM registrollamadas t0 INNER JOIN interlocutores_cli as t1 INNER JOIN estados as t2 INNER JOIN ciudades as t3
            WHERE t0.cliente_rll = t1.id_cli and t0.estadollamada_rll = t2.id_est and t1.ciudad_cli = t3.id_ciu");
  
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
    
            $data = DB::select("SELECT t0.*, t1.*
            FROM registrollamadas t0 INNER JOIN interlocutores_cli as t1
            WHERE t0.cliente_rll = t1.id_cli and t0.cliente_rll = $cliente_rll");
    
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
            FROM registrollamadas t0 INNER JOIN interlocutores_cli as t1
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
            $data['consecutivo_rll']     = $request['consecutivo_rll'];
            $data['id_rll']              = $request['id_rll'];
            $data['cliente_rll']         = $request['cliente_rll'];
            $data['motivollamada_rll']   = $request['motivollamada_rll'];
            $data['pedientellamada_rll'] = $request['pedientellamada_rll'];
            $data['comentarios_rll']     = $request['comentarios_rll'];
            $data['fecha_rll']           = $request['fecha_rll'];
            $data['estadollamada_rll']   = $request['estadollamada_rll'];
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
