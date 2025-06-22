-- CreateEnum
CREATE TYPE "ImageRequestStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED');

-- AlterTable
ALTER TABLE "ImageRequest" ADD COLUMN     "status" "ImageRequestStatus" NOT NULL DEFAULT 'PENDING';
