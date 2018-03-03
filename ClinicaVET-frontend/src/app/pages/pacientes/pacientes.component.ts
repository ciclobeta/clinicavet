import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../models/paciente.model';
import { PacienteService } from '../../services/service.index';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styles: []
})
export class PacientesComponent implements OnInit {

  pacientes: Paciente[] = [];

  constructor(
    public _pacienteService: PacienteService
  ) { }

  ngOnInit() {
    this.cargarPacientes();
  }

  cargarPacientes() {
    this._pacienteService.cargarPacientes()
          .subscribe( pacientes => this.pacientes = pacientes );
  }

  buscarPaciente( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarPacientes();
      return;
    }

    this._pacienteService.buscarPacientes( termino )
            .subscribe( pacientes =>  this.pacientes = pacientes );
  }

  borrarPaciente( paciente: Paciente ) {

    this._pacienteService.borrarPaciente( paciente._id )
            .subscribe( () =>  this.cargarPacientes() );

  }

}
