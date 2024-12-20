import React, { useState } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import { StatusMessage } from "../../types";
import PostService from "../../services/PostService";

const AddPostForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState<number | "">("");
  const [titleError, setTitleError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [ratingError, setRatingError] = useState<string | null>(null);
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const router = useRouter();

  const clearErrors = () => {
    setTitleError(null);
    setDescriptionError(null);
    setRatingError(null);
    setStatusMessages([]);
  };

  const validate = (): boolean => {
    let result = true;

    if (!title || title.trim() === "") {
      setTitleError("Title is required");
      result = false;
    }
    if (!description || description.trim() === "") {
      setDescriptionError("Description is required");
      result = false;
    }
    if (!rating || rating < 0 || rating>5) {
      setRatingError("Rating must be a positive number between 0 and 5");
      result = false;
    }
    return result;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearErrors();
    if (!validate()) {
      return;
    }
    const loggedInUser = localStorage.getItem("loggedInUser");
    const loggedInUserId = loggedInUser ? JSON.parse(loggedInUser).id : null;
    const postData = {
      title,
      description,
      rating: Number(rating),
      user: { id: loggedInUserId },
    };
    const response = await PostService.createPost(postData);
    if (response.ok) {
      setStatusMessages([
        {
          message: "Post created successfully!",
          type: "success",
        },
      ]);
      setTimeout(() => {
        router.push("/post");
      }, 2000);
    } else {
      setStatusMessages([
        {
          message: "Failed to create post",
          type: "error",
        },
      ]);
    }
  };

  const handleCancel = () => {
    router.push("/post");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg border border-gray-200 mt-20">
      <h3 className="text-lg font-semibold mb-4 text-center">Add Post</h3>
      <button
        onClick={handleCancel}
        className="absolute top-10 right-10 text-xl text-red-500 hover:text-red-800"
      >
        X
      </button>

      {statusMessages && (
        <ul className="mb-4">
          {statusMessages.map(({ message, type }, index) => (
            <li
              key={index}
              className={classNames(
                "text-sm",
                type === "error" ? "text-red-600" : "text-green-600"
              )}
            >
              {message}
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="titleInput" className="block text-sm font-medium mb-1">
            Title:
          </label>
          <input
            id="titleInput"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm"
          />
          {titleError && <div className="text-red-600 text-sm mt-1">{titleError}</div>}
        </div>

        <div className="mb-4">
          <label
            htmlFor="descriptionInput"
            className="block text-sm font-medium mb-1"
          >
            Description:
          </label>
          <textarea
            id="descriptionInput"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm"
            rows={4}
          />
          {descriptionError && (
            <div className="text-red-600 text-sm mt-1">{descriptionError}</div>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="ratingInput"
            className="block text-sm font-medium mb-1"
          >
            Rating:
          </label>
          <input
            id="ratingInput"
            type="number"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm"
          />
          {ratingError && (
            <div className="text-red-600 text-sm mt-1">{ratingError}</div>
          )}
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Add Post
        </button>
      </form>
    </div>
  );
};

export default AddPostForm;
