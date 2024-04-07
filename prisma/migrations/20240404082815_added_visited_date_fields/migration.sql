/*
  Warnings:

  - Added the required column `visitedDateEnd` to the `Guide` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visitedDateStart` to the `Guide` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Guide" ADD COLUMN     "visitedDateEnd" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "visitedDateStart" TIMESTAMP(3) NOT NULL;
