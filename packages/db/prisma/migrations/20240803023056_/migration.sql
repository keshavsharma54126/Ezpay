/*
  Warnings:

  - Added the required column `type` to the `OnRampTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "onRamptype" AS ENUM ('Added', 'Withdrawn');

-- AlterTable
ALTER TABLE "OnRampTransaction" ADD COLUMN     "type" "onRamptype" NOT NULL;
