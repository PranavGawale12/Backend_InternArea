const express =require("express")
const router= express.Router();
const internship=require("../Model/Internship");
const internData=require("../Data/InternshipDatAvl")


router.post("/",async (req,res)=>{
    const internshipData=new internship({
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        Duration: req.body.Duration,
        category: req.body.category,
        aboutCompany:req.body.aboutCompany,
        aboutInternship:req.body.aboutInternship,
        Whocanapply: req.body.Whocanapply,
        perks: req.body.perks,
        AdditionalInfo:req.body.AdditionalInfo,
        stipend: req.body.stipend,
        StartDate:req.body.StartDate,
    })
    await internshipData.save().then((data)=>{
        res.send(data)
    }).catch((error)=>{
        console.log(error,"not able to post the data")
    })
})

// router.post("/", async(req,res)=>{
//     try{
//         const internships=internData;
//         const savedInternShips=[];

//         for(const internshipData of internships){
//             const newInternship=new internship(internshipData);
//             const savedInternShip=await newInternship.save();
//             savedInternShips.push(savedInternShip);
//         }
//         res.send(savedInternShips);
//     }catch(error){
//         res.status(500).send("Internal Server Error");
//     }
// });

router.get("/",async (req,res)=>{
    try {
        const data=await internship.find();
        res.json(data) .status(200)
    } catch (error) {
        console.log(err);
        res.status(404).json({error:"Internal server error "})
    }
})


router.get("/:id", async (req,res)=>{
    const {id}=req.params;
    try {
        const data=await internship.findById(id);
        if (!data) {

             res.status(404).json({error:"Internship is not found "})
        }
        res.json(data) .status(200)
    } catch (error) {
        console.log(err);
        res.status(404).json({error:"Internal server error "})
    }
})
module.exports=router