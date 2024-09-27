/*
  Warnings:

  - You are about to drop the column `campaingId` on the `GeneratedEmail` table. All the data in the column will be lost.
  - Added the required column `campaignId` to the `GeneratedEmail` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GeneratedEmail" DROP CONSTRAINT "GeneratedEmail_campaingId_fkey";

-- AlterTable
ALTER TABLE "GeneratedEmail" DROP COLUMN "campaingId",
ADD COLUMN     "campaignId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "GeneratedEmail" ADD CONSTRAINT "GeneratedEmail_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
