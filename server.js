const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.post("/login", (req, res) => {
  const { email, password } = req.body;
  
  const user = router.db.get("users").find({ email, password }).value();

  console.log(user);

  if (!user) {
    return res.status(401).json({ message: "Email o contraseña incorrectos" });
  }

  const token = "token-de-autenticacion";

  res.json({ token });
});

server.use(router);
server.listen(3000, () => {
  console.log("JSON Server está corriendo");
});
