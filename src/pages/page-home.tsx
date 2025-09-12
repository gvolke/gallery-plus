import Container from "../components/container";
import AlbumsFilter from "../contexts/albums/components/albums-filter";
import PhotosList from "../contexts/photos/components/photos-list";

export default function PageHome() {
  return (
    <Container>
      <AlbumsFilter
        albums={[
          { id: "321", title: "Gatos" },
          { id: "3214", title: "Paisagens" },
          { id: "3215", title: "Favoritas" },
        ]}
        className="mb-9"
      />

      <PhotosList
        photos={[
          {
            id: "123",
            title: "Olá Mundo",
            imageId: "/images/portrait-tower.png",
            albums: [
              { id: "321", title: "Album 1" },
              { id: "3214", title: "Album 2" },
              { id: "3215", title: "Album 3" },
            ],
          },
          {
            id: "132",
            title: "Olá Mundo",
            imageId: "/images/portrait-tower.png",
            albums: [
              { id: "321", title: "Album 1" },
              { id: "3214", title: "Album 2" },
              { id: "3215", title: "Album 3" },
            ],
          },
        ]}
      />
    </Container>
  );
}
