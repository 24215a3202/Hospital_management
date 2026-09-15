import bcrypt from "bcrypt";
import { User } from "../models/userSchema.js";

const defaultDoctors = {
  Pediatrics: [
    ["Aarav", "Sharma"],
    ["Maya", "Patel"],
  ],
  Orthopedics: [
    ["Rohan", "Mehta"],
    ["Ananya", "Reddy"],
  ],
  Cardiology: [
    ["Vikram", "Rao"],
    ["Priya", "Nair"],
  ],
  Neurology: [
    ["Arjun", "Kapoor"],
    ["Neha", "Verma"],
  ],
  Oncology: [
    ["Aditya", "Iyer"],
    ["Kavya", "Desai"],
  ],
  Radiology: [
    ["Siddharth", "Joshi"],
    ["Ishita", "Malhotra"],
  ],
  "Physical Therapy": [
    ["Karan", "Bansal"],
    ["Aisha", "Khan"],
  ],
  Dermatology: [
    ["Rahul", "Chopra"],
    ["Sneha", "Mishra"],
  ],
  ENT: [
    ["Nikhil", "Singh"],
    ["Pooja", "Agarwal"],
  ],
};

export const seedDoctors = async () => {
  const password = await bcrypt.hash("DoctorPassword123!", 10);
  let seededCount = 0;

  for (const [department, doctors] of Object.entries(defaultDoctors)) {
    for (const [firstName, lastName] of doctors) {
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@hopehealthcare.local`;
      const result = await User.updateOne(
        { email, role: "Doctor" },
        {
          $setOnInsert: {
            firstName,
            lastName,
            email,
            phone: "0000000000",
            password,
            gender: "Others",
            aadhar: "000000000000",
            dob: new Date("1990-01-01"),
            role: "Doctor",
            doctrDptmnt: department,
            doctrAvatar: { public_id: "", url: "" },
          },
        },
        { upsert: true }
      );
      seededCount += result.upsertedCount;
    }
  }

  console.log(`Default doctors ready (${seededCount} added).`);
};
