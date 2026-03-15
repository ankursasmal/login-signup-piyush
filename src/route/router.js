const router = require('express').Router();
const cookieParser = require('cookie-parser');
const { AccountApproval } = require('../controllers/auth/AccountApprovalByAdmin');
const { AuthUser } = require('../controllers/auth/authUser');
const { getAllUsers } = require('../controllers/auth/getAllUser');
const { LoginRout } = require('../controllers/auth/Login');
const { LogoutRout } = require('../controllers/auth/Logout');
const { SignupRout } = require('../controllers/auth/signup');
 const authGuard = require('../middleware/auth');
const adminTask = require('../controllers/question/adminTask');
const { AllTask } = require('../controllers/question/allTask');
const { GetSpecificUserTask } = require('../controllers/question/GetSpecificUserTask');
const { UpdateSpecificTask } = require('../controllers/question/UpdateSpecificTask');
const { deleteSpecificTask } = require('../controllers/question/deleteSpecificTask');
const { AuthUserTask } = require('../controllers/question/AuthUserTask');
 
  cookieParser();
router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API' });
});
router.post('/login', LoginRout);
router.post('/signup', SignupRout);
router.get('/logout', LogoutRout);
router.get('/all-users',getAllUsers );
router.put('/account-approval/:id',authGuard,AccountApproval);
router.get('/auth-user',authGuard,AuthUser);


//Task
router.post('/admin-create-Task/:id',authGuard,adminTask);
router.get('/all-Task',authGuard,AllTask);
router.get('/get-specific-user-Task/:id',authGuard,GetSpecificUserTask);
router.put('/update-specific-Task/:userId/:index',authGuard,UpdateSpecificTask);
router.delete('/delete-specific-Task/:userId/:index',authGuard,deleteSpecificTask);
router.get('/auth-user-task',authGuard,AuthUserTask)





module.exports = router;