const router = require("express").Router();
let Leave = require("../models/Leave");

router.route("/add").post((req,res)=>{
    
    const NurseID = req.body.NurseID;
    const LeaveType = req.body.LeaveType;
    const Reason = req.body.Reason;
    const Description = req.body. Description;
    const Date = req.body.Date;
    const Time = req.body.Time;

    const newLeave = new Leave({
        NurseID,
        LeaveType,
        Reason,
        Description,
        Date,
        Time,
    })

    newLeave.save().then(()=>{

        res.json("Leave Added")

    }).catch((err)=>{

        console.log(err);
    })

})

router.route("/all").get((req,res)=>{

    Leave.find().then((leave)=>{

        res.json(leave)

    }).catch((err)=>{
        console.log(err)
    })
})




router.route('/update/:id').post((req, res) => {
    Leave.findById(req.params.id)
        .then(Leave => {
            Leave.NurseID = req.body.NurseID;
            Leave.LeaveType = req.body.LeaveType;
            Leave.Reason = req.body.Reason;
            Leave.Description = req.body.Description;
            Leave.Date = req.body.Date;
            Leave.Time = req.body.Time;
             


            Leave.save()
                .then(() => res.json('Leave updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});



router.route("/delete/:id").delete(async(req,res) =>{
    let userId = req.params.id;

    awaitLeave.findByIdAndDelete(userId).then(() => {
        res.status(200).send({status: "User Deleted"});
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status: "Error with delelte", error: err.message});
    })
})
router.route('/:id').get((req, res) => {
    Leave.findById(req.params.id)
        .then(Leave => res.json(Leave))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;