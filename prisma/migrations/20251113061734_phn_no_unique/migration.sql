/*
  Warnings:

  - A unique constraint covering the columns `[phn_no]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_phn_no_key" ON "user"("phn_no");
