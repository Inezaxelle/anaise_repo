const db = require("../models/index");

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API endpoints for managing books
 */

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               author:
 *                 type: string
 *               publisher:
 *                 type: string
 *               publicationYear:
 *                 type: integer
 *               subject:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book created successfully
 *       500:
 *         description: Error in creating book
 */
const createBook = async (req, res) => {
  try {
    const { name, author, publisher, publicationYear, subject } = req.body;

    const newBook = await db.Book.create({
      name,
      author,
      publisher,
      publicationYear,
      subject,
    });

    return res.status(200).json({ message: "Book created successfully", book: newBook });
  } catch (error) {
    console.error("Error in creating new book: ", error);
    return res.status(500).json({ error: "Error in creating book" });
  }
};


/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination (default is 1)
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         description: Number of items per page (default is 10)
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         description: Search term to filter books by name
 *     responses:
 *       200:
 *         description: List of books
 *       500:
 *         description: Error in retrieving books
 */

const getAllBooks = async (req, res) => {
  try {
    const { page, pageSize, searchTerm } = req.query;
    const pageNumber = parseInt(page, 10) || 1;
    const limit = parseInt(pageSize, 10) || 10;
    const offset = (pageNumber - 1) * limit;

    let whereClause = {};
    if (searchTerm) {
      whereClause = {
        name: {
          [db.Sequelize.Op.iLike]: `%${searchTerm}%`, // Case-insensitive partial match
        },
      };
    }

    const { count, rows } = await db.Book.findAndCountAll({
      where: whereClause,
      limit,
      offset,
    });

    const totalPages = Math.ceil(count / limit);

    return res.status(200).json({
      books: rows,
      totalPages,
      currentPage: pageNumber,
      pageSize: limit,
      totalBooks: count,
    });
  } catch (error) {
    console.error("Error in retrieving books:", error);
    return res.status(500).json({ error: "Error in retrieving books" });
  }
};

module.exports = { createBook, getAllBooks };