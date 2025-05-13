/*
  Warnings:

  - Added the required column `updatedAt` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Topic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Discussion" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "Topic" ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "tags" TEXT[];
