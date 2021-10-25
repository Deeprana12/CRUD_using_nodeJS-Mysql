const express = require('express')
const router = express.Router();
const connection = require('./config')

// getting semester info
router.get("/getAllsemesters", (req, res) => {
    connection.query(`select * from tblsemester`,function(err, results, fields) {
        res.status(200).json({
            data:results
        })
      }
    )
});

// for adding semester
router.post("/addNewSem", (req, res) => {      
    let a = req.body.semID
    let b = req.body.semester
    connection.query(`INSERT INTO tblsemester(semID,semester) VALUES (${a},${b})`,function(err, results) {
        if(err) 
            console.log(err)
        else{
            res.status(200).json({
                data : results
            }) 
        }
      }
    )
});

// getting subject details with subjectCode
router.get("/getsubjectdetails/:subCode", (req, res) => {
    connection.query(`select * from tblsubjectinfo where subjectCode="${req.params.subCode}"`,function(err, results) {
        if(err)
            console.log(err)
        else{
            res.status(200).json({
                data:results  
            })
        }
      }
    )
});

// adding new subject
router.post("/addNewSubject", (req, res) => {
    let a = req.body.subID
    let b = req.body.subjectCode
    let c = req.body.subjectName
    let d = req.body.semID
    connection.query(`INSERT INTO tblsubjectinfo(subID,SubjectCode,SubjectName,semID) VALUES ("${a}","${b}","${c}","${d}")`,function(err, results, fields) {
        if(err)
            console.log(err)
        else{
            res.status(200).json({
                data:results
            })
        }
      }
    )
});

// getting subject info using semester input
router.post("/getAllsubjects/:semester", (req, res) => {
    let a = req.params.semester   
    console.log(a)
    connection.query(`SELECT * FROM tblsubjectinfo where semID IN (SELECT semID from tblsemester where semester="${a}")`,function(err, results, fields) {
        if(err)
            console.log(err)
        else{            
            res.status(200).json({
                data : results
            })
        }
      }
    )
});

// sending feedback for subject using subID
router.post("/sendfeedback/:subID", (req, res) => {
    let a = req.params.subID
    let b = req.body.feedbackID
    let c = req.body.fdback   
    connection.query(`INSERT INTO tblfeedbackinfor(subID,feedbackID,fdback) VALUES ("${a}","${b}","${c}")`,function(err, results, fields) {
        if(err)
            console.log(err)
        else{
            res.status(200).json({
                data:results
            })
        }
      }
    )
});

// getting feedback in percentage form
router.get("/feedback/:subID", (req, res) => {

    var multiarr = []
    let q1 = `Select  fdback,((SELECT Count(fdback) from tblfeedbackinfor where fdback="good") * 100 / (Select Count(*) from tblfeedbackinfor)) as "Feedback Ratio"
    From tblfeedbackinfor WHERE subID=? AND fdback="good" GROUP BY fdback;`;

    let q2 = `Select  fdback,((SELECT Count(fdback) from tblfeedbackinfor where fdback="excellent") * 100 / (Select Count(*) from tblfeedbackinfor)) as "Feedback Ratio"
    From tblfeedbackinfor WHERE subID=? AND fdback="excellent" GROUP BY fdback`;

    let q3 = `Select  fdback,((SELECT Count(fdback) from tblfeedbackinfor where fdback="verygood") * 100 / (Select Count(*) from tblfeedbackinfor)) as "Feedback Ratio"
    From tblfeedbackinfor WHERE subID=? AND fdback="verygood" GROUP BY fdback`;

    connection.query(q1,[req.params.subID],function(err, results, fields) {
        if(err)
            console.log(err)
        else{            
            multiarr.push(results)        
        }
      }
    )

    connection.query(q2,[req.params.subID],function(err, results, fields) {
        if(err)
            console.log(err)
        else{
            multiarr.push(results)                  
        }
      }
    )

    connection.query(q3,[req.params.subID],function(err, results, fields) {
        if(err)
            console.log(err)
        else{
            multiarr.push(results)
            res.status(200).json({
                multiarr
            })
        }
    })    

});

module.exports = router