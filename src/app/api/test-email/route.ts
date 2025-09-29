import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function GET() {
  try {
    // Check if environment variables are set
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      return NextResponse.json({ 
        error: "Gmail credentials not configured",
        user: process.env.GMAIL_USER ? "✓ Set" : "✗ Not set",
        password: process.env.GMAIL_APP_PASSWORD ? "✓ Set" : "✗ Not set"
      }, { status: 400 });
    }

    // Create transporter
    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Test the connection
    await transporter.verify();

    // Send test email
    const testMailOptions = {
      from: process.env.GMAIL_USER,
      to: "alsaadi.aa.ss100@gmail.com",
      subject: "📧 Test Email from Portfolio Contact Form",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #22c55e; margin-bottom: 20px;">✅ Test Email Successful!</h2>
          <p style="margin-bottom: 20px;">
            Congratulations! Your portfolio contact form is now properly configured and ready to send emails.
          </p>
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <p style="margin: 0 0 10px 0;"><strong>From:</strong> Portfolio Contact Form</p>
            <p style="margin: 0 0 10px 0;"><strong>To:</strong> alsaadi.aa.ss100@gmail.com</p>
            <p style="margin: 0;"><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          </div>
          <p style="margin-bottom: 20px;">
            This test confirms that:
          </p>
          <ul style="margin-bottom: 20px; padding-left: 20px;">
            <li>✅ Gmail SMTP connection is working</li>
            <li>✅ Environment variables are configured correctly</li>
            <li>✅ Nodemailer is properly integrated</li>
            <li>✅ Your contact form can send emails successfully</li>
          </ul>
          <p style="color: #666; font-size: 14px;">
            You can now receive messages from visitors through your portfolio contact form!
          </p>
        </div>
      `,
    };

    await transporter.sendMail(testMailOptions);

    return NextResponse.json({ 
      message: "Test email sent successfully!",
      to: "alsaadi.aa.ss100@gmail.com",
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("Test email error:", error);
    return NextResponse.json({ 
      error: "Failed to send test email",
      details: error instanceof Error ? error.message : "Unknown error",
      user: process.env.GMAIL_USER ? "✓ Set" : "✗ Not set",
      password: process.env.GMAIL_APP_PASSWORD ? "✓ Set" : "✗ Not set"
    }, { status: 500 });
  }
}