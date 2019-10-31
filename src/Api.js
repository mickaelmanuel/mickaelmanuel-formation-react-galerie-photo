import ky from "ky";

const RAMDOM_PICUTRE_URL = "https://source.unsplash.com//collection/[collection]/200x200/?sig=[number]";

const RAMDOM_COLLECTION = [
  { idCollection: 1127807, maxNumber: 213 },
  { idCollection: 3694365, maxNumber: 702 },
  { idCollection: 162326, maxNumber: 202 },
  { idCollection: 404339, maxNumber: 325 },
  { idCollection: 1708734, maxNumber: 504 },
  { idCollection: 141077, maxNumber: 248 },
  { idCollection: 1248080, maxNumber: 140 },
  { idCollection: 1227291, maxNumber: 265 },
  { idCollection: 1901880, maxNumber: 476 },
  { idCollection: 531563, maxNumber: 168 },
  { idCollection: 1118894, maxNumber: 60 },
  { idCollection: 388793, maxNumber: 444 },
  { idCollection: 4961056, maxNumber: 105 },
  { idCollection: 3150958, maxNumber: 2000 },
  { idCollection: 1103088, maxNumber: 219 },
  { idCollection: 235549, maxNumber: 216 },
  { idCollection: 8052237, maxNumber: 253 },
  { idCollection: 1426076, maxNumber: 100 }
];

const fetcher = ky.extend({
  prefixUrl: "https://jsonplaceholder.typicode.com"
});

export const Api = {
  getUsers: async () => {
    return await fetcher.get("users").json();
  },
  getAlbums: async idUser => {
    const res = await fetcher.get(`albums?userId=${idUser}`);
    const data = await res.json();
    data.forEach(element => {
      const ramdom = Math.floor(Math.random() * RAMDOM_COLLECTION.length);
      const collection = RAMDOM_COLLECTION[ramdom];
      const sigNumber = Math.floor(Math.random() * collection.maxNumber) + 1;
      element.url = RAMDOM_PICUTRE_URL.replace("[collection]", collection.idCollection).replace("[number]", sigNumber);
      element.collection = collection.idCollection;
    });
    return data;
  },
  getAlbum: async idAlbum => {
    const res = fetcher.get(`albums/${idAlbum}`);
    const data = await res.json();
    return data;
  },
  getPhotos: async idAlbum => {
    const res = fetcher.get(`photos?albumId=${idAlbum}`);
    const data = await res.json();
    return data;
  }
};
