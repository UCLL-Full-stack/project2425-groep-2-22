import React from "react";
import { Post } from "@/types";
import classNames from "classnames";

type Props = {
  posts: Array<Post>;
};

const PostOverviewTable: React.FC<Props> = ({ posts }: Props) => {
  const sortedPosts = posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="space-y-6">
      {sortedPosts && sortedPosts.length > 0 ? (
        sortedPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-lg rounded-lg p-8 border border-blue-300 hover:shadow-2xl transition-shadow duration-200 w-[60%] mx-auto"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold text-blue-600">{post.title}</h2>
              </div>
              <span className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</span>
            </div>
            <p className="mt-4 text-lg text-gray-700">{post.description}</p>
            <div className="flex justify-between items-center mt-6">
              <div className="text-sm text-gray-500">By {post.user.username}</div>
              <div className="flex items-center">
                <span className="text-xs font-medium text-gray-700">Rating: </span>
                <span className="ml-2 text-lg font-semibold text-yellow-500">{post.rating}</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500">No posts available.</div>
      )}
    </div>
  );
};

export default PostOverviewTable;
