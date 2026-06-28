const cron =
    require("node-cron");

const pool =
    require("../config/db");

cron.schedule(
    "*/5 * * * *",
    async () => {

        await pool.execute(
            `
            UPDATE bookings
            SET booking_status =
                'CANCELLED'
            WHERE booking_status =
                'PENDING'

            AND expires_at <
                NOW()
            `
        );
    }
);