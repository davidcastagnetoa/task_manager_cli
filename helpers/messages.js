import "colors";
import readline from "readline";

const showMenu = () => {
  // Return a promise to resolve the option selected
  return new Promise((resolve) => {
    // Ask for option. Interface to show and recieve user data
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    // Callback function to resolve the promise
    rl.question("Select an option: ", (opt) => {
      rl.close();
      resolve(opt);
    });
  });
};

export { showMenu };
