import { z } from "zod";

import { defineContract } from "./define-contract";
import {
  CreatePlaceInputSchema,
  PlaceDetailSchema,
  PlaceListItemSchema,
  PlaceListQuerySchema,
  PlaceMapMarkerSchema,
  UpdatePlaceInputSchema
} from "../schemas/places";
import { PlaceSchema } from "../schemas/entities";

export const placeContracts = {
  list: defineContract({
    method: "GET",
    path: "/places",
    request: PlaceListQuerySchema,
    response: PlaceListItemSchema
  }),
  detail: defineContract({
    method: "GET",
    path: "/places/:id",
    response: PlaceDetailSchema
  }),
  mapMarkers: defineContract({
    method: "GET",
    path: "/places/map-markers",
    response: z.array(PlaceMapMarkerSchema)
  }),
  adminList: defineContract({
    method: "GET",
    path: "/admin/places",
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
