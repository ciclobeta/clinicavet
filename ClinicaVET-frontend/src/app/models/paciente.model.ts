export class Paciente {

    constructor(
        public historiaClinica?: string,
        public nombre?: string,

        public especie?: string,
        public raza?: string,
        public sexo?: string,
        public fechaNacimiento?: string,
        public microchip?: string,
        public color?: string,
        public senas?: string,

        public nombrePropietario?: string,
        public email?: string,
        public idPropietario?: string,
        public telefono?: string,
        public direccion?: string,

        public img?: string,
        public usuario?: string,
        public _id?: string

    ) { }
}
