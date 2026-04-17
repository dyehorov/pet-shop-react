const { Op, where, fn, col } = require("sequelize");

module.exports = ({ discont, minPrice, maxPrice }) => {
  const filters = [];

  if (discont === "true") {
    filters.push({
      discont_price: {
        [Op.ne]: null,
      },
    });
  }

  if (discont === "false") {
    filters.push({
      discont_price: null,
    });
  }

  if (minPrice && !Number.isNaN(Number(minPrice))) {
    filters.push(
      where(fn("COALESCE", col("discont_price"), col("price")), {
        [Op.gte]: Number(minPrice),
      })
    );
  }

  if (maxPrice && !Number.isNaN(Number(maxPrice))) {
    filters.push(
      where(fn("COALESCE", col("discont_price"), col("price")), {
        [Op.lte]: Number(maxPrice),
      })
    );
  }

  return filters;
};
