import { Appbar } from "../components/Appbar";
import { FullBlog } from "../components/FullBlog";
import { Spinner } from "../components/Spinner";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { nameAtom } from "../store/atoms/nameAtom";

// atomFamilies/selectorFamilies
export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({
    id: id || ""
  });

  const username = useRecoilValue(nameAtom)

  if (loading || !blog) {
    return <div>
      <Appbar iconName={username} />

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
