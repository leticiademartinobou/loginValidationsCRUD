//Dependencias

const User = require("../models/UserModel");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const tokenService = require("../services/token");

const userController = {
  getUsers: async function (req, res) {
    console.log("Llamando al método GET");
    try {
      const { token } = req.headers;

      console.log("token recibido", token);

      //   Verifico que el token recibido es correcto

      const verifyResult = jwt.verify(token, process.env.SECRET_KEY);
      if (!verifyResult.email) {
        return res.json({
          success: false,
          message: "Wrong email",
        });
      }
      console.log(
        "Email obtenido del token en caso de que la firma sea correcta",
        verifyResult.email
      );
      res.json({
        success: true,
      });
    } catch (error) {
      console.log("Se ha producido un error", error);
      return res.json({
        success: false,
        message: "An error ocurred",
      });
    }

    //const { userId } = req.params;
    //console.log("Buscando información del user" + userId);

    res.send(
      `Has buscado la información de usuario con el nombre ${req.body.name} y edad ${req.body.age}`
    );
  },
  createUsers: async (req, res) => {
    console.log("Llamando al método POST");
    const { userId } = req.params;
    //console.log("la información del body es:", req.body);
    //console.log("el nombre del usuario es:", req.body.name);

    //leer contenido del archivo

    const readUserDataOfLibrary = fs.readFile(
      "contacts.db",
      { encoding: "utf-8" },
      (err, data) => {
        if (err) {
          throw new Error("No se puede añadir el usuario");
        }
        console.log("La data es", data);

        // preguntar a Víctor si se puede poner un array así:

        // const parsedLibraryInformation = [JSON.parse(data)]; tb intenté poner un array vacío y nada
        // no funciona puse un array vacío en el archivo JSON

        const parsedLibraryInformation = JSON.parse(data);

        console.log("array de contactos", parsedLibraryInformation);
        parsedLibraryInformation.push(req.body);
        console.log(parsedLibraryInformation);
        const writeDataOfUsers = fs.writeFile(
          "contacts.db",
          JSON.stringify(parsedLibraryInformation),
          { flag: "w" },
          (err) => {
            if (err) {
              throw new Error("No se puede añadir el usuario");
            }
            res.send(`Contacto añadido con nombre ${req.body.name}`);
          }
        );
      }
    );
  },
  registerUser: async (req, res) => {
    console.log("llamando al método POST register user");
    const { email, password } = req.body;

    //Generar el JWT y devolverlo

    const token = jwt.sign(
      {
        email,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1m" }
    );
    res.json({
      success: true,
      token,
    });

    // Validaciones

    if (!email || !password) {
      res.json({
        success: false,
        message: "Failed register",
      });
    }

    // Añadir a la BBDD

    //para no poner el password directamente, lo vamos a cifrar

    // const passwordToSave = await bcrypt.hash(password, 10);

    // const newUser = {
    //   email: email,
    //   password: passwordToSave,
    // };

    // //hay que hacer el create del newUser

    // const generatedToken = tokenService.generateToken(email);

    // res.json({
    //   success: true,
    //   generatedToken,
    // });

    //res.send("El token es");

    // Añadir a la BBDD
  },
  userLogin: async (req, res) => {
    console.log("accediendo a User Login");

    const { email, password } = req.body;

    //Validaciones

    // comprobamos si el email existe en BBDD
    // En caso de que sí, comprobamos si la contraseña coincide con la almacenada en la BBDD

    const user = await User.find(email);

    const match = await bcrypt.compare(password, user.password); // user.password es la psw de la BBDD

    if (match) {
      // En caso que sí, generamos y devolvemos token
      const generatedToken = tokenService.generateToken(email);

      res.json({
        success: true,
        generatedToken,
      });
    } else {
      res.json({
        success: false,
        message: "Failed login",
      });
    }
  },
  updateUsers: (req, res) => {
    console.log("Llamando al método PATCH");
    res.send(
      `He actualizado el usuario con el nombre ${req.body.name} y edad ${req.body.age}`
    );
    console.log(req.body);
  },
  deleteUsers: (req, res) => {
    console.log("Llamando al método DELETE");
    res.send(
      `He borrado el usuario con el nombre ${req.body.name} y edad ${req.body.age}`
    );
    console.log(req.body);
  },
};

module.exports = userController;

//   const writeData = () => {
//     const writeUsersInContactsLibrary = JSON.stringify(req.body);
//     console.log(writeUsersInContactsLibrary);
//     const writeDataOfUsers = fs.writeFile(
//       "contacts.db",
//       writeUsersInContactsLibrary,
//       { flag: "w" },
//       (err) => {
//         throw new Error("No se puede inscribir el contacto");
//   }

// }
//)

// writeData();

// res.send(
//   `He añadido el usuario con el nombre ${req.body.name} y edad ${req.body.age}`
// );
