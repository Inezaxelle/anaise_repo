import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BookInventory = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/books', {
        headers: {
          "Authorization" : `Bearer ${localStorage.getItem("token")}`
        }
      });
      setBooks(response.data.books);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredBooks = useMemo(() => {
    return books.filter(book =>
      book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.publisher.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [books, searchQuery]);

  const subset = useMemo(() => {
    return filteredBooks.slice(startIndex, endIndex);
  }, [filteredBooks, startIndex, endIndex]);

  useEffect(() => {
    setTotalPages(Math.ceil(filteredBooks.length / itemsPerPage));
  }, [filteredBooks]);

  const prevPageHandler = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const nextPageHandler = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const numbers = [...Array(totalPages + 1).keys()].slice(1);

  return (
    <div className="container mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#243c5a]">Book Inventory</h1>
        <input
          type="text"
          placeholder="Search book name"
          className="border rounded-md p-3 focus:outline-none h-11 text-sm w-60"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {filteredBooks.length > 0 ? (
        <>
          <table className="table-auto w-full border border-gray-300 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-[#243c5a]">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Author</th>
                <th className="px-4 py-2">Publisher</th>
                <th className="px-4 py-2">Publication Year</th>
                <th className="px-4 py-2">Subject</th>
              </tr>
            </thead>
            <tbody>
              {subset.map((book, index) => (
                <tr key={book.id} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                  <td className="border px-4 py-2">{book.id}</td>
                  <td className="border px-4 py-2">{book.name}</td>
                  <td className="border px-4 py-2">{book.author}</td>
                  <td className="border px-4 py-2">{book.publisher}</td>
                  <td className="border px-4 py-2">{book.publicationYear}</td>
                  <td className="border px-4 py-2">{book.subject}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
            <button
              className={`bg-[#243c5a] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${currentPage === 1 ? 'invisible' : 'visible'}`}
              onClick={prevPageHandler}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <div className="flex space-x-2">
              {numbers.map((number) => (
                <span
                  key={number}
                  onClick={() => setCurrentPage(number)}
                  className={`cursor-pointer px-3 py-1 rounded-full ${currentPage === number ? 'bg-[#243c5a] text-white' : 'bg-gray-200 text-[blue-500]'}`}
                >
                  {number}
                </span>
              ))}
            </div>
            <button
              className={`bg-[#243c5a] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${currentPage === totalPages ? 'invisible' : 'visible'}`}
              onClick={nextPageHandler}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div className="text-center text-red-500 font-bold mt-10">
          No books found with the specified details.
        </div>
      )}
    </div>
  );
};

export default BookInventory;
