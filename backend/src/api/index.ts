import express from "express"
import userRouter from "../routes/user"
import docsRouter from "../routes/docs"
const router = express.Router();

router.use('/user',userRouter);
router.use('/docs',docsRouter);

export default router;
