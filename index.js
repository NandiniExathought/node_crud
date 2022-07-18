const express = require("express");
const { QueryTypes } = require("sequelize");
const sequelize = require("./db");
const FoodModel = require("./models/FoodModel");
const UserModel = require("./models/UserModel");

const app = express();
const port = 3000;

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/user", async (req, res) => {

    console.log("req.query.id ====> ", req.query.id);
    const user = await sequelize.query(`SELECT * FROM Users WHERE id='${req.query.id}'`, {
        type: QueryTypes.SELECT
    })    

  res.send({
    message: "User fetched sucessfully",
    user: user
    });

});

app.post("/user", async (req, res) => {
    try {
        console.log("Inside POST");
        console.log("req.body ====> ", req.body);

        const createdUser = await UserModel.create(req.body);
        console.log("createdUser ====> ", createdUser);

        res.send({
            message: "User created sucessfully",
            user: createdUser
        });

    } catch (error) {
        console.log("error =====> ", error);
        
    }
});

app.put("/user", async (req, res) => {

    console.log("req.query.id ====> ", req.query.id);
    console.log("req.body ====> ", req.body);

    let updatedUser = await UserModel.update(req.body, {
        where:{
            id: req.query.id
        }
    })

    console.log("updatedUser ====> ", updatedUser);

    updatedUser = await UserModel.findOne({
        where:{
            id: req.query.id
        }
    })

    console.log("updatedUser ====> ", updatedUser);

    res.send({
        message: "User updated sucessfully",
        updatedUser: updatedUser
    });
});

app.delete("/user", async (req, res) => {

    try {
        console.log("Inside DELETE");
        console.log("req.query.id ====> ", req.query.id);
        console.log("req.body ====> ", req.body);

        let deletedUser = await UserModel.destroy({
            where: {
               id: req.query.id
            }
        });
        
        console.log('deletedUser ===> ' , deletedUser);
        res.send({
            message: "deleted user successfully",
            deletedUser: deletedUser
        });

    } catch (error) {
        console.log("error =====> ", error);
        
    }
});

console.log("-----------------------------------------------");

app.get("/food" , async(req,res) => {

    try {

        console.log("req.query.id ====> ", req.query.id);
        const getFood = await sequelize.query(`SELECT * FROM Food WHERE id='${req.query.id}'`, {
            type: QueryTypes.SELECT
        }) 

        res.send({
            message: "fetched food successfully",
            getFood
        });

    } catch (error) {
        console.log("error =====> ", error);
        
    }

});

app.post("/food" , async(req,res) => {

    try {

        console.log("Inside POST");
        console.log("req.body ====> ", req.body);

        const createdFood = await FoodModel.create(req.body);
        console.log("createdFood ====> ", createdFood);

        res.send({
            message: "created food successfully",
            createdFood
        });

    } catch (error) {
        console.log("error =====> ", error);
        
    }

});

app.put("/food" , async(req,res) => {

    try {

        console.log("req.query.id ====> ", req.query.id);
        console.log("req.body ====> ", req.body);
    
        let updatedFood = await FoodModel.update(req.body, {
            where:{
                id: req.query.id
            }
        })
    
        console.log("updatedFood ====> ", updatedFood);
    
        updatedFood = await FoodModel.findOne({
            where:{
                id: req.query.id
            }
        })
        throw new Error("Test")
    
        console.log("updatedFood ====> ", updatedFood);
        res.send({
            message: "updated food successfully",
            updatedFood
        });

    } catch (error) {
        console.log("error =====> ", error);
        
    }

});

app.delete("/food" , async(req,res) => {

    try {

        console.log("Inside DELETE");
        console.log("req.query.id ====> ", req.query.id);
        console.log("req.body ====> ", req.body);

        let deletedFood = await FoodModel.destroy({
            where: {
               id: req.query.id
            }
        });
        
        console.log('deletedFood ===> ' , deletedFood);
        res.send({
            message: "deleted food successfully",
            deletedFood
        });

    } catch (error) {
        console.log("error =====> ", error);
        
    }

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


(async ()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        
    }
  })()