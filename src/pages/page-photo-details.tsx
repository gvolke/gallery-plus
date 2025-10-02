import React from "react";
import { useParams } from "react-router";
import Text from "../components/text";
import Container from "../components/container";
import Skeleton from "../components/skeleton";
import ConfirmationDialog from "../components/confirmation-dialog";
import PhotosNavigator from "../contexts/photos/components/photos-navigator";
import ImagePreview from "../components/image-preview";
import Button from "../components/button";
import AlbumsListSelectable from "../contexts/albums/components/albums-list-selectable";
import useAlbums from "../contexts/albums/hooks/use-albums";
import usePhoto from "../contexts/photos/hooks/use-photo";
import type { Photo } from "../contexts/photos/models/photo";
import InputText from "../components/input-text";
import Icon from "../components/icon";
import EditIcon from "../assets/icons/edit.svg?react";
import CheckIcon from "../assets/icons/check.svg?react";

export default function PagePhotoDetails() {
  const { id } = useParams();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const {
    photo,
    previousPhotoId,
    nextPhotoId,
    isLoadingPhoto,
    deletePhoto,
    updatePhoto,
  } = usePhoto(id);
  const { albums, isLoadingAlbums } = useAlbums();
  const [isEditing, setIsEditing] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  async function handleDeletePhoto() {
    await deletePhoto(photo!.id);
  }

  function handleSetIsEditing() {
    setInputValue(photo!.title);
    setIsEditing((prev) => !prev);
  }

  function handleEditPhotoTitle() {
    updatePhoto(photo!.id, inputValue ? inputValue : "");
    handleSetIsEditing();
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    setInputValue(value);
  }

  React.useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  if (!isLoadingPhoto && !photo) {
    return <div>Foto não encontrada</div>;
  }

  return (
    <Container>
      <header className="flex items-center justify-between gap-8 mb-8">
        {!isLoadingPhoto ? (
          <div className="flex gap-3 items-center w-[21rem]">
            {isEditing ? (
              <>
                <InputText
                  value={inputValue}
                  className="flex-1"
                  onChange={handleInputChange}
                  ref={inputRef}
                />

                <Icon
                  svg={CheckIcon}
                  className="fill-accent-brand cursor-pointer hover:fill-accent-brand-light"
                  onClick={handleEditPhotoTitle}
                />
              </>
            ) : (
              <>
                <Text as="h2" variant="heading-large">
                  {photo?.title}
                </Text>

                <Icon
                  svg={EditIcon}
                  className="fill-accent-brand cursor-pointer hover:fill-accent-brand-light"
                  onClick={handleSetIsEditing}
                />
              </>
            )}
          </div>
        ) : (
          <Skeleton className="w-48 h-8" />
        )}

        <PhotosNavigator
          loading={isLoadingPhoto}
          previousPhotoId={previousPhotoId}
          nextPhotoId={nextPhotoId}
        />
      </header>

      <div className="grid grid-cols-[21rem_1fr] gap-24">
        <div className="space-y-3">
          {!isLoadingPhoto ? (
            <ImagePreview
              src={`${import.meta.env.VITE_IMAGES_URL}/${photo?.imageId}`}
              title={photo?.title}
              imageClassName="h-[21rem]"
            />
          ) : (
            <Skeleton className="h-[21rem]" />
          )}

          {!isLoadingPhoto ? (
            <ConfirmationDialog
              trigger={<Button variant="destructive">Excluir</Button>}
              tittle="Exclusão"
              content="Tem certeza que deseja excluir esta foto?"
              onConfirm={handleDeletePhoto}
            />
          ) : (
            <Skeleton className="w-20 h-10" />
          )}
        </div>

        <div className="py-3">
          <Text as="h3" variant="heading-medium" className="mb-6">
            Álbuns
          </Text>

          <AlbumsListSelectable
            photo={photo as Photo}
            loading={isLoadingAlbums}
            albums={albums}
          />
        </div>
      </div>
    </Container>
  );
}
