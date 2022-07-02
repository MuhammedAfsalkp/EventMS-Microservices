import express from 'express';
// import { currentUser } from '../../../common/src/middlewares/current-user';
import { currentUser } from '@iyaa-eventms/common';

// import { requireAuth } from '../../../common/src/middlewares/require-auth';
// import { validateRole } from '../../../common/src/middlewares/validate-role';
import { requireAuth } from '@iyaa-eventms/common';
import { validateRole } from '@iyaa-eventms/common';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});



// router.get('/api/users/currentuser', currentUser,requireAuth,validateRole(['normal']), (req, res) => {
//   res.send({ currentUser: req.currentUser || null });
// });
export { router as currentUserRouter };
