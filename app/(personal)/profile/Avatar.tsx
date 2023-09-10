type AvatarProps = {
  avatar_url: string;
};

export default function Avatar({ avatar_url }: AvatarProps) {
  return (
    <div className={`w-32 h-32 rounded-full overflow-hidden relative`}>
      <img src={avatar_url} alt='Profile' />
    </div>
  );
}
