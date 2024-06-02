import database from "./../database.json";
import Person from "./person.js";
import TerminalController from "./terminalController.js";
import { Repository } from "./repository.js";

const STOP_TERM = ":q";
const repository = new Repository({ fileName: "database.json" });
const terminalController = new TerminalController();
terminalController.initializeTerminal(database, "pt-BR");

async function mainLoop() {
  try {
    const answer = await terminalController.question("pregunta?");

    if (answer === STOP_TERM) {
      terminalController.closeTerminal();
      console.log("Cabou-se");
      return;
    }

    const person = Person.generateInstanceFromString(answer);
    terminalController.updateTable(person.formatted());
    await repository.save(person);

    return mainLoop();
  } catch (error) {
    console.error("DEU RUIM", error);
    return mainLoop();
  }
}

await mainLoop();
