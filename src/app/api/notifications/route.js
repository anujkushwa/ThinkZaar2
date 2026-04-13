import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const userRes = await query(`SELECT id FROM users WHERE clerk_id = $1`, [
      user.id,
    ]);
    const dbUserId = userRes.rows[0]?.id;

    if (!dbUserId) {
      return NextResponse.json({ success: true, total: 0, unread: 0, data: [] });
    }

    const res = await query(
      `SELECT id, title, message, type, is_read, created_at
       FROM notifications
       WHERE user_id = $1
       ORDER BY created_at DESC
       LIMIT 50`,
      [dbUserId]
    );

    const unreadRes = await query(
      `SELECT COUNT(*)::int as unread
       FROM notifications
       WHERE user_id = $1 AND is_read = false`,
      [dbUserId]
    );

    return NextResponse.json({
      success: true,
      total: res.rows.length,
      unread: unreadRes.rows[0]?.unread ?? 0,
      data: res.rows,
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
    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

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

    const userRes = await query(`SELECT id FROM users WHERE clerk_id = $1`, [
      user.id,
    ]);
    const dbUserId = userRes.rows[0]?.id;
    if (!dbUserId) {
      return NextResponse.json(
        { success: false, message: "User not found in DB" },
        { status: 404 }
      );
    }

    const res = await query(
      `INSERT INTO notifications (user_id, title, message, type, is_read)
       VALUES ($1, $2, $3, $4, false)
       RETURNING id, title, message, type, is_read, created_at`,
      [dbUserId, title, message, type]
    );

    return NextResponse.json({
      success: true,
      message: "Notification created successfully.",
      data: res.rows[0],
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
    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const { id, all } = body;

    const userRes = await query(`SELECT id FROM users WHERE clerk_id = $1`, [
      user.id,
    ]);
    const dbUserId = userRes.rows[0]?.id;
    if (!dbUserId) {
      return NextResponse.json(
        { success: false, message: "User not found in DB" },
        { status: 404 }
      );
    }

    if (all) {
      await query(`UPDATE notifications SET is_read = true WHERE user_id = $1`, [
        dbUserId,
      ]);
    } else {
      if (!id) {
        return NextResponse.json(
          {
            success: false,
            message: "Notification id is required.",
          },
          { status: 400 }
        );
      }

      await query(
        `UPDATE notifications SET is_read = true WHERE id = $1 AND user_id = $2`,
        [id, dbUserId]
      );
    }

    return NextResponse.json({
      success: true,
      message: all ? "All notifications marked as read." : `Notification ${id} marked as read.`,
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
    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

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

    const userRes = await query(`SELECT id FROM users WHERE clerk_id = $1`, [
      user.id,
    ]);
    const dbUserId = userRes.rows[0]?.id;
    if (!dbUserId) {
      return NextResponse.json(
        { success: false, message: "User not found in DB" },
        { status: 404 }
      );
    }

    await query(`DELETE FROM notifications WHERE id = $1 AND user_id = $2`, [
      id,
      dbUserId,
    ]);

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