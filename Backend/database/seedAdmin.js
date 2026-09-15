import { User } from "../models/userSchema.js";

export const seedAdmin = async () => {
  const email = process.env.ADMIN_EMAIL || "admin@hopehealthcare.local";
  const password = process.env.ADMIN_PASSWORD || "AdminPassword123!";

  const existingAdmin = await User.findOne({ email, role: "Admin" }).select(
    "+password"
  );
  if (existingAdmin) {
    if (!(await existingAdmin.comparePassword(password))) {
      existingAdmin.password = password;
      await existingAdmin.save();
      console.log(`Default admin password updated (${email}).`);
    }
    console.log(`Default admin ready (${email}).`);
    return;
  }

  await User.create({
    firstName: "System",
    lastName: "Admin",
    email,
    phone: "0000000000",
    password,
    gender: "Others",
    aadhar: "000000000000",
    dob: new Date("1990-01-01"),
    role: "Admin",
  });

  console.log(`Default admin created (${email}).`);
};