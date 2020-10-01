const inquirer = require("inquirer");
const { myStringValidator, myNumberValidator } = require("./validation");
const { myRedis } = require("../services/MyRedis");
require("dotenv").config();

const askQuestion = async (params) => {
  if (await myRedis.getIfExists(params.name)) {
    return { [params.name]: await myRedis.getIfExists(params.name) };
  }
  switch (params.type) {
    case "input": {
      if (params.name !== "employee_name") {
        const answer = await inquirer.prompt([
          { message: params.message, name: params.name, type: params.type },
        ]);

        if (myStringValidator(answer[params.name])) {
          await myRedis.put(params.name, answer[params.name]);
          return answer;
        } else {
          return await askQuestion(params);
        }
      } else {
        let storedNames = await myRedis.getIfExists("employees_names");
        if (storedNames.length > 0) {
          storedNames = JSON.parse(storedNames);
        }
        const storedEmployeesNumber = await myRedis.getIfExists(
          "employees_number"
        );
        const newArray = storedNames.names;
        for (let i = storedNames.names.length; i < storedEmployeesNumber; i++) {
          const formattedMessage = params.message.replace("*", i + 1);
          const name = await inquirer.prompt([
            {
              message: formattedMessage,
              name: params.name,
              type: params.type,
            },
          ]);
          newArray.push(name);

          const storedNamesObj = {
            names: newArray,
          };
          const stringified = JSON.stringify(storedNamesObj);

          await myRedis.put("employees_names", stringified);
        }
        return storedNames;
      }
    }

    case "number": {
      let answer = {};
      if (params.name !== "truck_volume" && params.name !== "truck_type") {
        answer = await inquirer.prompt([
          { message: params.message, name: params.name, type: params.type },
        ]);
        if (myNumberValidator(answer[params.name])) {
          await myRedis.put(params.name, answer[params.name]);
        } else {
          await askQuestion(params);
        }
      } else if (params.name === "truck_volume") {
        let storedTrucks = await myRedis.getIfExists("trucks_infos");
        if (storedTrucks.length > 0) {
          storedTrucks = JSON.parse(storedTrucks);
        }
        const storedTrucksNumber = await myRedis.getIfExists("trucks_number");
        const newArray = storedTrucks.trucks;
        for (let i = storedTrucks.trucks.length; i < storedTrucksNumber; i++) {
          const formattedMessage = params.message.replace("*", i + 1);
          const truck = await inquirer.prompt([
            {
              message: formattedMessage,
              name: params.name,
              type: params.type,
            },
            {
              type: "list",
              message: `Volume du camion ${i + 1} ?`,
              name: "truck_type",
              choices: [
                "Camion plateau",
                "Camion Ampliroll",
                "Camion benne",
                "Camion frigorifique",
                "Camion-citerne",
                "Camion porte char",
                "Camion fourgon",
              ],
            },
          ]);
          newArray.push(truck);

          const storedTrucksObj = {
            trucks: newArray,
          };
          const stringified = JSON.stringify(storedTrucksObj);

          await myRedis.put("trucks_infos", stringified);
        }
        return storedTrucks;
      }
      return answer;
    }
  }
};

const logCachedInfos = async () => {
  if (await myRedis.containsData()) {
    console.log("Informations entrées précédemment:");
    const cachedInfos = await myRedis.getCachedInfos();
    console.log(cachedInfos);
  }
};

const checkAnswers = async () => {
  const { infosAreValid } = await inquirer.prompt([
    {
      type: "list",
      message: `Ces informations sont-elles correctes?}`,
      choices: ["Oui", "Non"],
      name: "infosAreValid",
    },
  ]);

  if (infosAreValid === "Oui") return true;
  else return false;
};

module.exports = { askQuestion, logCachedInfos, checkAnswers };
