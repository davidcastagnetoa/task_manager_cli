import "colors";
import Tarea from "./tarea.js";

// Clase Tareas
class Tareas {
  _listado = {};
  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });
    return listado;
  }

  constructor() {
    this._listado = {};
  }

  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }
  crearTarea(description = "") {
    const tarea = new Tarea(description);
    this._listado[tarea.id] = tarea;
  }
  cargarTareas(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }
  listadoCompleto() {
    this.listadoArr.forEach((tarea, i) => {
      let contador = i;
      const { description, completadoEn } = tarea;
      const estado = completadoEn ? "Completed".green : "Pending".red;

      if (completadoEn) {
        contador++;
        contador = (i + 1).toString();
        console.log(
          `${contador.green}${".-".green} ${"Task".brightCyan}: ${
            description.brightWhite
          }\n    ${"Status".brightCyan}: ${estado}\n    ${
            "Completed at:".brightCyan
          }: ${completadoEn}\n `
        );
      }

      if (!completadoEn) {
        contador++;
        contador = (i + 1).toString();
        console.log(
          `${contador.green}${".-".green} ${"Task".brightCyan}: ${
            description.brightWhite
          }\n    ${"Status".brightCyan}: ${estado}\n `
        );
      }
    });
  }
  listarPendientesCompletadas(completadas = true) {
    let contador = 0;
    this.listadoArr.forEach((tarea) => {
      const { description, completadoEn } = tarea;
      const estado = completadoEn ? "Completed".green : "Pending".red;
      if (completadas) {
        if (completadoEn) {
          contador++;
          console.log(
            `${contador}.- ${"Task".brightCyan}: ${
              description.brightWhite
            }\n    ${"Status".brightCyan}: ${estado}\n    ${
              "Completed at:".brightCyan
            }: ${completadoEn}\n `
          );
        }
      } else {
        if (!completadoEn) {
          contador++;
          console.log(
            `${contador}.- ${"Task".brightCyan}: ${
              description.brightWhite
            }\n    ${"Status".brightCyan}: ${estado}\n `
          );
        }
      }
    });
  }
  toogleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });
    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }
}

export default Tareas;
