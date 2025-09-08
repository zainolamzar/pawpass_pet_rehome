-- CreateTable
CREATE TABLE "public"."CatInfo" (
    "id" TEXT NOT NULL,
    "breed" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "animal" TEXT NOT NULL DEFAULT 'cat',
    "images" TEXT[],
    "slug" TEXT NOT NULL,
    "isNeutered" BOOLEAN NOT NULL DEFAULT false,
    "isVaccinated" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "approvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CatInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DogInfo" (
    "id" TEXT NOT NULL,
    "breed" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "animal" TEXT NOT NULL DEFAULT 'dog',
    "images" TEXT[],
    "slug" TEXT NOT NULL,
    "isNeutered" BOOLEAN NOT NULL DEFAULT false,
    "isVaccinated" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "approvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DogInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CatInfo_slug_key" ON "public"."CatInfo"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "DogInfo_slug_key" ON "public"."DogInfo"("slug");
