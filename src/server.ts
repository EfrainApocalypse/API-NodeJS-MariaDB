import { fastify } from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
	jsonSchemaTransform,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { fastifyCors } from "@fastify/cors";
import { routes } from "./routes";
import dotenv from "dotenv";
dotenv.config();

const server = fastify().withTypeProvider<ZodTypeProvider>();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(fastifyCors, {
	origin: true,
	methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
	credentials: true,
});

server.register(fastifySwagger, {
	openapi: {
		info: {
			title: "My first Node.js API",
			description: "Hello World!",
			version: "1.0.0",
		},
	},
	transform: jsonSchemaTransform,
});

server.register(fastifySwaggerUi, {
	routePrefix: "/docs",
});

server.register(routes);

server
	.listen({
		port: Number(process.env.PORT) || 3333,
		host: "0.0.0.0",
	})
	.then(() => {
		console.log(
			"Running at http://localhost:3333\nDocs at: http://localhost:3333/docs",
		);
	});
