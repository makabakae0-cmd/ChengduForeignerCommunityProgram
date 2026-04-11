const withQuery = (
  path: string,
  query?: Record<string, string | number | boolean | undefined>
) => {
  const searchParams = new URLSearchParams();

  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (value === undefined) {
      return;
    }

    searchParams.set(key, String(value));
  });

  return searchParams.size > 0 ? `${path}?${searchParams.toString()}` : path;
};

export const placesPagePaths = {
  list: (query?: {
    keyword?: string;
    category?: string;
    tags?: string;
    recommended?: boolean;
    sort?: "recommended" | "name";
  }) => withQuery("/pages/places/index", query),
  detail: (id: string) => withQuery("/pages/places/detail", { id }),
  map: (id?: string) => withQuery("/pages/places/map", { id }),
  recommended: () =>
    withQuery("/pages/places/index", {
      recommended: true,
      sort: "recommended"
    })
};
