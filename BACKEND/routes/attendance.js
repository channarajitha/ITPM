const router = require("express").Router();
let Attendance = require("../models/Attendance");

router.route("/add").post((req,res)=>{
    
    const empid = req.body.  empid;
    const empname = req.body.empname;
    const date = req.body.date;
    const logtype = req.body.logtype;
    const time = req.body.time;


    const newAttendance = new Attendance({

        empid,
        empname,
        date,
        logtype,
        time,
    })

    newAttendance.save().then(()=>{

        res.json("Attendance Added")

    }).catch((err)=>{

        console.log(err);
    })

})

router.route("/empall").get((req,res)=>{

    Attendance.find().then((attendance)=>{

        res.json(attendance)

    }).catch((err)=>{
        console.log(err)
    })
})




router.route('/update/:id').post((req, res) => {
    Attendance.findById(req.params.id)
        .then(Attendance => {
            Attendance.empid = req.body.empid;
            Attendance.empname = req.body.empname;
            Attendance.date = req.body.date;
            Attendance.logtype = req.body.logtype;
            Attendance.time = req.body.time;


            Attendance.save()
                .then(() => res.json('Attendance updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});



router.route("/delete/:id").delete(async(req,res) =>{
    let userId = req.params.id;

    await Attendance.findByIdAndDelete(userId).then(() => {
        res.status(200).send({status: "User Deleted"});
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status: "Error with delelte", error: err.message});
    })
})
router.route('/:id').get((req, res) => {
    Attendance.findById(req.params.id)
        .then(Attendance => res.json(Attendance))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
