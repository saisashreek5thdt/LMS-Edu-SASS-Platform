-- CreateTable
CREATE TABLE "Discussion" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "participants" INTEGER NOT NULL DEFAULT 0,
    "commentsCount" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'open',

    CONSTRAINT "Discussion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topic" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "discussionId" INTEGER NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "topicId" INTEGER NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_discussionId_fkey" FOREIGN KEY ("discussionId") REFERENCES "Discussion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
