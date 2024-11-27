import SingleComment from "../SingleComment/SingleComment";

const Comments = () => {
  return (
    <div className="flex flex-col justify-start gap-5">
      <SingleComment />

      <SingleComment />

      <SingleComment />
    </div>
  );
};

export default Comments;
