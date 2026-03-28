import { defineContract } from "./define-contract";
import { CreatePlaceInputSchema, PlaceListQuerySchema, UpdatePlaceInputSchema } from "../schemas/places";
import { PlaceSchema } from "../schemas/entities";

export const placeContracts = {
  list: defineContract({
    method: "GET",
    path: "/places",
    request: PlaceListQuerySchema,
    response: PlaceSchema
  }),
  detail: defineContract({
    method: "GET",
    path: "/places/:id",
    response: PlaceSchema
  }),
  mapMarkers: defineContract({
    method: "GET",
    path: "/places/map-markers",
    response: PlaceSchema
  }),
  adminCreate: defineContract({
    method: "POST",
    path: "/admin/places",
    request: CreatePlaceInputSchema,
    response: PlaceSchema
  }),
  adminUpdate: defineContract({
    method: "PATCH",
    path: "/admin/places/:id",
    request: UpdatePlaceInputSchema,
    response: PlaceSchema
  })
};
