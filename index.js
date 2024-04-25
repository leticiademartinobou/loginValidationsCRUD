// importar los módulos que necesito
const express = require("express");
const userRouter = require("./routes/userRoutes");

const app = express();

//Añando el parser para JSON - permite a express entender lo que viene en el body en formato JSON

app.use(express.json());

app.use("/user", userRouter);

app.listen(3002, () => {
  console.log("¡Servidor Rulando!");
});
