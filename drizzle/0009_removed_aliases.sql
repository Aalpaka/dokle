-- Varijante koje je admin obrisao, da ih seed ne doda ponovno.
CREATE TABLE "removed_aliases" (
  "answer_id" integer NOT NULL REFERENCES "answers"("id") ON DELETE CASCADE,
  "alias" text NOT NULL,
  PRIMARY KEY ("answer_id", "alias")
);--> statement-breakpoint
ALTER TABLE "removed_aliases" ENABLE ROW LEVEL SECURITY;
