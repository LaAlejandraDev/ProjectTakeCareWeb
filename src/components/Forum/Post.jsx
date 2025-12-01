import {
  ChatBubbleBottomCenterIcon,
  EyeIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";
import Avatar from "../Avatar";
import Badge from "../Badge";
import StylizerText from "../../helpers/StylizedText";

import { useNavigate } from "react-router-dom";
import CommentBox from "./CommentBox";

export default function Post({
  id,
  title,
  content,
  author,
  avatar,
  date,
  comments,
  likes,
  userRole,
  postType,
  expanded = false,
  actions = true,
  userData
}) {
  const navigate = useNavigate();

  const badgeType = () => {
    if (postType == 0) {
      return "badge-secondary badge-outline";
    } else if (postType == 1) {
      return "badge-info badge-outline";
    } else {
      ("badge-neutral badge-outline");
    }
  };

  const badgeTitle = () => {
    if (postType == 0) {
      return "Mensaje";
    } else if (postType == 1) {
      return "Pregunta";
    } else {
      return "General";
    }
  };

  const viewPost = () => {
    navigate(`/index/forum/post/${id}`);
  };

  return (
    <>
      <div className="card w-full bg-base-100 shadow-sm my-2">
        <div className="card-body">
          <h2 className="card-badgeTitle text-2xl font-bold text-indigo-950">
            {title.toUpperCase()}
          </h2>
          <div className="my-2 flex gap-2 p-2 rounded shadow-sm items-center">
            <Avatar name={author} url={avatar}/>
            <div>
              <p className="font-bold">{author}</p>
              <small className="text-gray-400">{date}</small>
            </div>
            <div className="aling-1.5em ml-auto flex gap-2">
              <Badge text={badgeTitle()} type={badgeType()} />
              <Badge text={userRole} type={"badge-accent"} />
            </div>
          </div>
          <StylizerText text={content} expanded={expanded} />
          {!expanded ? (
            actions ? (
              <div className="card-actions justify-end gap-x-8 mt-4">
                <div className="indicator">
                  <button className="btn btn-outline">
                    <HeartIcon className="size-[1.5em]" />
                    Like
                  </button>
                  {likes > 0 && (
                    <span className="indicator-item badge badge-sm badge-secondary">
                      {likes > 99 ? "99+" : likes}
                    </span>
                  )}
                </div>
                <div className="indicator">
                  <button className="btn btn-neutral">
                    <ChatBubbleBottomCenterIcon className="size-[1.5em]" />
                    Comentar
                    {comments > 0 && (
                      <span className="indicator-item badge badge-sm badge-info">
                        {comments > 99 ? "99+" : comments}
                      </span>
                    )}
                  </button>
                </div>
                <button className="btn btn-primary" onClick={viewPost}>
                  <EyeIcon className="size-[1.5em]" />
                  Ver Post
                </button>
              </div>
            ) : null
          ) : (
            actions ?
              <CommentBox /> : null
          )}
        </div>
      </div>
    </>
  );
}
