/*
  Warnings:

  - Added the required column `order` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PlanPoint" ADD COLUMN     "category" TEXT NOT NULL DEFAULT 'other';

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "order" INTEGER NOT NULL;
