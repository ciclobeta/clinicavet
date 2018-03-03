import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../models/paciente.model';
import { PacienteService } from '../../services/service.index';
import { NgForm } from '@angular/forms';
import { HospitalService } from '../../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styles: []
})
export class PacienteComponent implements OnInit {

  especie: any;
  historiaClinica: any;
  paciente: Paciente = new Paciente('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');


  constructor(
    public _pacienteService: PacienteService,
    // public _hospitalService: HospitalService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {

    activatedRoute.params.subscribe( params => {

      let id = params['id'];

      if ( id !== 'nuevo' ) {
        this.cargarPaciente( id );
      }

    });
  }

  ngOnInit() {
    this._modalUploadService.notificacion
          .subscribe( resp => {
            this.paciente.img = resp.paciente.img;
          });
  }

  cargarPaciente( id: string ) {
    this._pacienteService.cargarPaciente( id )
          .subscribe( paciente => {

            console.log( paciente );
            this.paciente = paciente;
          });
  }

  guardarPaciente( f: NgForm ) {
    // console.log( f.valid );
    // console.log( f.value );

    if ( f.invalid ) {
      return;
    }

    this._pacienteService.guardarPaciente( this.paciente )
            .subscribe( paciente => {

              this.paciente._id = paciente._id;

              this.router.navigate(['/paciente', paciente._id ]);

            });

  }

  cambiarFoto() {
    this._modalUploadService.mostrarModal( 'pacientes', this.paciente._id );
  }

}
