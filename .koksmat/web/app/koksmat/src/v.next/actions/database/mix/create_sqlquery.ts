/**
 * This function is generated by Koksmat Studio v0.1
 * Feel free to modify it as needed
 *
 */

import { z, ZodObject } from "zod";
import { execute } from "../../client";

/*
  The schema for the CreateSqlquery procedure
*/

const _schema = z
  .object({
    tenant: z.string().optional(),
    searchindex: z
      .string()
      .describe(
        "Search Index is used for concatenating all searchable fields in a single field making in easier to search\n"
      )
      .optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    sql: z.string().optional(),
    connection_id: z.number().optional(),
    schema: z.record(z.any()).optional(),
  })
  .describe("Create operation");

/*
  TypeScript type based on the schema
*/

export type CreateSqlqueryProps = z.infer<typeof _schema>;

// Exclude 'tenant' and 'searchindex' from the type
export type InputType = Omit<CreateSqlqueryProps, "tenant" | "searchindex">;

/**
// Example usage of the  function CreateSqlquery
try {
  const  result =  CreateSqlquery(authtoken,
 name, //replace name with your own variable
    description, //replace description with your own variable
    sql, //replace sql with your own variable
    connection_id, //replace connection_id with your own variable
    schema, //replace schema with your own variable);
  
  
} catch (error) {
  console.error('Validation failed:', error.message);
}
  */

export default function CreateSqlquery(
  authtoken: string,
  name: string,
  description: string,
  sql: string,
  connection_id: number,
  schema: object
) {
  const input = { name, description, sql, connection_id, schema };

  /* 
    
    
    The tenant name and search index are applied upstream, so they are omitted from the schema

    */

  const __schema = _schema.omit({ tenant: true, searchindex: true });

  /*
    
    Input data is validated against the schema, and might be transform during that process

    */
  const item = __schema.safeParse(input);

  if (!item.success) {
    throw new Error(item.error.errors.map((err) => err.message).join(", "));
  }
  return execute(
    authtoken, // <-- this is the authentication token containing the user's credentials - the upn will be used as "actor" name
    "mix", // <-- this is a reference to a record in the connections table in the mix database
    "magic-mix.app", // <-- this is the service name processing the request
    "create_sqlquery", // <-- this is the name of the procedure in the database pointed to by the connection
    item.data // <-- this is the data to be sent to the procedure
  );
}