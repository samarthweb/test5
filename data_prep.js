
var students=[];


const Sequelize = require("sequelize");

var sequelize = new Sequelize('bbncwqqz', 'bbncwqqz', 'rBWGeugSjNJQdL9UxLqkv_0xazH84BsX', {
  host: 'lucky.db.elephantsql.com',
  dialect: 'postgres',
  port: 5432,
  dialiectOptions: {ssl: {
    require: true,
    rejectUnauthorized: false
  }},
  });


sequelize.authenticate().then(()=> console.log('Connection success.'))
.catch((err)=>console.log("Unable to connect to DB.", err));

var students = sequelize.define("students", {
    studId:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
    program: Sequelize.STRING,
    gpa: Sequelize.FLOAT,
});

exports.prep = function () {
    return new Promise((resolve, reject) => {
      sequelize.sync().then(()=>{
        resolve();
    }).catch(()=>{
         reject("Unable to sync the database.");
    });
    });
  };

  exports.addStudent= (stud)=>{
    return new Promise(function (resolve, reject) {
               
            for (let temp in stud)
                {
                    if (stud[temp]=="")
                        stud[temp] = null;
                }
    
            students.create(stud).then(()=>{
                resolve();
            }).catch((err)=>{
                reject("Unable to add a student ");
            });
        });
}


exports.cpa = ()=>{
    return new Promise(function (resolve, reject) {
        students.findAll({
          where: {program: cpa}
      }).then((data)=>{
          resolve(data);
      }).catch((err)=>{
          reject("no results returned")
      });
        });
}


  exports.allstudents = function () {
    return new Promise(function (resolve, reject) {
      students.findAll().then((data)=>{
        resolve(data);
    }).catch((err)=>{
        reject("No results returned.");
    });
      });
  };
  

exports.highGPA = ()=>{
    return new Promise((resolve, reject)=>{
        let high = 0;
        let highStudent;
        
        for (let i=0; i<students.length; i++)
        {
            
            if (students[i].gpa > high)
            {
                high = students[i].gpa;
                highStudent = students[i];
            }
        }
        students.findAll({
            where: {data:highStudent}
        }).catch((err)=>{
            reject("Failed finding student with highest GPA")
        });
          });
        
    
};


exports.getStudent = (Id)=>{
    return new Promise(function (resolve, reject) {
        students.findAll({
          where:{studId : Id}
      }).then((data)=>{
          resolve(data);
      }).catch((err)=>{
          reject("No results returned");
      });
        });
    
}


