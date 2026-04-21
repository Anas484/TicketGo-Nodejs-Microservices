/*
  Warnings:

  - You are about to drop the `events` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `seats` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "seats" DROP CONSTRAINT "seats_event_id_fkey";

-- DropTable
DROP TABLE "events";

-- DropTable
DROP TABLE "seats";

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "performers" JSONB NOT NULL,
    "description" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "capacity" INTEGER NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seat" (
    "id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "seat_number" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "is_available" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Seat_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Seat" ADD CONSTRAINT "Seat_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
