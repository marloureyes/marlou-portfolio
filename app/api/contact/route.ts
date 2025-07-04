import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }
  const { name, email, message, recaptchaToken } = await req.json();

  // Validate required fields
  if (!name || !email || !message || !recaptchaToken) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    // Verify reCAPTCHA v3
    const recaptchaResponse = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: process.env.RECAPTCHA_SECRET_KEY!,
          response: recaptchaToken,
        }),
      }
    );

    const recaptchaData = await recaptchaResponse.json();

    if (!recaptchaData.success) {
      console.error(
        "reCAPTCHA verification failed:",
        recaptchaData["error-codes"]
      );
      return NextResponse.json(
        { message: "reCAPTCHA verification failed" },
        { status: 400 }
      );
    }

    // Check reCAPTCHA v3 score (0.0 - 1.0, higher is better)
    const score = recaptchaData.score;
    const threshold = 0.5; // Adjust this threshold as needed

    if (score < threshold) {
      console.warn(`reCAPTCHA score too low: ${score}`);
      return NextResponse.json(
        {
          message: "Security check failed. Please try again later.",
        },
        { status: 400 }
      );
    }

    console.log(`reCAPTCHA passed with score: ${score}`);

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Use App Password for Gmail
      },
    });

    // Email to you (receiving the contact form)
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER, // Your Gmail address
      subject: `New message from ${name}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p>${message}</p>`,
      replyTo: email, // This allows you to reply directly to the sender
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // // Optional: Send confirmation email to the sender
    // const confirmationOptions = {
    //   from: process.env.EMAIL_USER,
    //   to: email,
    //   subject: "Thank you for contacting us",
    //   html: `
    //     <h3>Thank you for your message!</h3>
    //     <p>Hi ${name},</p>
    //     <p>We have received your message and will get back to you soon.</p>
    //     <p><strong>Your message:</strong></p>
    //     <p>${message.replace(/\n/g, "<br>")}</p>
    //     <p>Best regards,<br>Marlou Reyes</p>
    //   `,
    // };

    // await transporter.sendMail(confirmationOptions);

    return NextResponse.json(
      { message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Error sending message" },
      { status: 500 }
    );
  }
}
