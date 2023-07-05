import getAllItems from "@/lib/getAllItems";
import { slugify } from "@/lib/utils";

const url = "https://cc0-lib.wtf";

export const sitemap = async () => {
  const itemData = await getAllItems();
  const items = itemData.map((item) => ({
    url: `${url}/${slugify(item.Title)}`,
    lastModified: new Date().toISOString(),
  }));

  const pages = ["", "leaderboard", "info", "contribute", "submit"].map(
    (page) => ({
      url: `${url}/${page}`,
      lastModified: new Date().toISOString(),
    })
  );

  return [...pages, ...items];
};

export default sitemap;