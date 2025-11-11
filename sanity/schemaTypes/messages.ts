// sanity/schemaTypes/message.ts

import { type SchemaTypeDefinition } from "sanity";

const message: SchemaTypeDefinition = {
  name: "message",
  title: "Messages",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "message",
      title: "Message",
      type: "text",
    },
    {
      name: "date",
      title: "Date",
      type: "datetime",
    },
  ],
};

export default message;
