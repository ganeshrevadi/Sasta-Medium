import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";
import { useRecoilValue } from "recoil";
import { nameAtom } from "../store/atoms/nameAtom";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();
  const username = useRecoilValue(nameAtom)
  if (loading) {
    return <div>
      <Appbar iconName={username} />
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
    <Appbar iconName={username} />
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
