import React, { useEffect, useState } from "react";
import axios from "axios";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../Components/dataTable/DataTable";
import Add from "../../Components/add/Add";
import './Artist.scss';
import { GridCellParams } from "@mui/x-data-grid";

export type ArtistData = {
  _id: string;
  id: number;
  email: string;
  userName: string;
  userType: string;
  profilePictureKey: string;
  numberOfBooking: string;
  rating: string;
};

const ImageCell = (params: GridCellParams) => {
  const [imgUrl, setImgUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const url = await getPresignedUrl(params.row.profilePictureKey);
        setImgUrl(url);
      } catch (error) {
        console.error("Error fetching URL:", error);
        setImgUrl("/noavatar.png");
      }
    };

    fetchUrl();
  }, [params.row.profilePictureKey]);

  return <img src={imgUrl || "/loading.png"} alt="" />;
};



const ArtistColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "email",
    type: "string",
    headerName: "Email",
    width: 150,
  },
  {
    field: "userName",
    type: "string",
    headerName: "User Name",
    width: 150,
  },
  {
    field: "userType",
    type: "string",
    headerName: "User Type",
    width: 150,
  },
  {
    field: "profilePictureKey",
    headerName: "Profile Photo",
    width: 150,
    type: "img",
     renderCell:(params) => <ImageCell {...params} />,
  },
  {
    field: "numberOfBooking",
    headerName: "Number of Bookings",
    width: 150,
    type: "string",
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 150,
    type: "string",
  },
];

const getPresignedUrl = async (profilePictureKey: string) => {
  try {
    // Replace "YOUR_BACKEND_ENDPOINT" with the actual endpoint for fetching pre-signed URLs
    const response = await axios.get(`YOUR_BACKEND_ENDPOINT/getPresignedUrl/${profilePictureKey}`);
    return response.data.url;
  } catch (error) {
    console.error("Error fetching pre-signed URL:", error);
    // Return a placeholder image if there's an error fetching the URL
    return "/noavatar.png";
  }
};

const Artist = () => {
  const [open, setOpen] = useState(false);
  const [Artist, setArtist] = useState<ArtistData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://ifjzxfgqj6.us-east-1.awsapprunner.com/admin/artists", { timeout: 10000 });
        console.log("API Response (Artist):", response);

        const responseData = Array.isArray(response.data) ? response.data : [];
        const ArtistWithUniqueId = responseData.map((artist, index) => ({
          _id: artist._id,
          id: index + 1,
          email: artist.email,
          userName: artist.userName,
          userType: artist.userType,
          profilePictureKey: artist.profilePictureKey,
          numberOfBooking: artist.numberOfBooking,
          rating: artist.rating,
        }));

        setArtist(ArtistWithUniqueId);
      } catch (error: any) {
        console.error("Error fetching artists data:", error.response ? error.response.data : error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="artist">
      <div className="info">
        <h1>Artists</h1>
        {/* <button onClick={() => setOpen(true)}>Add New Artist</button> */}
      </div>
      <DataTable slug="artist" columns={ArtistColumns} rows={Artist} />
      {open && <Add slug="artist" columns={ArtistColumns} setOpen={setOpen} />}
    </div>
  );
};

export default Artist;
