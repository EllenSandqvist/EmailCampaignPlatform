/*
  Warnings:

  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Email` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Email" DROP CONSTRAINT "Email_campaingId_fkey";

-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "username",
ADD COLUMN     "email" TEXT NOT NULL;

-- DropTable
DROP TABLE "Email";

-- CreateTable
CREATE TABLE "GeneratedEmail" (
    "id" SERIAL NOT NULL,
    "subject" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "recipients" TEXT[],
    "campaingId" INTEGER NOT NULL,

    CONSTRAINT "GeneratedEmail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "GeneratedEmail" ADD CONSTRAINT "GeneratedEmail_campaingId_fkey" FOREIGN KEY ("campaingId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
