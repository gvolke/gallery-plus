import Button from "../../../components/button";
import Skeleton from "../../../components/skeleton";
import Text from "../../../components/text";
import type { Album } from "../models/album";
import cx from "classnames";

interface AlbumFilterProps extends React.ComponentProps<"div"> {
  albums: Album[];
  loading?: boolean;
}

export default function AlbumsFilter({
  albums,
  loading,
  className,
  ...props
}: AlbumFilterProps) {
  return (
    <div
      className={cx("flex items-center gap-3.5 overflow-x-auto", className)}
      {...props}
    >
      <Text variant="heading-small">Álbuns</Text>
      <div className="flex gap-3">
        {!loading ? (
          <>
            <Button variant="ghost" size="sm" className="cursor-pointer">
              Todos
            </Button>
            {albums.map((album) => (
              <Button
                key={album.id}
                variant="ghost"
                size="sm"
                className="cursor-pointer"
              >
                {album.title}
              </Button>
            ))}
          </>
        ) : (
          Array.from({ length: 5 }).map((_, index) => (
            <Skeleton
              className="w-28 h-7"
              key={`album-button-loading-${index}`}
            />
          ))
        )}
      </div>
    </div>
  );
}
