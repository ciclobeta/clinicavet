import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Paciente } from '../../models/paciente.model';
import { PacienteService } from '../../services/service.index';
import { EventoMedico } from '../../models/eventomedico.models';
import { EventoMedicoService } from '../../services/service.index';

import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';


@Component({
  selector: 'app-historia',
  templateUrl: './historia.component.html',
  styles: []
})

export class HistoriaComponent implements OnInit {

  tipoEvento: string = 'CONSULTA';
  // hospitales: Hospital[] = [];
  pacientes: Paciente[] = [];
  eventosMedicos: EventoMedico[] = [];
  // tslint:disable-next-line:whitespace
  // tslint:disable-next-line:max-line-length
  eventoMedico: EventoMedico = new EventoMedico('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
  // hospital: Hospital = new Hospital('');
  paciente: Paciente = new Paciente('');

     idPaciente: any;
  constructor(
    // public _medicoService: MedicoService,
    // public _hospitalService: HospitalService,
    public _pacienteServide: PacienteService,
    public _eventoMedicoServie: EventoMedicoService,

    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {


    activatedRoute.params.subscribe( params => {

      let id = params['id'];
      this.idPaciente = id;

     // let tipo = params['tipo'];

      // this.tipoEvento = tipo;

      console.log('aqui.... id: ' + id);
      // console.log('tipo: ' + tipo);
       this.cambioPaciente(id);

      if ( id !== 'nuevo' ) {
        this.cargarEventosMedicos( id );
        // this.cambioPaciente(id);
        // this._pacienteServide.cargarPaciente(id);
      }

    });

  }

  ngOnInit() {

    this.cargarEventosMedicos( this.idPaciente );
    // this._pacienteServide.cargarPacientes()
    //      .subscribe( pacientes => this.pacientes = pacientes );

    // this._modalUploadService.notificacion
    //      .subscribe( resp => {
    //        this.eventoMedico.img = resp.eventoMedico.img;
    //      });
  }

  cargarEventoMedico( id: string ) {
    // this.cambioPaciente(id);
    this._eventoMedicoServie.cargarEventoMedico(id) // _medicoService.cargarMedico( id )
          .subscribe( eventoMedico => {

            console.log( eventoMedico );
            this.eventoMedico = eventoMedico;
            this.eventoMedico.paciente = eventoMedico.paciente._id;
            this.cambioPaciente(id);
            // this.cambioPaciente( this.eventoMedico.paciente );
          });
  }

  cargarEventosMedicos( id1: string ) {
    console.log('Edi. en cargar eventos medicos: ' + id1);
    this._eventoMedicoServie.cargarEventosMedicos(id1)
          .subscribe( eventosMedicos => this.eventosMedicos = eventosMedicos );
    console.log('supuestamente ya cargo: ' + this.eventosMedicos);
  }

  guardarEventoMedico( f: NgForm ) {

    console.log( f.valid );
    console.log( f.value );

    if ( f.invalid ) {
      return;
    }

    this._eventoMedicoServie.guardarEventoMedico(this.eventoMedico, this.tipoEvento) // ._eventoMedicoService.guardarMedico( this.medico )
            .subscribe( eventoMedico => {

              this.eventoMedico._id = eventoMedico._id;

              this.router.navigate(['/eventomedico', eventoMedico._id ]);

            });

  }

  cambioPaciente( id: string ) {

    this._pacienteServide.cargarPaciente( id ) // ._hospitalService.obtenerHospital( id )
          .subscribe( paciente => this.paciente = paciente );

  }

  cambiarFoto() {

    this._modalUploadService.mostrarModal( 'eventosMedicos', this.eventoMedico._id );

  }


}
