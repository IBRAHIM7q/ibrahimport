import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Create transporter (using Gmail SMTP)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Email to you (the portfolio owner)
    const ownerMailOptions = {
      from: process.env.GMAIL_USER,
      to: "alsaadi.aa.ss100@gmail.com",
      subject: `New Contact Form Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #22c55e; margin-bottom: 20px;">New Contact Form Submission</h2>
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <p style="margin: 0 0 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 0 0 10px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 0;"><strong>Message:</strong></p>
          </div>
          <div style="background-color: #ffffff; padding: 15px; border-radius: 5px; border-left: 4px solid #22c55e;">
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #666;">
            This message was sent from your portfolio website contact form.
          </p>
        </div>
      `,
    };

    // Auto-reply to the sender
    const autoReplyOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Thank you for contacting me!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #22c55e; margin-bottom: 20px;">Thank You for Your Message!</h2>
          <p style="margin-bottom: 20px;">Hi ${name},</p>
          <p style="margin-bottom: 20px;">
            Thank you for reaching out through my portfolio website. I have received your message and will get back to you as soon as possible.
          </p>
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <p style="margin: 0 0 10px 0;"><strong>Your Message:</strong></p>
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin-bottom: 20px;">
            I typically respond within 24-48 hours. If you don't hear back from me by then, please feel free to follow up.
          </p>
          <p style="margin-bottom: 20px;">
            Best regards,<br>
            Alsaadi
          </p>
          <p style="font-size: 12px; color: #666;">
            This is an automated response. Please do not reply to this email.
          </p>
        </div>
      `,
    };

    // Send emails
    await transporter.sendMail(ownerMailOptions);
    await transporter.sendMail(autoReplyOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}