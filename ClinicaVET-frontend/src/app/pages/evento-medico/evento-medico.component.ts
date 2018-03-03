import { Component, OnInit } from '@angular/core';
// import { Medico } from '../../models/medico.model';
// import { MedicoService } from '../../services/service.index';
import { NgForm } from '@angular/forms';
// import { Hospital } from '../../models/hospital.model';
import { Paciente } from '../../models/paciente.model';
// import { HospitalService } from '../../services/service.index';
import { PacienteService } from '../../services/service.index';
import { EventoMedico } from '../../models/eventomedico.models';
import { EventoMedicoService } from '../../services/service.index';

import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-evento-medico',
  templateUrl: './evento-medico.component.html',
  styles: []
})
export class EventoMedicoComponent implements OnInit {

  tipoEvento: string = 'CONSULTA';
  // hospitales: Hospital[] = [];
  pacientes: Paciente[] = [];
  // tslint:disable-next-line:whitespace
  // tslint:disable-next-line:max-line-length
  eventoMedico: EventoMedico = new EventoMedico('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
  // hospital: Hospital = new Hospital('');
  paciente: Paciente = new Paciente('');

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
      let tipo = params['tipo'];
      this.tipoEvento = tipo;
      console.log('aqui.... id: ' + id);
      console.log('tipo: ' + tipo);
       this.cambioPaciente(id);

      if ( id !== 'nuevo' ) {
        this.cargarEventoMedico( id );
        // this.cambioPaciente(id);
        // this._pacienteServide.cargarPaciente(id);
      }

    });

  }

  ngOnInit() {

    this._pacienteServide.cargarPacientes()
          .subscribe( pacientes => this.pacientes = pacientes );

    this._modalUploadService.notificacion
          .subscribe( resp => {
            this.eventoMedico.img = resp.eventoMedico.img;
          });
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
