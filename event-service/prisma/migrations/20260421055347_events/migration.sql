/*
  Warnings:

  - You are about to drop the column `event_address` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `event_celebs` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `event_date` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `event_end` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `event_name` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `event_start` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `event_type` on the `events` table. All the data in the column will be lost.
  - Added the required column `capacity` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "events" DROP COLUMN "event_address",
DROP COLUMN "event_celebs",
DROP COLUMN "event_date",
DROP COLUMN "event_end",
DROP COLUMN "event_name",
DROP COLUMN "event_start",
DROP COLUMN "event_type",
ADD COLUMN     "capacity" INTEGER NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "performers" TEXT[],
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "seats" (
    "id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "seat_number" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "is_available" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "seats_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "seats" ADD CONSTRAINT "seats_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
