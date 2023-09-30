-- CreateTable
CREATE TABLE "Reviews" (
    "productId" INTEGER NOT NULL,
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    CONSTRAINT "Reviews_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
