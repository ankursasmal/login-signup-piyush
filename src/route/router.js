const router = require('express').Router();
const cookieParser = require('cookie-parser');
const { AccountApproval } = require('../controllers/auth/AccountApprovalByAdmin');
const { AuthUser } = require('../controllers/auth/authUser');
const { getAllUsers } = require('../controllers/auth/getAllUser');
const { LoginRout } = require('../controllers/auth/Login');
const { LogoutRout } = require('../controllers/auth/Logout');
const { SignupRout } = require('../controllers/auth/signup');
 const authGuard = require('../middleware/auth');
const adminQuestion = require('../controllers/question/adminQuestion');
const { AllQuestion } = require('../controllers/question/allQuestion');
const { GetSpecificUserQuestion } = require('../controllers/question/GetSpecificUserQuestion');
const { UpdateSpecificQuestion } = require('../controllers/question/UpdateSpecificQuestion');
const { deleteSpecificQuestion } = require('../controllers/question/deleteSpecificQuestion');
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


//question
router.put('/admin-create-question/:id',authGuard,adminQuestion);
router.get('/all-question',authGuard,AllQuestion);
router.get('/get-specific-user-question/:id',authGuard,GetSpecificUserQuestion);
router.put('/update-specific-question/:userId/:index',authGuard,UpdateSpecificQuestion);
router.delete('/delete-specific-question/:userId/:index',authGuard,deleteSpecificQuestion);





module.exports = router;