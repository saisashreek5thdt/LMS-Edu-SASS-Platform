/*
  Warnings:

  - You are about to drop the column `author` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `topicId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `commentsCount` on the `Discussion` table. All the data in the column will be lost.
  - You are about to drop the column `participants` on the `Discussion` table. All the data in the column will be lost.
  - The `status` column on the `Discussion` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Topic` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `discussionId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `Discussion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacherId` to the `Discussion` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Discussion` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "DiscussionStatus" AS ENUM ('open', 'closed');

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_topicId_fkey";

-- DropForeignKey
ALTER TABLE "Topic" DROP CONSTRAINT "Topic_discussionId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "author",
DROP COLUMN "topicId",
DROP COLUMN "updatedAt",
ADD COLUMN     "discussionId" INTEGER NOT NULL,
ADD COLUMN     "studentId" INTEGER,
ADD COLUMN     "teacherId" INTEGER;

-- AlterTable
ALTER TABLE "Discussion" DROP COLUMN "commentsCount",
DROP COLUMN "participants",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "teacherId" INTEGER NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "DiscussionStatus" NOT NULL DEFAULT 'open',
ALTER COLUMN "description" SET NOT NULL;

-- DropTable
DROP TABLE "Topic";

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- AddForeignKey
ALTER TABLE "Discussion" ADD CONSTRAINT "Discussion_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discussion" ADD CONSTRAINT "Discussion_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_discussionId_fkey" FOREIGN KEY ("discussionId") REFERENCES "Discussion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
