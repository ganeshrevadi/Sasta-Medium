import { Appbar } from "../components/Appbar";
import { FullBlog } from "../components/FullBlog";
import { Spinner } from "../components/Spinner";
import { useBlog } from "../hooks";
import { useParams, useLocation } from "react-router-dom";

// atomFamilies/selectorFamilies
export const Blog = () => {
  const { id } = useParams();
  const location = useLocation()
  const { loading, blog } = useBlog({
    id: id || ""
  });

  if (loading || !blog) {
    return <div>
      <Appbar iconName={location.state.name}/>

      <div className="h-screen flex flex-col justify-center">

        <div className="flex justify-center">
          <Spinner />
        </div>
      </div>
    </div>
  }
  return <div>
    <FullBlog blog={blog} />
  </div>
}
