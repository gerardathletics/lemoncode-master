import React from "react";
import { Link, useParams } from "react-router-dom";
import { useOrganization } from "./context/OrganizationContext";

export const DetailPage: React.FC = () => {
  const {id} = useParams();
  const { organization } = useOrganization();

  return (
    <>
      <h2>Hello from Detail page</h2>
      <h3>User Id: {id}</h3>
      <h3>Organization: {organization}</h3>
      <Link to="/list">Back to list page</Link>
    </>
  );
};
