const myQuestions = [
  {
    message: "Quel est votre nom ? (3 caractères min.)",
    name: "trusker_name",
    type: "input",
  },
  {
    message: "Quel est le nom de votre société ? (3 caractères min.)",
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
    message: `Nom de l'employé * ? (3 caractères min.)`,
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
