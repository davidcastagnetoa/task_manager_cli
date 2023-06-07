import * as fs from "fs";

const file = "./database/data.json";
const saveDB = (data) => {
  fs.writeFileSync(file, JSON.stringify(data));
};

const readDB = () => {
  if (!fs.existsSync(file)) {
    return null;
  }
  const info = fs.readFileSync(file, { encoding: "utf-8" });
  const data = JSON.parse(info);
  console.log(data);
  return data;
};

export { saveDB, readDB };
