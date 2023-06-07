import "colors";
import {
  inquirerMenu,
  pause,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist,
  chooseIntruction,
} from "./helpers/inquirer.js";
import Tareas from "./models/tareas.js";
import { saveDB, readDB } from "./helpers/saveFile.js";

console.clear();

const main = async () => {
  let option = "";
  let cancel = false;
  const tareas = new Tareas();
  const tareasDB = readDB();

  if (tareasDB) {
    // Establecer las tareas
    tareas.cargarTareas(tareasDB);
  }

  do {
    option = await inquirerMenu();
    switch (option) {
      case "1":
        // Crear tarea
        const description = await leerInput("Descripción: ");
        cancel = await chooseIntruction("Choose one Instruction");
        if (cancel === "0") {
          break;
        } else {
          tareas.crearTarea(description);
          console.log(description);
        }
        break;
      case "2":
        // Mostrar todas las tareas
        console.log("");
        tareas.listadoCompleto(tareasDB);
        break;
      case "3":
        // Mostrar todas las tareas completadas
        console.log("");
        tareas.listarPendientesCompletadas(true);
        break;
      case "4":
        // Mostrar todas las tareas pendientes
        console.log("");
        tareas.listarPendientesCompletadas(false);
        break;
      case "5":
        // Marcar como completado o pendiente una tarea
        console.log("");
        const ids = await mostrarListadoChecklist(tareas.listadoArr);
        cancel = await chooseIntruction("Choose one Instruction");
        if (cancel === "0") {
          break;
        } else {
          tareas.toogleCompletadas(ids);
        }
        break;
      case "6":
        // Borrar tareas
        console.log("");
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if (id !== "0") {
          const ok = await confirmar("Are you sure?");
          if (ok) {
            tareas.borrarTarea(id);
            console.log("Task deleted!".red);
          }
        }
        break;
    }

    saveDB(tareas.listadoArr);

    await pause();
  } while (option !== "0");
};

main();
