const users = require("../data/users");

// SIGN UP
exports.signup = (req, res) => {
  const { email, password, employeeId, role } = req.body;

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = {
    email,
    password,
    employeeId,
    role,
    isVerified: false
  };

  users.push(newUser);

  res.json({
    message: "Signup successful. Verification email sent.",
    user: newUser
  });
};

// EMAIL VERIFICATION
exports.verifyEmail = (req, res) => {
  const { email } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.isVerified = true;

  res.json({ message: "Email verified successfully" });
};

// LOGIN
exports.login = (req, res) => {
  const { email, password, employeeId, role } = req.body;

  const user = users.find(
    u =>
      u.email === email &&
      u.password === password &&
      u.employeeId === employeeId &&
      u.role === role
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  if (!user.isVerified) {
    return res.status(403).json({ message: "Email not verified" });
  }

  res.json({
    message: "Login successful",
    role: user.role
  });
};
