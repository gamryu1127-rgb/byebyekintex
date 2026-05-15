CREATE TABLE "rsvp_submissions" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"attendance" text NOT NULL,
	"comment" text DEFAULT '',
	"created_at" timestamp DEFAULT now()
);
