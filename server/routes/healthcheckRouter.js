import { Router } from "express";


const router=Router();


router.post("/healthcheck",(req,res)=>{
    res.status(200).json({message:"Health check complete"})
})

export default router;