/*
  Warnings:

  - You are about to drop the column `pointLat` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `pointLng` on the `Post` table. All the data in the column will be lost.

*/
-- Enable PostGIS extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS postgis;


-- AlterTable
ALTER TABLE "Post" DROP COLUMN "pointLat",
DROP COLUMN "pointLng",
ADD COLUMN     "location" geometry(Point, 4326);

-- CreateIndex
CREATE INDEX "location_idx" ON "Post" USING GIST ("location");
