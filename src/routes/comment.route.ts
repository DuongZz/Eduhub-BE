import { Router } from "express";
import { checkJwt } from "../middlewares/authMiddleware";
import { createCommentController } from "../controllers/comment.controller/createCommentController";
import { getAllCommentController } from "../controllers/comment.controller/getAllCommentController";
import { replyCommentController } from "../controllers/comment.controller/replyCommentController";
const router = Router();

router.use(checkJwt);

router.get('/:courseId', getAllCommentController)
router.post('/create/:courseId', createCommentController);
router.post('/reply/:commentId', replyCommentController)

export default router;
