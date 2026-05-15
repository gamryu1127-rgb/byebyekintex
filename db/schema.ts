import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const rsvpSubmissions = pgTable("rsvp_submissions", {
  id: serial().primaryKey(),
  name: text().notNull(),
  attendance: text().notNull(),
  comment: text().default(""),
  createdAt: timestamp("created_at").defaultNow(),
});
