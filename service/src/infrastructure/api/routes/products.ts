//service/src/infrastructure/api/routes/products.ts
import express, { Request, Response } from "express";
import { ProductService } from "../../../services";
import { success, error, verifyAuthorization } from "../utils";

const router = express.Router();

const getProducts = async (_: Request, response: Response) => {
  const searchTerm = _.params.searchTerm;
  const products = await ProductService.all();

  return success(response, {
    data: {
      products: products,
    },
    statusCode: 200,
  });
};

const getProduct = async (request: Request, response: Response) => {
  const id = request.params.id;
  const product = await ProductService.find(id);

  if (product === null) {
    return error(response, {
      error: "Product not found.",
      statusCode: 404,
    });
  }

  return success(response, {
    data: {
      product: product,
    },
    statusCode: 200,
  });
};

const createProduct = async (request: Request, response: Response) => {
  const authorization = await verifyAuthorization(
    request.headers.authorization,
  );

  if (authorization.err) {
    return error(response, {
      error: authorization.val.message,
      statusCode: 401,
    });
  }

  const product = await ProductService.create(
    request.body.title,
    request.body.description,
    request.body.price,
  );

  return success(response, {
    data: {
      product: product,
    },
    statusCode: 201,
  });
};

const updateProduct = async (request: Request, response: Response) => {
  // Verify user authorization (admin only)
  const authorization = await verifyAuthorization(
    request.headers.authorization
  );

  if (authorization.err) {
    return error(response, {
      error: authorization.val.message,
      statusCode: 401,
    });
  }

  const id = request.params.id;
  const updatedData = request.body;

  try {
    const updatedProduct = await ProductService.update(id, updatedData);

    if (!updatedProduct) {
      return error(response, {
        error: "Product not found.",
        statusCode: 404,
      });
    }

    return success(response, {
      data: {
        product: updatedProduct,
      },
      statusCode: 200,
    });
  } catch (error) {
    return error(response, {
      error: "Error updating product.",
      statusCode: 500,
    });
  }
};

router.get("/:searchTerm", getProducts);
router.get("/:id", getProduct);
router.post("/", createProduct);
router.put("/:id", updateProduct); // Add the new PUT endpoint for updating a product

export default router;
