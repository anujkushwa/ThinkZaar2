// src/app/api/notifications/route.js

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const notifications = [
      {
        id: 1,
        title: "Your solution got approved",
        message: "Congratulations! Your submission has been approved.",
        type: "success",
        read: false,
        time: "2 min ago",
      },
      {
        id: 2,
        title: "New vote received",
        message: "Someone voted for your submitted solution.",
        type: "info",
        read: false,
        time: "15 min ago",
      },
      {
        id: 3,
        title: "Deadline ending soon",
        message: "One of your active problems ends tomorrow.",
        type: "warning",
        read: true,
        time: "1 hour ago",
      },
      {
        id: 4,
        title: "Mentor reviewed your project",
        message: "Your project has received expert feedback.",
        type: "success",
        read: true,
        time: "Today",
      },
    ];

    return NextResponse.json({
      success: true,
      total: notifications.length,
      unread: notifications.filter((item) => !item.read).length,
      data: notifications,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch notifications.",
      },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    const { title, message, type = "info" } = body;

    if (!title || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Title and message are required.",
        },
        { status: 400 }
      );
    }

    const notification = {
      id: Date.now(),
      title,
      message,
      type,
      read: false,
      time: "Just now",
    };

    return NextResponse.json({
      success: true,
      message: "Notification created successfully.",
      data: notification,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create notification.",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  try {
    const body = await req.json();

    const { id } = body;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Notification id is required.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Notification ${id} marked as read.`,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update notification.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Notification id is required.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Notification ${id} deleted successfully.`,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete notification.",
      },
      { status: 500 }
    );
  }
}