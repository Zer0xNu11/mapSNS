/*
  Warnings:

  - A unique constraint covering the columns `[postId]` on the table `LikeSum` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "LikeSum" ADD COLUMN     "postId" TEXT,
ADD COLUMN     "totalPostLikes" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "LikeSum_postId_key" ON "LikeSum"("postId");

-- AddForeignKey
ALTER TABLE "LikeSum" ADD CONSTRAINT "LikeSum_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
