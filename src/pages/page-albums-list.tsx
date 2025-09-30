import Button from "../components/button";
import Card from "../components/card";
import Container from "../components/container";
import Skeleton from "../components/skeleton";
import Text from "../components/text";
import ConfirmationDialog from "../components/confirmation-dialog";
import useAlbum from "../contexts/albums/hooks/use-album";
import useAlbums from "../contexts/albums/hooks/use-albums";

export default function PageAlbumsList() {
  const { albums, isLoadingAlbums } = useAlbums();
  const { deleteAlbum } = useAlbum();

  async function handleDeleteAlbum(albumId: string) {
    await deleteAlbum(albumId);
  }

  return (
    <Container>
      <header className="flex items-center justify-between gap-8 mb-8">
        <Text as="h2" variant="heading-large">
          Lista de Álbuns
        </Text>
      </header>

      <div className="flex flex-col gap-3">
        {!isLoadingAlbums
          ? albums.map((album) => (
              <Card
                key={album.id}
                className="p-2 cursor-pointer flex flex-row justify-between items-center"
              >
                <Text variant="label-medium">{album.title}</Text>
                <ConfirmationDialog
                  trigger={<Button variant="destructive">Excluir Álbum</Button>}
                  tittle="Exclusão"
                  content="Tem certeza que deseja excluir esse álbum? As fotos vinculadas à ele ficarão sem álbum"
                  onConfirm={() => handleDeleteAlbum(album.id)}
                />
              </Card>
            ))
          : Array.from({ length: 5 }).map((_, index) => (
              <Skeleton
                className="h-14"
                key={`album-button-loading-${index}`}
              />
            ))}
      </div>
    </Container>
  );
}
