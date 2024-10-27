import { Router } from 'express';
import { authorization, emailAddress } from '../../validators/authValidator';
import validate from '../../middlewares/validationMiddleware';
import auth from '../../middlewares/authMiddleware';
import permit from '../../middlewares/permissionMiddleware';
import { password } from '../../validators/userValidator';
import { requiredTextField } from '../../validators/commonValidator';
import { RoleType } from '../../utils/enums';
import { userController } from '../../controllers';

//USER ROUTES//
