var express = require("express");
var router = express.Router();
let { IncrementalId } = require("../utils/IncrementalIdHandler");

// Database categories data
let categories = [
  {
    id: 7,
    name: "Clothes",
    slug: "clothes",
    image: "https://i.imgur.com/QkIa5tT.jpeg",
    creationAt: "2026-02-05T16:51:34.000Z",
    updatedAt: "2026-02-05T16:51:34.000Z",
  },
  {
    id: 8,
    name: "Electronics",
    slug: "electronics",
    image: "https://i.imgur.com/ZANVnHE.jpeg",
    creationAt: "2026-02-05T16:51:35.000Z",
    updatedAt: "2026-02-05T16:51:35.000Z",
  },
  {
    id: 9,
    name: "Furniture",
    slug: "furniture",
    image: "https://i.imgur.com/Qphac99.jpeg",
    creationAt: "2026-02-05T16:51:36.000Z",
    updatedAt: "2026-02-05T16:51:36.000Z",
  },
  {
    id: 10,
    name: "Shoes",
    slug: "shoes",
    image: "https://i.imgur.com/qNOjJje.jpeg",
    creationAt: "2026-02-05T16:51:36.000Z",
    updatedAt: "2026-02-05T16:51:36.000Z",
  },
  {
    id: 11,
    name: "Miscellaneous",
    slug: "miscellaneous",
    image: "https://i.imgur.com/BG8J0Fj.jpg",
    creationAt: "2026-02-05T16:51:37.000Z",
    updatedAt: "2026-02-05T16:51:37.000Z",
  },
  {
    id: 13,
    name: "gargantilla",
    slug: "gargantilla",
    image:
      "https://firebasestorage.googleapis.com/v0/b/pruebasalejandro-597ed.firebasestorage.app/o/gargantilla.jpg?alt=media&token=6bbf8234-5112-4ca8-b130-5e49ed1f3140",
    creationAt: "2026-02-05T21:09:36.000Z",
    updatedAt: "2026-02-05T21:09:36.000Z",
  },
  {
    id: 15,
    name: "category_B",
    slug: "category-b",
    image: "https://pravatar.cc/",
    creationAt: "2026-02-05T22:04:27.000Z",
    updatedAt: "2026-02-05T22:04:27.000Z",
  },
  {
    id: 16,
    name: "string",
    slug: "string",
    image: "https://pravatar.cc/",
    creationAt: "2026-02-05T22:04:28.000Z",
    updatedAt: "2026-02-05T22:04:28.000Z",
  },
  {
    id: 17,
    name: "Anillos",
    slug: "anillos",
    image:
      "https://firebasestorage.googleapis.com/v0/b/pruebasalejandro-597ed.firebasestorage.app/o/Anillos.jpg?alt=media&token=b7de8064-d4eb-4680-a4e2-ad917838c6c8",
    creationAt: "2026-02-06T02:40:20.000Z",
    updatedAt: "2026-02-06T02:40:20.000Z",
  },
  {
    id: 18,
    name: "Testing Category",
    slug: "testing-category",
    image: "https://placeimg.com/640/480/any",
    creationAt: "2026-02-06T06:04:54.000Z",
    updatedAt: "2026-02-06T06:04:54.000Z",
  },
];

// Sample products data (for /api/v1/categories/{id}/products endpoint)
let products = [
  { id: 1, title: "T-Shirt", categoryId: 7, price: 25.99 },
  { id: 2, title: "Jeans", categoryId: 7, price: 49.99 },
  { id: 3, title: "Laptop", categoryId: 8, price: 999.99 },
  { id: 4, title: "Smartphone", categoryId: 8, price: 599.99 },
  { id: 5, title: "Chair", categoryId: 9, price: 199.99 },
  { id: 6, title: "Table", categoryId: 9, price: 299.99 },
  { id: 7, title: "Nike Shoes", categoryId: 10, price: 129.99 },
  { id: 8, title: "Adidas Shoes", categoryId: 10, price: 119.99 },
];

// GET all categories with name query filter
// GET /api/v1/categories?name=clothes
router.get("/", function (req, res, next) {
  let nameQ = req.query.name ? req.query.name : "";
  let result = categories.filter(function (category) {
    return category.name.toLowerCase().includes(nameQ.toLowerCase());
  });
  res.status(200).send(result);
});

// GET category by ID
// GET /api/v1/categories/7
router.get("/:id", function (req, res, next) {
  let result = categories.find(function (category) {
    return category.id == req.params.id;
  });
  if (result) {
    res.status(200).send(result);
  } else {
    res.status(404).send({
      message: "CATEGORY NOT FOUND",
    });
  }
});

// GET category by slug
// GET /api/v1/categories/slug/clothes
router.get("/slug/:slug", function (req, res, next) {
  let slug = req.params.slug;
  let result = categories.find(function (category) {
    return category.slug == slug;
  });
  if (result) {
    res.status(200).send(result);
  } else {
    res.status(404).send({
      message: "SLUG NOT FOUND",
    });
  }
});

// GET all products by category ID
// GET /api/v1/categories/{id}/products
router.get("/:id/products", function (req, res, next) {
  let categoryId = req.params.id;
  let categoryExists = categories.find(function (category) {
    return category.id == categoryId;
  });

  if (!categoryExists) {
    return res.status(404).send({
      message: "CATEGORY NOT FOUND",
    });
  }

  let result = products.filter(function (product) {
    return product.categoryId == categoryId;
  });

  res.status(200).send(result);
});

// POST create new category
// POST /api/v1/categories
router.post("/", function (req, res, next) {
  let { name, image, slug } = req.body;

  if (!name || !slug) {
    return res.status(400).send({
      message: "NAME and SLUG are required",
    });
  }

  let newCategory = {
    id: Math.max(...categories.map((c) => c.id), 0) + 1,
    name: name,
    slug: slug,
    image: image || "",
    creationAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  categories.push(newCategory);
  res.status(201).send(newCategory);
});

// PUT/PATCH edit category
// PUT /api/v1/categories/7
router.put("/:id", function (req, res, next) {
  let categoryIndex = categories.findIndex(function (category) {
    return category.id == req.params.id;
  });

  if (categoryIndex === -1) {
    return res.status(404).send({
      message: "CATEGORY NOT FOUND",
    });
  }

  let { name, slug, image } = req.body;

  if (name) categories[categoryIndex].name = name;
  if (slug) categories[categoryIndex].slug = slug;
  if (image) categories[categoryIndex].image = image;
  categories[categoryIndex].updatedAt = new Date().toISOString();

  res.status(200).send(categories[categoryIndex]);
});

// DELETE category
// DELETE /api/v1/categories/7
router.delete("/:id", function (req, res, next) {
  let categoryIndex = categories.findIndex(function (category) {
    return category.id == req.params.id;
  });

  if (categoryIndex === -1) {
    return res.status(404).send({
      message: "CATEGORY NOT FOUND",
    });
  }

  let deletedCategory = categories.splice(categoryIndex, 1);
  res.status(200).send({
    message: "CATEGORY DELETED SUCCESSFULLY",
    data: deletedCategory[0],
  });
});

module.exports = router;
