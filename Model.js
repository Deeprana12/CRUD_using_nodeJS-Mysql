const connection = require('./config')

// creating database
const dbquery="CREATE DATABASE IF NOT EXISTS awt_task";

connection.query(dbquery,(err,result)=>{
    if(err) console.log('error');
    console.log("Database created successfully")
})

//creating tables
const fortblSemester = `CREATE TABLE IF NOT EXISTS tblsemester(
    semID int(10) NOT NULL,
    semester varchar(50) NOT NULL,    
    PRIMARY KEY (semID))`

const fortblSubjectInfo = `CREATE TABLE IF NOT EXISTS tblsubjectInfo (
    subID int(10) NOT NULL,
    semID int(10) NOT NULL,
    subjectCode varchar(50) NOT NULL,    
    subjectName varchar(50) NOT NULL, 
    FOREIGN KEY (semID) REFERENCES tblsemester(semID),
    PRIMARY KEY (subID))`

const forfeedBack = `CREATE TABLE IF NOT EXISTS tblfeedbackInfor (
    subID int(10) NOT NULL,
    feedbackID int(10) NOT NULL,
    fdback varchar(20),      
    FOREIGN KEY (subID) REFERENCES tblsubjectinfo(subID),
    PRIMARY KEY (feedbackID))`

// running queries
connection.query("USE awt_task",(err,result)=>{
    if(err) console.log('error');
    connection.query(fortblSemester,(err,result)=>{
        if(err) console.log('error');
        console.log("Table tblSemester created successfully")
    });
});

connection.query("USE awt_task",(err,result)=>{ 
    if(err) console.log('error');
    connection.query(fortblSubjectInfo,(err,result)=>{
        if(err) console.log('error '+err);
        console.log("Table tblSubjectInfo created successfully")
    });
});

connection.query("USE awt_task",(err,result)=>{
    if(err) console.log('error');
    connection.query(forfeedBack,(err,result)=>{
        if(err) console.log('error');
        console.log("Table tblfeedback created successfully")
    });
});