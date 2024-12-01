const express = require("express");
const cors = require("cors"); // Ensure you have this line after express import
const app = express();
const PORT = 3001;

let users = [
  { id: 1, email: "test@example.com", username: "testuser", password: "hashed_password" },
];

app.use(cors()); // Enable CORS for all routes

app.use(express.json());

// Default GET route for the root
app.get("/", (req: any, res: any) => {
  res.send("API is running");
});

// Register Dummy API
app.post("/register", (req: any, res: any) => {
  const { email, username, password } = req.body;

  // Check if user already exists
  const userExists = users.find((user) => user.email === email);
  if (userExists) {
    return res.status(400).json({ message: "Email already registered" });
  }

  users.push({ id: users.length + 1, email, username, password });
  return res.status(201).json({ message: "User created successfully" });
});

// Sign-in Dummy API
app.post("/sign_in", (req: any, res: any) => {
  const { email, password } = req.body;

  const user = users.find((user) => user.email === email);
  if (!user || user.password !== password) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const accessToken = `dummy-token-${Math.random().toString(36).substring(2)}`;
  return res.status(200).json({ message: "Sign-in successful", access_token: accessToken });
});

app.listen(PORT, () => console.log(`Mock API running at http://localhost:${PORT}`));