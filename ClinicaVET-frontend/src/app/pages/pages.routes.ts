import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

import { ProfileComponent } from './profile/profile.component';

// Guards
import { LoginGuardGuard } from '../services/service.index';
import { AdminGuard } from '../services/service.index';

import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';

import { PacientesComponent } from './pacientes/pacientes.component';
import { PacienteComponent } from './pacientes/paciente.component';

import { QuirofanoComponent } from './quirofano/quirofano.component';
import { FarmaciaComponent } from './farmacia/farmacia.component';

import { EventoMedicoComponent } from './evento-medico/evento-medico.component';
import { HistoriaComponent } from './historia/historia.component';

import { BusquedaComponent } from './busqueda/busqueda.component';
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';
import { Component } from '@angular/core';



const pagesRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [ VerificaTokenGuard ],
        data: { titulo: 'Dashboard' }
    },
    { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBars' } },
    { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Gráficas' } },
    { path: 'promesas', component: PromesasComponent, data: { titulo: 'Vacunación' } },
    { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },
    { path: 'account-settings', component: AccoutSettingsComponent, data: { titulo: 'Ajustes de Tema' } },
    { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario' } },
    { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador' } },
    // Mantenimientos
    {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [ AdminGuard ],
        data: { titulo: 'Adminsitración de Usuarios' }
    },

    { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Hospitales registrados' } },

    { path: 'medicos', component: MedicosComponent, data: { titulo: 'Médicos registrados' } },
    { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualizar Médico' } },

    { path: 'pacientes', component: PacientesComponent, data: {titulo: 'Pacientes registrados'}},
    { path: 'paciente/:id', component: PacienteComponent, data: { titulo: 'Actualizar Paciente' } },

    { path: 'quirofano', component: QuirofanoComponent, data: {titulo: 'Administración del quirofano'}},
    { path: 'farmacia', component: FarmaciaComponent, data: {titulo: 'Adminstración de la farmacia'}},

    { path: 'eventomedico/:tipo/:id', component: EventoMedicoComponent, data: { titulo: 'Evento médico' } },
    { path: 'historia/:id', component: HistoriaComponent, data: { titulo: 'Historia Clínica' } },


    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
