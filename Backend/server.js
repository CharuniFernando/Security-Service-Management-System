const express = require("express");
const mongoose = require("mongoose");
const ItemRoute = require("./Routes/InventoryRoute.js");
const EmployeeRoutes = require("./Routes/UserRoutes.js");
const TrainingRouter = require("./Routes/TrainingRoutes.js");
const ClientRoute = require("./Routes/ClientRoutes.js");
const bookingRoutes = require("./Routes/BookingRoutes.js");
const paymentRoutes = require("./Routes/PaymentRoute.js");
const operationRoutes = require("./Routes/OperationRoute.js");
const LeaveRoutes = require("./Routes/LeaveRoute.js");
const Employee = require("./Model/UserModel.js");
const nodemailer = require("nodemailer");
const connectDB = require("./Config/db.js");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

dotenv.config();
connectDB();
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  })
);

app.use(cors());
app.use(express.json());

//Routes
app.use("/items", ItemRoute);
app.use("/employee", EmployeeRoutes);
app.use("/trainings", TrainingRouter);
app.use("/inquiries", ClientRoute);
app.use("/bookings", bookingRoutes);
app.use("/payments", paymentRoutes);
app.use("/operations", operationRoutes);
app.use("/leave", LeaveRoutes);
app.use('/uploads', express.static('uploads'));
const PORT = process.env.PORT || 8080;

app.post("/send-email", async (req, res) => {
  const { email } = req.body;
  try {
    // Check if the entered email exists in the 'gmail' field of the employee database
    const employee = await Employee.findOne({ gmail: email });

    if (!employee) {
      // If email is not found in the employee database
      return res.status(404).json({ message: "Gmail not registered" });
    }

    // Generate random 6-digit verification code
    const code = Math.floor(100000 + Math.random() * 900000);

    // Create transport for sending the email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Use environment variables for credentials
        pass: process.env.EMAIL_PASS,
      },
    });

    // Setup email data
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Verification Code",
      text: `Your verification code is ${code}`,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send({ message: "Error sending email" });
      }
      res.status(200).send({ message: "Verification code sent", code });
    });
  } catch (error) {
    console.error("Error during email sending process", error);
    res.status(500).send({ message: "Server error" });
  }
});
app.put("/update-password", async (req, res) => {
  const { gmail, newPassword } = req.body;

  try {
    // Check if the email exists in the employee database
    const employee = await Employee.findOne({ gmail });
    if (!employee) {
      return res.status(404).json({ message: "Email not registered" });
    }

    // Update the password directly
    employee.password = newPassword;
    await employee.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
