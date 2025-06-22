-- CreateTable
CREATE TABLE "GeneratedImage" (
    "id" TEXT NOT NULL,
    "gcsUri" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "imageRequestId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GeneratedImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GeneratedImage" ADD CONSTRAINT "GeneratedImage_imageRequestId_fkey" FOREIGN KEY ("imageRequestId") REFERENCES "ImageRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
