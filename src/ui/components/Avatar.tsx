interface AvatarProps {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Avatar = ({
  src,
  alt = "Avatar",
  size = "md",
  className = "",
}: AvatarProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  return (
    <div
      className={`${sizeClasses[size]} ${className} rounded-full overflow-hidden bg-gray-200 shrink-0`}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-primary-500 text-white font-semibold text-sm">
          {alt.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
};
