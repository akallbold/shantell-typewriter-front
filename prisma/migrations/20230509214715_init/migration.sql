-- CreateTable
CREATE TABLE "text_data" (
    "id" STRING NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text" STRING NOT NULL,

    CONSTRAINT "text_data_pkey" PRIMARY KEY ("id")
);
