import { User } from "../types/db";

type UserAvatarProps = {
  className?: string;
  user?: User;
  useName?: string;
  avatarImageUrl?: string;
} 

export default function (props: UserAvatarProps) {
  const useName = props.useName || props.user?.name || props.user?.twitter || "😊";
  const placeholderUrl = `https://ui-avatars.com/api/?background=random&bold=true&name=${useName.replaceAll(
    " ",
    "+"
  )}`;

  const imageUrl = props.avatarImageUrl || props.user?.avatarImageUrl || placeholderUrl;

  return <img src={imageUrl} className={props.className} />;
}
