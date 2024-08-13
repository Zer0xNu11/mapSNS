/*
  Warnings:

  - You are about to drop the column `plansId` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the `Plans` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[noteId]` on the table `Plan` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `Plan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Plan" DROP CONSTRAINT "Plan_plansId_fkey";

-- DropForeignKey
ALTER TABLE "Plan" DROP CONSTRAINT "Plan_postId_fkey";

-- DropForeignKey
ALTER TABLE "Plans" DROP CONSTRAINT "Plans_noteId_fkey";

-- DropForeignKey
ALTER TABLE "Plans" DROP CONSTRAINT "Plans_userId_fkey";

-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "plansId",
DROP COLUMN "postId",
ADD COLUMN     "noteId" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;

-- DropTable
DROP TABLE "Plans";

-- CreateTable
CREATE TABLE "PlanPoint" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "content" TEXT,
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "imageUrl" TEXT,
    "open" BOOLEAN[],
    "planId" TEXT NOT NULL,
    "tag" TEXT[],

    CONSTRAINT "PlanPoint_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Plan_noteId_key" ON "Plan"("noteId");

-- AddForeignKey
ALTER TABLE "PlanPoint" ADD CONSTRAINT "PlanPoint_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanPoint" ADD CONSTRAINT "PlanPoint_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanPoint" ADD CONSTRAINT "PlanPoint_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plan" ADD CONSTRAINT "Plan_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE CASCADE ON UPDATE CASCADE;
