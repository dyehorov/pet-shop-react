const { Op } = require("sequelize");
const express = require("express");

const parsePaginationParams = require("../middlewares/parsePaginationParams");
const parseSortParams = require("../middlewares/parseSortParams");
const parseProductsFilters = require("../middlewares/parseProductsFilters");

const createSort = require("../utils/createSort");
const createPaginationData = require("../utils/createPaginationData");

const Category = require("../database/models/category");
const Product = require("../database/models/product");

const router = express.Router();

router.get("/all", parsePaginationParams, parseSortParams, async (req, res) => {
  const { page, perPage, sortBy } = req.query;

  const order = createSort(sortBy);
  const filters = parseProductsFilters(req.query);

  const products = await Product.findAll({
    where: {
        [Op.and]: filters,
    },
    limit: perPage,
    offset: (page - 1) * perPage,
    order,
    include: [{
      model: Category,
      attributes: ["id", "title", "slug", "image"]
    }],
  });

  const total = await Product.count({
    where: {
      [Op.and]: filters,
    }
  });

  const paginationData = createPaginationData({total, page, perPage});

  res.json({
    products,
    ...paginationData,
  });
});

router.get("/:slug", async (req, res) => {
  const { slug } = req.params;

  const product = await Product.findOne({ 
    where: { slug },
    include: [{
      model: Category,
      attributes: ["id", "title", "slug", "image"]
    }],
  });

  if (!product) {
    res.status(404).json({ message: `product with slug ${slug} not found` });
    return;
  }

  res.json(product);
});

router.post("/cart/ids", async(req, res)=> {
  const products = await Product.findAll({
    where: {
      id: {
        [Op.in]: req.body,
      }
    }
  });

  res.json(products);
})

router.post("/cart/slugs", async(req, res)=> {
  const products = await Product.findAll({
    where: {
      slug: {
        [Op.in]: req.body,
      }
    }
  });

  res.json(products);
})

router.get("/add/:title/:price/:discont_price/:description", (req, res) => {
  const { title, price, discont_price, description } = req.params;
  Product.create({ title, price, discont_price, description, categoryId: 1 });
  res.json(`добавлено`);
});

module.exports = router;
