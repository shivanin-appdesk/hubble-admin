import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../Components/dataTable/DataTable";
import "./Users.scss";
import { useEffect, useState } from "react";
import Add from "../../Components/add/Add";
import { GridCellParams } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import type {} from "@mui/x-data-grid/themeAugmentation";


import axios from "axios";

export type UserData = {
  _id: string;
  id: number;
  email: string;
  userType: string;
  phoneNumber: string;
  userName: string;
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



const columns: GridColDef[] = [
  {
    field: "_id",
    headerName: "ID",
    width: 90,
  },

  {
    field: "email",
    type: "string",
    headerName: "Email",
    width: 150,
  },
  {
    field: "userName",
    headerName: "User Name",
    width: 200,
    type: "string",
  },

  {
    field: "userType",
    type: "string",
    headerName: "User Type",
    width: 150,
  },

  {
    field: "profilePictureKey",
    type: "img",
    headerName: "Profile Photo",
    width: 150,
    renderCell: (params) => <ImageCell {...params} />,
  },
];

const getPresignedUrl = async (profilePictureKey: string) => {
  try {
    // Replace "YOUR_BACKEND_ENDPOINT" with the actual endpoint for fetching pre-signed URLs
    const response = await axios.get(
      `YOUR_BACKEND_ENDPOINT/getPresignedUrl/${profilePictureKey}`
    );
    return response.data.url;
  } catch (error) {
    console.error("Error fetching pre-signed URL:", error);
    // Return a placeholder image if there's an error fetching the URL
    return "/noavatar.png";
  }
};


const theme = createTheme({
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          fontSize: "0.950rem",
          fontFamily: "pacifico",
        },
      },
    },
  },
});










const Users = () => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<UserData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://ifjzxfgqj6.us-east-1.awsapprunner.com/admin/users",
          { timeout: 10000 }
        );
        console.log("API Response:", response);

        const responseData = Array.isArray(response.data) ? response.data : [];
        const usersWithUniqueId = responseData.map(
          (user: UserData, index: number) => ({ ...user, id: index + 1 })
        );

        setUsers(usersWithUniqueId);
      } catch (error: any) {
        console.error(
          "Error fetching data:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="users">
        <div className="info">
          <h1>Users</h1>
          {/* <button onClick={() => setOpen(true)}>Add New User</button> */}
        </div>
        <DataTable slug="users" columns={columns} rows={users} />

        {open && <Add slug="user" columns={columns} setOpen={setOpen} />}
      </div>
    </ThemeProvider>
  );
};

export default Users;
