import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Paciente } from '../../models/paciente.model';

import swal from 'sweetalert';

@Injectable()
export class PacienteService {

  totalPacientes: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarPacientes() {

    let url = URL_SERVICIOS + '/paciente';

    return this.http.get( url )
              .map( (resp: any) => {

                this.totalPacientes = resp.total;
                return resp.pacientes;
              });

  }

  cargarPaciente( id: string ) {

    let url = URL_SERVICIOS + '/paciente/' + id;

    return this.http.get( url )
              .map( (resp: any) => resp.paciente );

  }

  buscarPacientes( termino: string ) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/pacientes/' + termino;
    return this.http.get( url )
                .map( (resp: any) => resp.pacientes );

  }

  borrarPaciente( id: string ) {

    let url = URL_SERVICIOS + '/paciente/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
              .map( resp => {
                swal( 'Paciente Borrado', 'Paciente borrado correctamente', 'success' );
                return resp;
              });

  }

  guardarPaciente( paciente: Paciente ) {

    let url = URL_SERVICIOS + '/paciente';

    if ( paciente._id ) {
      // actualizando
      url += '/' + paciente._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, paciente )
                .map( (resp: any) => {
                  swal('Paciente Actualizado', paciente.nombre, 'success');
                  return resp.medico;

                });

    }else {
      // creando
      url += '?token=' + this._usuarioService.token;
      return this.http.post( url, paciente )
              .map( (resp: any) => {
                swal('Paciente Creado', paciente.nombre, 'success');
                return resp.paciente;
              });
    }




  }

}
