import { User } from "../types/db";

interface IProps {
  user: User;
  className?: string;
}

export default function (props: IProps) {
  const placeholderUrl = `https://ui-avatars.com/api/?background=random&bold=true&name=${props.user.name.replaceAll(
    " ",
    "+"
  )}`;

  const imageUrl = props.user.avatarImageUrl || placeholderUrl;

  return <img src={imageUrl} className={props.className} />;
}
