/*
  Warnings:

  - Added the required column `allowCreativity` to the `ImageRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ImageRequest" ADD COLUMN     "allowCreativity" BOOLEAN NOT NULL,
ADD COLUMN     "negativePrompt" TEXT;
