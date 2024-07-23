/*
  Warnings:

  - You are about to drop the column `point` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "point",
ADD COLUMN     "pointLat" TEXT[],
ADD COLUMN     "pointLng" TEXT[];
