-- CreateEnum
CREATE TYPE "Statut" AS ENUM ('EN_ATTENTE', 'ACCEPTEE', 'EN_COURS', 'LIVREE', 'ANNULEE');

-- CreateTable
CREATE TABLE "Commande" (
    "id" SERIAL NOT NULL,
    "adresseDepart" TEXT NOT NULL,
    "adresseArrivee" TEXT NOT NULL,
    "description" TEXT,
    "prix" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "statut" "Statut" NOT NULL DEFAULT 'EN_ATTENTE',
    "clientId" INTEGER NOT NULL,
    "livreurId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Commande_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_livreurId_fkey" FOREIGN KEY ("livreurId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
