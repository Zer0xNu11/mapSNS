/*
  Warnings:

  - Added the required column `order` to the `PlanPoint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PlanPoint" ADD COLUMN     "order" INTEGER NOT NULL;
