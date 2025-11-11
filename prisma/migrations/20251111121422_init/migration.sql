-- CreateTable
CREATE TABLE "book" (
    "id" SERIAL NOT NULL,
    "author" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "published_year" INTEGER NOT NULL,

    CONSTRAINT "book_pkey" PRIMARY KEY ("id")
);
