"use server";

import { prisma } from "@/lib/prisma";


export async function submitContactForm(formData: FormData) {
  try {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!firstName || !email || !message) {
      return { error: "First Name, Email, and Message are required." };
    }

    const fullName = `${firstName} ${lastName}`.trim();

    // 1. Save to Database
    await prisma.message.create({
      data: {
        name: fullName,
        email,
        content: message,
      },
    });

  } catch (error) {
    console.error("Contact Form Error:", error);
    return { error: "An unexpected error occurred while sending your message." };
  }
}
