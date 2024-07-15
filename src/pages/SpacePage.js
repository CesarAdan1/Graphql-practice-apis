import { useQuery } from "@apollo/client";
import React, { Suspense } from "react";
import { useParams } from "react-router";
import { GET_LAUNCHES } from "../graphql";

export const SpacePage = () => {
  const { id } = useParams();
  const { loading, data, error } = useQuery(GET_LAUNCHES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  const launch = data?.launches.find(launch => launch.id === id);

  if (!launch) return <p>No launch found</p>;

  return (
    <div>
      <h2>{launch.mission_name}</h2>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <p>{launch.upcoming ? "Upcoming" : "Completed"}</p>
        <p>{launch.details || "No details available"}</p>
        <p>Year: {launch.launch_year}</p>
        <div>
          Launch site:
            <p key={launch.launch_site.site_id}>{launch.launch_site.site_name}</p>
        </div>
      </div>
    </div>
  )
}
