import z from "zod";

const forwardTo = z.object({
    username:z.string()
})

const taskPermissions = z.object({
    permission:z.string()
})

const schema = z.object({
    to:z.array(forwardTo),
    startingDate:z.string(),
    endingDate:z.string(),
    days:z.string(),
    taskPermissions:z.array(taskPermissions)
})

type SchemaType = z.infer<typeof schema>

export { schema, type SchemaType }
