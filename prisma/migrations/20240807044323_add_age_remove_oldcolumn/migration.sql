/*
  Warnings:

  - You are about to drop the column `title` on the `Plan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Note" ALTER COLUMN "content" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "title",
ALTER COLUMN "content" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Plans" ALTER COLUMN "content" DROP NOT NULL,
ALTER COLUMN "noteId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "content" DROP NOT NULL;
