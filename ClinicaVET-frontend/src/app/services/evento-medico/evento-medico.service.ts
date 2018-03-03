import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from '../../models/medico.model';
import { EventoMedico } from '../../models/eventomedico.models';

import swal from 'sweetalert';

@Injectable()
export class EventoMedicoService {

  totalEventosMedicos: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarEventosMedicos(id: string) {

    console.log('Edi... aqui en serivicios :: cargarEventosMedicos  ..  ' + id);

    let url = URL_SERVICIOS + '/eventomedico/' + id;

    console.log('URL cargarEventosMedicos: ' + url);
    return this.http.get( url )
              .map( (resp: any) => {

                console.log('Edi... saliendo de cargarEventoMedicos ..');
                this.totalEventosMedicos = resp.total;
                return resp.eventosMedicos;
              });

  }

  cargarEventoMedico( id: string ) {

    console.log('aqui en serivicios :: cargarEventoMedico');
    let url = URL_SERVICIOS + '/eventomedico/' + id;

    return this.http.get( url )
              .map( (resp: any) => resp.medico );

  }


  buscarEventosMedicos( termino: string ) {

    console.log('aqui en serivicios :: buscarEventosMedicos');
    let url = URL_SERVICIOS + '/busqueda/coleccion/eventosmedicos/' + termino;
    return this.http.get( url )
                .map( (resp: any) => resp.eventosMedicos );

  }

  borrarEventoMedico( id: string ) {

    console.log('aqui en serivicios :: borrarEventosMedicos');
    let url = URL_SERVICIOS + '/eventomedico/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
              .map( resp => {
                swal( 'Evento Médico Borrado', 'Evento Médico borrado correctamente', 'success' );
                return resp;
              });

  }

  guardarEventoMedico( eventoMedico: EventoMedico, tipoEvento: string ) {

    eventoMedico.tipoEvento = tipoEvento;
    console.log('aqui en serivicios :: guardarEventosMedicos');
    let url = URL_SERVICIOS + '/eventomedico';

    if ( eventoMedico._id ) {
      // actualizando
      console.log('aqui en serivicios :: guardarEventosMedicos / actualizando :: ' + url);
      url += '/' + eventoMedico._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, eventoMedico )
                .map( (resp: any) => {
                  swal('Evento Médico Actualizado', eventoMedico.fecha, 'success');
                  return resp.eventoMedico;

                });

    }else {
      // creando
      console.log('aqui en serivicios :: guardarEventosMedicos / creando :: ' + url);
      url += '?token=' + this._usuarioService.token;
      console.log('aqui en serivicios :: guardarEventosMedicos / creando2 :: ' + url);
      return this.http.post( url, eventoMedico )
              .map( (resp: any) => {
                swal('Evento Médico Creado', eventoMedico.fecha, 'success');
                return resp.eventoMedico;
              });
    }

  }
}
