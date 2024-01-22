import React, { useEffect, useState } from "react";
import CardComponent from "../Cards/Card";
import axios from "axios";
import "./Card.scss";

interface BookingDetails {
  bookingId: string;
  bookingNumber: string;
  serviceFee: number;
  depositeAmount: number;
  taxAmount: number;
  hubbleFee: number;
  paidToday: number;
  remainingAmount: number;
  totalAmount: number;
  negotiationAmount?: number;
  negotiationNote?: string;
  isNegotiated: boolean;
  createdAt: string;
  updatedAt: string;
  bookingStartTime: string;
  bookingEndTime: string;
  email: string;
  phoneNumber: string;
  bookingDetails: string;
}

interface ServiceDetails {
  artistId: string;
  serviceId: string;
  serviceName: string;
  rate: string;
  price: number;
  aboutUs: string;
  details: string;
  isActive: boolean;
}

interface UserDetails {
  userId: string;
  userType: string;
  userName: string;
  firstName: string;
  lastName: string;
  showLastName: boolean;

  primaryLocation: {
    type: string;
    address: string;
    coordinates: number[];
  };
  profilePictureKey: string;
  rating: number;
  price: number;
  createdAt: string;
  updatedAt: string;
  isSaved: boolean;
  about: string;
}

interface ApiResponse {
  id: string;
  bookingDetails: BookingDetails;
  serviceDetails: ServiceDetails;
  userDetails: UserDetails;
}

interface CardListProps {
  data: ApiResponse[];
}

const dummyBookingDetails: BookingDetails = {
  bookingId: "879u645454gu5i6i",
  bookingNumber: "HUB-78515993",
  serviceFee: 156266.67,
  depositeAmount: 39066.67,
  taxAmount: 9766.67,
  hubbleFee: 15626.67,
  paidToday: 64460.01,
  remainingAmount: 117200,
  totalAmount: 181660.01,
  negotiationAmount: undefined,
  negotiationNote: undefined,
  isNegotiated: false,
  createdAt: "2024-01-18T07:14:46.420Z",
  updatedAt: "2024-01-18T07:14:46.420Z",
  bookingStartTime: "2024-01-18T22:33:00.000Z",
  bookingEndTime: "2024-01-19T18:05:00.000Z",
  email: "67876787687678@test.vcom",
  phoneNumber: "877898789876787678",
  bookingDetails: "Klj,msad lgij,mfdfil jbksndfbhlj",
};
const dummyServiceDetails: ServiceDetails = {
  artistId: "87uijg9ry46454g",
  serviceId: "90ir7474646466",
  serviceName: "HIP-HOP DUP",
  rate: "Hourly",
  price: 8000,
  aboutUs: "Jshafkl sahlkf ballads at",
  details: " Vdsjg fkjsdahjl gklsdglasd",
  isActive: true,
};

const dummyUserDetails: UserDetails = {
  userId: "78u694040404",
  userType: "ARTIST",
  userName: "artist",
  firstName: "test",
  lastName: "artist",
  showLastName: true,
  primaryLocation: {
    type: "Point",
    address: "Switzerland",
    coordinates: [0, 0],
  },
  profilePictureKey: "",
  rating: 0,
  price: 3764,
  createdAt: "2024-01-17T16:27:01.676Z",
  updatedAt: "2024-01-17T16:27:01.677Z",
  isSaved: true,
  about:
    "D snbdsjhf bm,asdb mnadsbv mdbjvdb,jhv bsd,mnv basd,jknvbasdjmnv badjmn vb,asd nbv,mdnz vb,dnxzbv mnzxcbv ,mcxz",
};


const dummyApiResponse: ApiResponse = {
  id: "dummyId",
  bookingDetails: dummyBookingDetails,
  serviceDetails: dummyServiceDetails,
  userDetails: dummyUserDetails,
};

const dummyData: ApiResponse[] = [dummyApiResponse];



// Assuming each item in stateData has a unique identifier, update CardList component
const CardList: React.FC<CardListProps> = ({ data: propData }) => {
  const [stateData, setStateData] = useState<ApiResponse[]>(dummyData);

  // useEffect(() => {
  //   fetch("myapiurl")
  //     .then((response) => response.json())
  //     .then((responseData: ApiResponse) => {
  //       // Convert the response object to an array of objects
  //       const dataArray = [responseData];
  //       setStateData(dataArray);
  //     });
  // }, []);

  return (
    <div className="card-List">
      {stateData.map((item, index) => (
        <CardComponent key={index.toString()} data={item} />
      ))}
    </div>
  );
};

export default CardList;
