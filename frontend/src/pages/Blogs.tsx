import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";
import { useLocation } from "react-router-dom";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();
  const location = useLocation();
  if (loading) {
    return <div>
      <Appbar iconName={location.state.name} />
      <div className="flex justify-center">
        <div>
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
        </div>
      </div>
    </div>
  }

  return <div>
    <Appbar iconName={location.state.name} />
    <div className="flex justify-center">
      <div>
        {blogs.map(blog => <BlogCard
          id={blog.id}
          authorName={blog.author.name || "Anonymous"}
          title={blog.title}
          content={blog.content}
          publishedDate={"2nd Feb 2024"}
        />)}
      </div>
    </div>
  </div>
}
