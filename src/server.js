const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');
// const {initModels} = require("./models/init-models");
// const {Sequelize} = require("sequelize");



app.use(express.json(), cors());

port = 4080;
app.listen(port, () => {
  console.log(`Port::${port}`);
});

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Admin1234',
  database: 'uniarammateos'
});

connection.connect((err)=>{
  if (err) throw err;
  console.log("Conectado")
})

app.post('/modifCorreu', (req, res) => {
  connection.execute('ALTER TABLE alumnes MODIFY COLUMN alumn_e_mail VARCHAR(30)', (err)=>{
    if (`columnType = 'varchar(30)'`){
      console.log("ja es varchar de 30")
    }
  })
})

app.post('/llistaAssigInfo', (req, res) => {
  connection.query('SELECT assig_codi, assig_nom FROM assignatures, assignatures_professor, professor, departament WHERE assig_codi = assigprof_assig_codi AND assigprof_prof_dni = prof_dni AND dept_codi = prof_dept_codi AND prof_nom = \'JOSEP\''), (err, rows)=>{
    if (err) throw err;
    console.log("Resultat: "+rows)
    res.json(rows)
  }
})

const {Sequelize} = require("sequelize");
const {initModels} = require("./models/init-models");

const db = new Sequelize("uniarammateos","root","Admin1234",{
  host: "localhost",
  dialect: "mysql",
});
const models = initModels(db);


app.post('/afegirDepartament', (req, res) => {
  const {codi, nom, ubicacio, telef, dni} = req.body
  console.log(codi, nom,ubicacio,telef,dni)
  const attr={
    DEPT_CODI: codi,
    DEPT_NOM: nom,
    DEPT_UBICACIO: ubicacio,
    DEPT_TELEFON: telef,
    DEPT_PROF_DNI: dni
  }
  const nouDept = models.departament.create(attr)
  console.log(nouDept)
})

app.post('/impartirAssig', async (req, res) => {
  const prof = await models.professor.findOne({
    attributes: ['PROF_DNI'],
    where: {prof_nom: "JOSEP"}
  }).then((h) => {
    return h.PROF_DNI;
  })
  console.log(prof)
  const assig = await models.assignatures_professor.findAll({attributes: ['ASSIGPROF_ASSIG_CODI'], where:{ASSIGPROF_PROF_DNI: prof}})
  console.log(assig.dataValues)
  res.json(assig)
})
