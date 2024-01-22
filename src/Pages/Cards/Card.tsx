import React from "react";
import "./Card.scss";

interface PrimaryLocation {
  type: string;
  address: string;
  coordinates: number[];
}

interface BookingDetails {  
  bookingId: string;
  bookingNumber: string;
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
  primaryLocation: PrimaryLocation;
  profilePictureKey: string;
  rating: number;
  price: number;
  createdAt: string;
  updatedAt: string;
  isSaved: boolean;
  about: string;
}

interface CardProps {
  id?: string;
  data: {
    bookingDetails: BookingDetails;
    serviceDetails: ServiceDetails;
    userDetails: UserDetails;
  };
}


const renderNestedObject = (
  obj: Record<string, any> | undefined
): React.ReactNode => {
  if (!obj) return null;

  return (
    <ul>
      {Object.entries(obj).map(([subKey, subValue]) => (
        <li key={subKey}>
          <strong>{subKey}:</strong>
          {typeof subValue === "object" && subValue !== null ? (
            renderNestedObject(subValue as Record<string, any>)
          ) : (
            <span>{subValue}</span>
          )}
        </li>
      ))}
    </ul>
  );
};

const CardComponent: React.FC<CardProps> = ({ id, data }) => {
  return (
    <div className="Page-Container">
      <h1 className="page-heading">Booking Page</h1>
      <div className="card-list">
        {/* Booking Details Card */}
        <div className="card">
          <h2>Booking Details</h2>
          <div className="img-name">
            <img
              src=" https://images.unsplash.com/photo-1705719418761-3808881d06b4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8 "
              alt=" "
            />
          </div>
          {renderNestedObject(data.bookingDetails)}
        </div>

        {/* Service Details Card */}
        <div className="card">
          <h2>Service Details</h2>
          {renderNestedObject(data.serviceDetails)}
        </div>

        {/* User Details Card */}
        <div className="card">
          <h2>User Details</h2>
          {renderNestedObject(data.userDetails)}
        </div>
      </div>
    </div>
  );
};


export default CardComponent;