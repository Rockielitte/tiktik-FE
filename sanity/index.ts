import React from "react";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "@sanity/client";
const client = sanityClient({
  projectId: "ezk3djtw",
  dataset: "production",
  apiVersion: "2021-03-25", // use current UTC date - see "specifying API version"!
  token: process.env.NEXT_SANITY_PUBLISHABLE_TOKEN, // or leave blank for unauthenticated usage
  useCdn: true, // `false` if you want to ensure fresh data
});
export const client2 = sanityClient({
  projectId: "ezk3djtw",
  dataset: "production",
  apiVersion: "2021-03-25", // use current UTC date - see "specifying API version"!
  token: process.env.NEXT_SANITY_PUBLISHABLE_TOKEN2, // or leave blank for unauthenticated usage
  useCdn: true, // `false` if you want to ensure fresh data
});
export default client;
const builder = imageUrlBuilder(client);
export function urlFor(source: any) {
  return builder.image(source);
}
