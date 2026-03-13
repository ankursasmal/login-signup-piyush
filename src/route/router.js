const router = require('express').Router();
const cookieParser = require('cookie-parser');
const { AccountApproval } = require('../controllers/auth/AccountApprovalByAdmin');
const { AuthUser } = require('../controllers/auth/authUser');
const { getAllUsers } = require('../controllers/auth/getAllUser');
const { LoginRout } = require('../controllers/auth/Login');
const { LogoutRout } = require('../controllers/auth/Logout');
const { SignupRout } = require('../controllers/auth/signup');
 const authGuard = require('../middleware/auth');
 cookieParser();
router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API' });
});
router.post('/login', LoginRout);
router.post('/signup', SignupRout);
router.get('/logout', LogoutRout);
router.get('/all-users',getAllUsers );
router.put('/account-approval/:id',authGuard,AccountApproval);
router.get('/auth-user',authGuard,AuthUser)


module.exports = router;