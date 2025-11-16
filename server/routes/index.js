import express from 'express'
import userRouter from "./userRouter.js"
import taskRouter from "./taskRouter.js"
import healthcheckRouter from "./healthcheckRouter.js"
const router =express.Router();

router.use("/healthcheck",healthcheckRouter);
router.use("/user",userRouter);
router.use("/task",taskRouter)


export default router;