-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "totalLikes" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "totalLikes" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "totalLikes" INTEGER NOT NULL DEFAULT 0;
