import { query } from "./db";
import { getIO } from "./socket";

// 🎯 ADD POINTS (MAIN FUNCTION)
export async function addPoints(userId, points, type) {
  try {
    // ✅ 1. Update user points
    await query(
      `UPDATE users SET points = points + $1 WHERE id = $2`,
      [points, userId]
    );

    // ✅ 2. Log activity
    await query(
      `INSERT INTO activities (user_id, type, points)
       VALUES ($1, $2, $3)`,
      [userId, type, points]
    );

    // ✅ 3. Get updated points
    const res = await query(
      `SELECT points FROM users WHERE id = $1`,
      [userId]
    );

    const updatedPoints = res.rows[0]?.points || 0;

    // ✅ 4. Real-time socket emit
    try {
      const io = getIO();

      // 🔥 Better: emit to specific user room
      io.to(`user_${userId}`).emit("pointsUpdated", {
        userId,
        points: updatedPoints,
      });

    } catch (e) {
      console.log("⚠️ Socket not ready");
    }

    // ✅ 5. Badge check
    await checkBadges(userId, updatedPoints);

  } catch (error) {
    console.error("❌ Error in addPoints:", error);
  }
}

// 🏆 BADGE LOGIC
async function checkBadges(userId, points) {
  try {
    // 🎖️ Badge rules
    if (points >= 100) {
      await giveBadge(userId, 1); // Beginner
    }

    if (points >= 500) {
      await giveBadge(userId, 2); // Top Solver
    }

    if (points >= 1000) {
      await giveBadge(userId, 3); // Expert
    }

  } catch (error) {
    console.error("❌ Badge check error:", error);
  }
}

// 🏅 GIVE BADGE
async function giveBadge(userId, badgeId) {
  try {
    const exists = await query(
      `SELECT * FROM user_badges WHERE user_id = $1 AND badge_id = $2`,
      [userId, badgeId]
    );

    if (exists.rows.length === 0) {
      await query(
        `INSERT INTO user_badges (user_id, badge_id)
         VALUES ($1, $2)`,
        [userId, badgeId]
      );

      console.log(`🏆 Badge ${badgeId} awarded to user ${userId}`);
    }

  } catch (error) {
    console.error("❌ Badge error:", error);
  }
}