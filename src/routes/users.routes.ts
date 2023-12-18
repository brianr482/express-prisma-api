import { UserController } from '../controllers/users.controller';
import { Router } from 'express';

const router: Router = Router();

router
  .get('/', UserController.findAllWithTasks)
  .get('/:id', UserController.getById)
  .post('/', UserController.create)
  .put('/:id', UserController.update)
  .delete('/:id', UserController.delete);

export default router;