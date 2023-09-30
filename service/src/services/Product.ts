//service/src/services/Product.ts
import { Product } from "@prisma/client";
import { prisma } from "../infrastructure/db";

export const all = async (): Promise<Product[]> => {
  const products = await prisma.product.findMany();
  return products;
};

export const find = async (id: string): Promise<Product | null> => {
  const product = await prisma.product.findFirst({
    where: { id: parseInt(id) },
  });

  return product;
};

export const findMany = async (ids: string[]): Promise<Product[]> => {
  const products = await prisma.product.findMany({
    where: { id: { in: ids.map((id) => parseInt(id)) } },
  });

  return products;
};

export const search = async (searchTerm: string): Promise<Product[]> => {
  const result = await prisma.product.findMany({
    where: { title: { equals: searchTerm, },},
  })
  return result;
};

export const create = async (
  title: string,
  description: string,
  price: number,
  imageUrl: string = "https://i.imgur.com/EyoQOjC.jpg",
): Promise<Product> => {
  const newProduct = await prisma.product.create({
    data: {
      title: title,
      description: description,
      price: price,
      imageUrl: imageUrl,
    },
  });

  return newProduct;
};

export const update = async (
  id: string,
  data: Partial<Product>
): Promise<Product | null> => {
  try {
    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        ...data,
      },
    });

    return product;
  } catch (error) {
    return null; // Product not found or error occurred during update
  }
};

export const softDeleteProduct = async (id: string): Promise<Product | null> => {
  try {
    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        deleted: true,
      },
    });

    return product;
  } catch (error) {
    return null; // Product not found or error occurred during update
  }
};