import React from "react";
import { Api } from "./Api";
import { LazyImage } from "./components/LazyImage";

function App() {
  const [users, setUsers] = React.useState(null);
  const [usersLoading, setUsersLoading] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState("unknow");
  const [selectedMenu, setSelectedMenu] = React.useState("albums");
  const [albums, setAlbums] = React.useState(null);
  const [albumsLoading, setAlbumsLoading] = React.useState(false);
  const [selectedAlbum, setSelectedAlbum] = React.useState(null);
  const [photosLoading, setPhotosLoading] = React.useState(false);
  const [photos, setPhotos] = React.useState(null);

  React.useEffect(() => {
    setUsersLoading(true);
    let canceled = false;
    Api.getUsers().then(users => {
      if (canceled === false) {
        setUsers(users);
        setUsersLoading(false);
      }
    });
    return () => {
      canceled = true;
    };
  }, []);

  React.useEffect(() => {
    setAlbumsLoading(true);
    let canceled = false;
    Api.getAlbums(selectedUser).then(albums => {
      if (canceled === false) {
        setAlbums(albums);
        setAlbumsLoading(false);
      }
    });
    return () => {
      canceled = true;
    };
  }, [selectedUser]);

  React.useEffect(() => {
    setPhotosLoading(true);
    let canceled = false;
    console.log(selectedAlbum);
    Api.getPhotos(selectedAlbum).then(photos => {
      if (canceled === false) {
        setPhotos(photos);
        setPhotosLoading(false);
      }
    });
    return () => {
      canceled = true;
    };
  }, [selectedAlbum, selectedUser]);

  return (
    <div className="wrapper">
      <header>
        <h1>Photos</h1>
        {(() => {
          if (usersLoading) return <p>Loading users</p>;

          if (users === null) return <p>No Data</p>;

          return (
            <select
              value={selectedUser}
              onChange={e => {
                setSelectedUser(e.target.value);
              }}
            >
              {[{ id: "unkown", username: "Select an user" }, ...users].map(user => {
                return (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
                );
              })}
            </select>
          );
        })()}
      </header>
      <main>
        <div className="left-menu">
          <ul>
            <li
              className={selectedMenu === "albums" ? "selected" : ""}
              onClick={() => {
                setSelectedMenu("albums");
              }}
            >
              Albums
            </li>
            <li
              className={selectedMenu === "photos" ? "selected" : ""}
              onClick={() => {
                setSelectedMenu("photos");
              }}
            >
              Photos
            </li>
          </ul>
        </div>
        <div className="content">
          <div className="content-flex">
            {(() => {
              if (selectedMenu === "albums") {
                if (albumsLoading) return <p>Loading albums</p>;

                if (albumsLoading === null) return <p>No data for albums</p>;

                return (
                  albums &&
                  albums.map(album => {
                    return (
                      <div
                        className="card"
                        key={album.id}
                        onClick={() => {
                          setSelectedMenu("photos");
                          setSelectedAlbum(album.id);
                        }}
                      >
                        <LazyImage src={album.url} alt="" />
                        <div className="card-container">
                          <h4>{album.title}</h4>
                        </div>
                      </div>
                    );
                  })
                );
              }

              if (selectedMenu === "photos") {
                if (photosLoading) return <p>Loading photos</p>;

                if (photosLoading === null) return <p>No data for photos</p>;

                return (
                  photos &&
                  photos.map(photo => {
                    return (
                      <div className="card" key={photo.id}>
                        <LazyImage src={photo.thumbnailUrl} alt="" />
                        <div className="card-container">
                          <h4>{photo.title}</h4>
                        </div>
                      </div>
                    );
                  })
                );
              }

              return "unknow";
            })()}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
