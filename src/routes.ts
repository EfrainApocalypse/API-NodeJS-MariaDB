import z from "zod";
import { FastifyTypedInstance } from "./types";
import { db } from "./db";


export async function routes(server: FastifyTypedInstance) {
	server.get("/messages", {
        schema: {
            tags: ["messages"],
            description: "Lists messages",
            response: {
                200: z.array(z.object({
                    id: z.number().int(), 
                    autor: z.string(),
                    valor: z.string(),
                    hora: z.any() 
                }))
            }
        }
    }, async () => {
        var [mensagens] = await db.query("SELECT * FROM `mensagens` ORDER BY `hora` DESC") as any[];
        return mensagens;
	});

    server.post("/messages", {
        schema: {
            tags: ["messages"],
            description: "Creates a new message",
            body: z.object({
                autor: z.string(),
                valor: z.string()
            }),
            response: {
                201: z.null().describe("Message created.")
            }
        }
    }, async (request,reply) => {
        var {autor, valor} = request.body;
        await db.query("INSERT INTO `mensagens` (`autor`, `valor`, `hora`) VALUES (?, ?, now());", [autor, valor]);
        return reply.status(201).send();
    })

    server.put("/messages", {
        schema: {
            tags: ["messages"],
            description: "Updates an existing message.",
            body: z.object({
                id: z.number().int(),
                autor: z.string(),
                valor: z.string()
            }),
            response: {
                204: z.null().describe("Message updated.")
            }
        }
    }, async (request,reply) => {
        var {id, autor, valor} = request.body;
        await db.query("UPDATE `mensagens` SET `id` = ?, `autor` = ?, `valor` = ?, `hora` = NOW() WHERE `id` = ?;", [id, autor, valor, id]);
        return reply.status(204).send();
    })

    server.delete("/messages", {
        schema: {
            tags: ["messages"],
            description: "Deletes an existing message.",
            body: z.object({
                id: z.number().int()
            }),
            response: {
                204: z.null().describe("Message deleted.")
            }
        }
    }, async (request,reply) => {
        var {id} = request.body;
        await db.query("DELETE FROM `mensagens` WHERE ((`id` = ?));", [id]);
        return reply.status(204).send();
    })
}
