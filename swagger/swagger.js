const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
        title: "ToTheAssembly",
        version: "0.0.1",
        description: "2022 Hanium Project - ToTheAssembly",
        },
        servers: [
        {
            url: "http://localhost:8001",
        },
        ],
        basePath: "/",
    },
    apis: ["./routes/*.js", "./swagger/apis/*", "./swagger/models/*"],
};

const specs = swaggerJsdoc(options);

module.exports = {
    swaggerUi,
    specs,
};