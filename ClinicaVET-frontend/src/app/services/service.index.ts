import { EventoMedico } from '../models/eventomedico.models';

// Guards
export { LoginGuardGuard } from './guards/login-guard.guard';
export { AdminGuard } from './guards/admin.guard';
export { VerificaTokenGuard } from './guards/verifica-token.guard';



export { MedicoService } from './medico/medico.service';
export { PacienteService } from './paciente/paciente.service';
export { HospitalService } from './hospital/hospital.service';
export { EventoMedicoService } from './evento-medico/evento-medico.service';

export { SubirArchivoService } from './subir-archivo/subir-archivo.service';
export { UsuarioService } from './usuario/usuario.service';
export { SettingsService } from './settings/settings.service';
export { SharedService } from './shared/shared.service';
export { SidebarService } from './shared/sidebar.service';
