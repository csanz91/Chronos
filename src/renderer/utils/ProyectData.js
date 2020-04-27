export class ProyectData {
  constructor(proyectId, proyectName, proyectDescription, isSeppProyect) {
    this.proyectId = proyectId
    this.extProyectId = ''
    this.proyectName = proyectName
    this.proyectDescription = proyectDescription
    this.isSeppProyect = !!isSeppProyect
  }
}
