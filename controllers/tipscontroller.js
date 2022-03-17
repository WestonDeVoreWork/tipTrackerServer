const router = require('express').Router();
const { TipsModel } = require('../model');
let validateJWT = require("../middleware/validate-jwt")

router.post('/create', validateJWT, async (req,res) => {
    let { TotalIncomeFromTips, NumberOfTipsReceived, NumberOfDeliveries, StartingTime, EndingTime, TotalTimeDelivering, IncomePerHour, date } = req.body;
    
    let tipCreate = {
        TotalIncomeFromTips,
        NumberOfTipsReceived,
        NumberOfDeliveries,
        StartingTime,
        EndingTime,
        TotalTimeDelivering,
        IncomePerHour,
        date,
        owner_id: req.user.id
    }
    try {
        const newTip = await TipsModel.create(tipCreate);
        console.log(tipCreate)
        res.status(200).json({
            message: "Log has been created",
            tip: newTip
        });
    } catch (err) {
        res.status(500).json({ error: err});
    } 
    
})


router.get('/:id', validateJWT, async (req, res) => {

    const tipID = req.params.id

    try{
        const userTip = await TipsModel.findAll({
            where: {
                id: tipID
            }
        })
        res.status(200).json(userTip)
    } catch(err) {
        res.status(500).json({ error: err });
    }
})


router.get ('/', validateJWT, async (req, res) => {
    try{
        const allTips = await TipsModel.findAll();
        res.status(200).json({ allTips })
    } catch(err) {
        res.status(500).json({ error: err});
    }
})

//UPDATE: 
router.put("/:id", validateJWT, async (req, res) => {
    let { TotalIncomeFromTips, NumberOfTipsReceived, NumberOfDeliveries, StartingTime, EndingTime, TotalTimeDelivering, IncomePerHour, date } = req.body;
    // const id = req.user;
    const tipId = req.params.id;
    const ownerid = req.user.id;
    
    const query = {
        where: {
            id: tipId,
            owner_id: ownerid
        },
    };

    let newTip = {
        TotalIncomeFromTips,
        NumberOfTipsReceived,
        NumberOfDeliveries,
        StartingTime,
        EndingTime,
        TotalTimeDelivering,
        IncomePerHour,
        date,
        owner_id: req.user.id
    }
    try {
        const updatedTip = await TipsModel.update(newTip, query);
        res.status(200).json({updatedTip, message: "Item has been updated" });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err });
    }
});

router.delete("/:id", validateJWT, async (req, res) => {
    const tipId = req.params.id;
    const ownerid = req.user.id;

    try {
        const query = {
            where: {
                id: tipId,
                owner_id: ownerid,
            },
        };
        await TipsModel.destroy(query);
        res.status(201).json({ message: "Item has been deleted" });
    } catch (err) {
        res.status(500).json({ message: `${err}` });
    }
});


module.exports = router;