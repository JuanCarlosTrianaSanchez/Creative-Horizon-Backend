import bcrypt from "bcryptjs";

const testBcrypt = async () => {
  const password = "password123";
  const hashedPassword = await bcrypt.hash(password, 10);

  console.log("Plain password:", password);
  console.log("Hashed password:", hashedPassword);

  const isMatch = await bcrypt.compare(password, hashedPassword);
  console.log("Password match result:", isMatch);
};

testBcrypt();
