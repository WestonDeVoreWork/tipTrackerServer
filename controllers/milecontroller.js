const router = require('express').Router();
const { MileModel } = require('../model');
let validateJWT = require("../middleware/validate-jwt")

router.post('/create', validateJWT, async (req,res) => {
    let { StartingMileage, EndingMileage, MilesDriven, CostOfGas, GallonsOfGasUsed, date } = req.body;
    
    let mileCreate = {
        StartingMileage,
        EndingMileage,
        MilesDriven,
        CostOfGas,
        GallonsOfGasUsed,
        date,
        owner_id: req.user.id
    }
    try {
        const newMile = await MileModel.create(mileCreate);
        console.log(mileCreate)
        res.status(200).json({
            message: "Log has been created",
            mile: newMile
        });
    } catch (err) {
        res.status(500).json({ error: err});
    } 
    
})


router.get('/:id', validateJWT, async (req, res) => {

    const mileID = req.params.id

    try{
        const userMile = await MileModel.findAll({
            where: {
                id: mileID
            }
        })
        res.status(200).json(userMile)
    } catch(err) {
        res.status(500).json({ error: err });
    }
})

router.get('/mine', validateJWT, async (req, res) => {
    // let { id } = req.user;
    const ownerid = req.user.id;
    try {
        const userMiles = await MileModel.findAll({
                where: {
                    owner: ownerid
                }
            });
            res.status(200).json(userMiles)
    } catch (err) {
        res.status(500).json({ error: err })
    }
});

router.get ('/', validateJWT, async (req, res) => {
    try{
        const mileage = await MileModel.findAll();
        res.status(200).json({ mileage })
    } catch(err) {
        res.status(500).json({ error: err});
    }
})

//UPDATE: 
router.put("/:id", validateJWT, async (req, res) => {
    let { StartingMileage, EndingMileage, MilesDriven, CostOfGas, GallonsOfGasUsed, date } = req.body;
    // const id = req.user;
    const mileId = req.params.id;
    const ownerid = req.user.id;
    
    const query = {
        where: {
            id: mileId,
            owner_id: ownerid
        },
    };

    let newMile = {
        StartingMileage,
        EndingMileage,
        MilesDriven,
        CostOfGas,
        GallonsOfGasUsed,
        date,
        owner_id: req.user.id
    }
    try {
        const updatedMile = await MileModel.update(newMile, query);
        res.status(200).json({updatedMile, message: "Item has been updated" });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err });
    }
});

router.delete("/:id", validateJWT, async (req, res) => {
    const mileId = req.params.id;
    const ownerid = req.user.id;

    try {
        const query = {
            where: {
                id: mileId,
                owner_id: ownerid,
            },
        };
        await MileModel.destroy(query);
        res.status(201).json({ message: "Item has been deleted" });
    } catch (err) {
        res.status(500).json({ message: `${err}` });
    }
});


module.exports = router;