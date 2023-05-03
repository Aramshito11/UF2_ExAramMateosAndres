// const Sequalize = require("sequelize");
//
// const crearConfigBaseDades = ()=>{
//   return new Sequalize("uniarammateos", "root", "Admin1234",{
//     host: "localhost",
//     dialect: "mysql",
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000
//     }
//   });
// }
//
// module.exports = {crearConfigBaseDades}
const Sequelize = require("sequelize-auto")

const crearConfigBD = () =>{
  return new Sequelize("uniarammateos","root","Admin1234",{
    host: "localhost",
    dialect: "mysql",
  });
}

crearConfigBD().run((err) => {
  if (err) throw err;
  console.log(crearConfigBD.tables); // Mostra les taules de la base de dades
  console.log(crearConfigBD.foreignKeys); // Mostra les claus foranes
  console.log(crearConfigBD.schema); // Mostra el diagrama de la base de dades
  console.log(crearConfigBD.options); // Mostra les opcions de configuració
});

module.exports = {crearConfigBD}
