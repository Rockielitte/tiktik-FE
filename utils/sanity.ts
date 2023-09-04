import React from "react";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "@sanity/client";
const client = sanityClient({
  projectId: "ezk3djtw",
  dataset: "production",
  apiVersion: "2021-03-25", // use current UTC date - see "specifying API version"!
  token: `${process.env.NEXT_SANITY_PUBLISHABLE_TOKEN}`, // or leave blank for unauthenticated usage
  useCdn: true, // `false` if you want to ensure fresh data
});
export const client2 = sanityClient({
  projectId: "ezk3djtw",
  dataset: "production",
  apiVersion: "2021-03-25", // use current UTC date - see "specifying API version"!
  token: `sk3sXSq1MF7E5WGNfGpMzwjJVRodoySDa6DmbpyD0hq2bFZ2F1R6WFVS0SKEFh1vx5mO3yopsZxLLWXooY4CqUvzj2SiacePf10fZz3MfHFhqr95W3dc5TsUPqN4uE1QT8q0Z2AbhwAcvl6U1jOlZlgisdZ32g5WU5CdFMvYYtrHhLMwQynK`, // or leave blank for unauthenticated usage
  useCdn: true, // `false` if you want to ensure fresh data
});
export default client;
const builder = imageUrlBuilder(client);
export function urlFor(source: any) {
  return builder.image(source);
}
