import React, { useEffect, useState } from "react";
import axios from "axios";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../Components/dataTable/DataTable";
import Add from "../../Components/add/Add";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import moment from "moment";
import type {} from "@mui/x-data-grid/themeAugmentation";

export type BookingData = {
  _id: string;
  id: number;
  bookingNumber: string;
  totalAmount: number;
  userName: string;
  artistName: string;
  bookingStartTime: string;
  bookingEndTime: string;
  bookingStatus: string;
};

const bookingColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "bookingNumber",
    type: "string",
    headerName: "Booking Number",
    headerClassName: "super-app-theme--header",
    width: 150,
  },
  {
    field: "totalAmount",
    type: "number",
    headerName: "Total Amount",
    headerClassName: "header",
    width: 150,
  },
  {
    field: "userName",
    type: "string",
    headerName: "User Name",
    headerClassName: "header",
    width: 150,
  },
  {
    field: "artistName",
    type: "string",
    headerName: "Artist Name",
    headerClassName: "header",
    width: 150,
  },
  {
    field: "bookingStartTime",
    headerName: "Booking Start Time",
    headerClassName: "header",
    width: 205,
    type: "string",
  },
  {
    field: "bookingEndTime",
    headerName: "Booking End Time",
    headerClassName: "header",
    width: 150,
    type: "string",
  },

  {
    field: "bookingStatus",
    headerName: "booking  Status",
    headerClassName: "header",
    width: 150,
    type: "string",
  },
];




const theme = createTheme({
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          fontSize: "0.950rem",
          fontFamily:"pacifico"
          
        },
        
      },
    },
  },
});



const Products = () => {
  const [open, setOpen] = useState(false);
  const [bookings, setBookings] = useState<BookingData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://ifjzxfgqj6.us-east-1.awsapprunner.com/admin/bookings",
          { timeout: 10000 }
        );
        console.log("API Response (Bookings):", response);

        const responseData = Array.isArray(response.data) ? response.data : [];
        const bookingsWithUniqueId = responseData.map((booking, index) => ({
          _id: booking._id,
          id: index + 1,
          bookingNumber: booking.bookingNumber,
          totalAmount: booking.totalAmount,
          userName: booking.userName,
          artistName: booking.artistName,
          bookingStartTime: moment(booking.bookingStartTime).format(
            "YYYY-MM-DD HH:mm:ss"
          ),
          bookingEndTime: moment(booking.bookingEndTime).format(
            "YYYY-MM-DD HH:mm:ss"
          ),
          bookingStatus: booking.bookingStatus,
        }));

        setBookings(bookingsWithUniqueId);
      } catch (error: any) {
        console.error(
          "Error fetching bookings data:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="products">
        <div className="info">
          <h1>Bookings</h1>
          {/* <button onClick={() => setOpen(true)}>Add New Booking</button> */}
        </div>
        <DataTable slug="bookings" columns={bookingColumns} rows={bookings} />
        {open && (
          <Add slug="booking" columns={bookingColumns} setOpen={setOpen} />
        )}
      </div>
    </ThemeProvider>
  );
};

export default Products;
