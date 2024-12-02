import { Router } from "express";
import { checkJwt } from "../../middlewares/authMiddleware";
import { createCategoryController } from "../../controllers/category.controller/createCategoryController";
import { checkRoleAdmin } from "../../middlewares/checkRole";
import { createSubCategoryController } from "../../controllers/subCategory.controller/createSubCategoryController";

const router = Router();
router.use(checkJwt);
router.use(checkRoleAdmin)

router.post('/categories/create', createCategoryController);
router.post('/subCategories/create', createSubCategoryController)
export default router;
