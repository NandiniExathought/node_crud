const express = require("express");
const { QueryTypes } = require("sequelize");
const sequelize = require("./db");
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
        throw error;
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
        message: "User fetched sucessfully",
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
        throw error;
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
        throw error;
    }
  })()