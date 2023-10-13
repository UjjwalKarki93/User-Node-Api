import express from "express";
import userRouter from "./routes/user.route.js";
import connection from "./models/index.js";

const app = express();
app.use(express.json());

app.get("/", (req, resp) => {
  resp.status(200).send("backend is working");
});

app.use("/users", userRouter);

// Handle unhandled routes
app.all("*", (req, res) => {
  return res.status(404).json({
    error: "Route Not Found",
  });
});

app.listen(8000, async () => {
  console.log("server started...");

  try {
    await connection.authenticate();
    connection.sync();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});

export default app;
