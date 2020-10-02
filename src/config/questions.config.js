const myQuestions = [
  {
    message: "Quel est votre nom ?",
    name: "trusker_name",
    type: "input",
  },
  {
    message: "Quel est le nom de votre société ?",
    name: "society_name",
    type: "input",
  },
  {
    message: "Quel est votre nombre d'employés ?",
    name: "employees_number",
    type: "number",
  },
  {
    type: "input",
    message: `Nom de l'employé * ?`,
    name: "employee_name",
  },
  {
    message: "Quel est votre nombre de camions ?",
    name: "trucks_number",
    type: "number",
  },
  {
    type: "number",
    message: `Volume du camion * ?`,
    name: "truck_volume",
  },
];

module.exports = { myQuestions };
