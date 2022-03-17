const router = require('express').Router();
const { UserModel } = require('../model');
const { UniqueConstraintError } = require('sequelize/lib/errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/register', async (req,res) =>{
    try{
        let { username, password, FirstName, Occupation, isAdmin } = req.body;

        let User = await UserModel.create ({
            username,
            password: bcrypt.hashSync(password, 10),
            FirstName,
            Occupation,
            isAdmin
        });
        
        const token = jwt.sign(
            { id: User.id },
            process.env.JWT_SECRET,
            { expiresIn: 60 * 60 * 24 }
        )

        res.status(201).json({
            message: "User Registered!",
            user: User,
            sessionToken: token
        });
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Email or Username already in use!",
            });
        } else {
            res.status(500).json({
                message: `Failed to register user. ${err}`
            })
        }
    }
})

router.post("/login", async (req, res) => {
    
    let { username, password } = req.body;
    try {
        const loginUser = await UserModel.findOne({
            where: { username }
        })

        if (loginUser) {
            let passwordCompare = await bcrypt.compare(password, loginUser.password)

            if (passwordCompare) {
                let token = jwt.sign(
                    { id: loginUser.id },
                    process.env.JWT_SECRET,
                    { expiresIn: 60 * 60 * 24 }
                )

                res.status(200).json({
                    message: `User logged in`,
                    user: loginUser,
                    sessionToken: token
                }) 
            } else {
                res.status(401).json({
                    message: 'Incorrect Email or Password'
                })
            }
        } else {
            res.status(401).json({
                message: 'Incorrect Email or Password'
            })
        }
    } catch (err) {
        res.status(500).json({
            message: `${err}`
        })
    }
})

module.exports = router;