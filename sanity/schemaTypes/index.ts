import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { productType } from "./productType";
import { orderType } from "./orderType";
import { brandType } from "./brandTypes";
import { blogType } from "./blogType";
import { blogCategoryType } from "./blogCategoryType";
import { authorType } from "./authType";
import { addressType } from "./addressType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    productType,
    orderType,
    brandType,
    blogType,
    blogCategoryType,
    authorType,
    addressType,
  ],
};
