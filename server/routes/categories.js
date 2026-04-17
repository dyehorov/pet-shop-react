const { Op } = require("sequelize");

const Category = require("../database/models/category");
const Product = require("../database/models/product");

const parsePaginationParams = require("../middlewares/parsePaginationParams");
const parseSortParams = require("../middlewares/parseSortParams");
const parseProductsFilters = require("../middlewares/parseProductsFilters");
// const isValidId = require("../middlewares/isValidId");

const createSort = require("../utils/createSort");
const createPaginationData = require("../utils/createPaginationData");

const express = require("express");

const router = express.Router();

router.get("/", parsePaginationParams, async (req, res) => {
  const { page, perPage } = req.query;

  const categories = await Category.findAll({
    limit: perPage,
    offset: (page - 1) * perPage,
  });

  const total = await Category.count();
  const paginationData = createPaginationData({total, page, perPage});

  res.json({
    categories,
    ...paginationData,
  });
});

router.get("/popular", async (req, res) => {
  const result = await Category.findAll({
    limit: 4,
  });
  res.json(result);
});

router.get(
  "/:slug",
  // isValidId,
  parseSortParams,
  parsePaginationParams,
  async (req, res) => {
    const { slug } = req.params;

    const category = await Category.findOne({ where: { slug } });
    if (!category) {
      return res.status(404).json({
        msg: `Category wit slug ${slug} not found`,
      });
    }

    const { page, perPage, sortBy } = req.query;

    const order = createSort(sortBy);
    const filters = parseProductsFilters(req.query);

    const products = await Product.findAll({
      where: {
        categoryId: category.id,
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
        categoryId: category.id,
        [Op.and]: filters,
      }
    });

    const paginationData = createPaginationData({total, page, perPage});

    res.json({
      category,
      data: {
        ...paginationData,
        products,
      }
    });
  }
);

module.exports = router;
