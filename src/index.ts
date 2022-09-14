import Fastify from "fastify";
import { PrismaClient } from "@prisma/client";
import { user } from "./routes/user/user";

export const prisma = new PrismaClient();
export const fastify = Fastify({
  logger: true,
});
const port = 8080;

fastify.register((fastify, options, done) => {
  fastify.register(require("fastify-cors"), {
    origin: "*",
    methods: ["POST"],
  });
  done();
});

fastify.addHook("onRequest", (request, response, done) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Methods", "GET");
  response.header("Access-Control-Allow-Methods", "POST");
  done();
});

user();

fastify.get("/", async (request, response) => {
  response.code(200).send({ data: "cannons" });
});

fastify.listen({ port: port }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at port ${port}`);
});
