import { type SchemaTypeDefinition } from "sanity";

const newsletter: SchemaTypeDefinition = {
  name: "newsletter",
  title: "Newsletter Subscribers",
  type: "document",
  fields: [
    {
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule: any) =>
        Rule.required().regex(
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          { name: "email" }
        ).error("Enter a valid email"),
    },
    {
      name: "subscribedAt",
      title: "Subscribed At",
      type: "datetime",
      readOnly: true,
    },
  ],
};

export default newsletter;
