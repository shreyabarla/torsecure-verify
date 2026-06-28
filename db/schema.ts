import {
  pgTable,
  pgEnum,
  serial,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";

export const internshipStatus = pgEnum("internship_status", [
  "Active",
  "Completed",
  "Certified",
]);

export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),

  email: varchar("email", { length: 255 }).notNull().unique(),

  password: varchar("password", { length: 255 }).notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});

export const interns = pgTable("interns", {
  id: serial("id").primaryKey(),

  torsecureId: varchar("torsecure_id", { length: 20 })
    .notNull()
    .unique(),

  fullName: varchar("full_name", { length: 255 }).notNull(),

  email: varchar("email", { length: 255 })
  .notNull()
  .unique(),

  phone: varchar("phone", { length: 15 }).notNull(),

  college: varchar("college", { length: 255 }).notNull(),

  designation: varchar("designation", { length: 100 }).notNull(),

  startDate: timestamp("start_date").notNull(),

  endDate: timestamp("end_date").notNull(),

  status: internshipStatus("status")
    .default("Active")
    .notNull(),

  createdAt: timestamp("created_at").defaultNow(),

  updatedAt: timestamp("updated_at").defaultNow(),
});