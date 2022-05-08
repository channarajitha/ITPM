const router = require("express").Router();
let Pandemic = require("../models/Pandemic");
router.route("/add").post((req,res)=>{

    const  pandemictype = req.body.pandemictype;
    const pandemicname = req.body.pandemicname;
    const area = req.body.area;
    const date = req.body.date;
    const status = req.body.status;
    const  description = req.body. description;
    const metron  = req.body.metron ;
    const  sister = req.body. sister;
    const nursingofficers = req.body.nursingofficers;

    const newPandemic = new Pandemic({

        pandemictype,
        pandemicname,
        area,
        date,
        status,
        description,
        metron,
        sister,
        nursingofficers
    })

    newPandemic.save().then(()=>{

        res.json("Pandemic Added")

    }).catch((err)=>{

        console.log(err);
    })

})

router.route("/all").get((req,res)=>{

    Pandemic.find().then((pandemic)=>{

        res.json(pandemic)

    }).catch((err)=>{
        console.log(err)
    })
})


router.route('/update/:id').post((req, res) => {
    Pandemic.findById(req.params.id)
        .then(Pandemic => {
            Pandemic.pandemictype = req.body.pandemictype;
            Pandemic.pandemicname = req.body.pandemicname;
            Pandemic.area = req.body.area;
            Pandemic.date = req.body.date;
            Pandemic.status = req.body.status;
            Pandemic.description = req.body.description;
            Pandemic.metron = req.body.metron;
            Pandemic.sister = req.body.sister;
            Pandemic.nursingofficers = req.body.nursingofficers;


            Pandemic.save()
                .then(() => res.json('Attendance updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/delete/:id").delete(async(req,res) =>{
    let userId = req.params.id;

    await Pandemic.findByIdAndDelete(userId).then(() => {
        res.status(200).send({status: "User Deleted"});
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status: "Error with delelte", error: err.message});
    })
})



router.route("/get/:id").get((req, res) => {
    Pandemic.findById(req.params.id)
        .then((Pandemic) => res.json(Pandemic))
        .catch((err) => res.status(400).json("Error: " + err));
});


module.exports = router;