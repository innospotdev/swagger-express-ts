import * as bodyParser from "body-parser";
import * as express from "express";
import "reflect-metadata";
import { Container } from "inversify";
import {
  interfaces,
  InversifyExpressServer,
  TYPE
} from "inversify-express-utils";
import { VersionsController } from "./version/versions.controller";
import * as swagger from "./lib/swagger-express-ts";
import { SwaggerDefinitionConstant } from "./lib/swagger-express-ts";
const config = require("../config.json");
import { VersionController } from "./version/version.controller";
import { VersionsService } from "./version/versions.service";
import * as _ from "lodash";

// import models
import "./version/version.model";
import "./author/author.model";

// set up container
const container = new Container();

// note that you *must* bind your controllers to Controller
container
  .bind<interfaces.Controller>(TYPE.Controller)
  .to(VersionsController)
  .inSingletonScope()
  .whenTargetNamed(VersionsController.TARGET_NAME);
container
  .bind<interfaces.Controller>(TYPE.Controller)
  .to(VersionController)
  .inSingletonScope()
  .whenTargetNamed(VersionController.TARGET_NAME);
container
  .bind<VersionsService>(VersionsService.TARGET_NAME)
  .to(VersionsService)
  .inSingletonScope();
// create server
const server = new InversifyExpressServer(container);

server.setConfig((app: any) => {
  app.use("/api-docs/swagger", express.static("swagger"));
  app.use(
    "/api-docs/swagger/assets",
    express.static("node_modules/swagger-ui-dist")
  );
  app.use(bodyParser.json());
  app.use(
    swagger.express({
      definition: {
        info: {
          title: "My api",
          version: "1.0"
        },
        //models : {
        //    Version : {
        //        properties : {
        //            id : {
        //                type : SwaggerDefinitionConstant.Model.Property.Type.STRING,
        //                required : true
        //            },
        //            name : {
        //                type : SwaggerDefinitionConstant.Model.Property.Type.STRING,
        //                required : true
        //            },
        //            description : {
        //                type : SwaggerDefinitionConstant.Model.Property.Type.STRING
        //            },
        //            version : {
        //                type : SwaggerDefinitionConstant.Model.Property.Type.STRING
        //            },
        //            author: {
        //                model: "Author"
        //            }
        //        }
        //    },
        //    Author: {
        //        properties: {
        //            id: {
        //                type: SwaggerDefinitionConstant.Model.Property.Type.STRING,
        //                required : true
        //            },
        //            name : {
        //                type : SwaggerDefinitionConstant.Model.Property.Type.STRING,
        //                required : true
        //            },
        //        }
        //    }
        //}
        responses: {
          500: {}
        },
        externalDocs: {
          url: "My url"
        },
        securityDefinitions: {
          basicAuth: {
            type: SwaggerDefinitionConstant.Security.Type.BASIC_AUTHENTICATION
          },
          apiKeyHeader: {
            type: SwaggerDefinitionConstant.Security.Type.API_KEY,
            in: SwaggerDefinitionConstant.Security.In.HEADER,
            name: "apiHeader"
          }
        }
      }
    })
  );
});

server.setErrorConfig((app: any) => {
  app.use(
    (
      err: Error,
      request: express.Request,
      response: express.Response,
      next: express.NextFunction
    ) => {
      console.error(err.stack);
      response.status(500).send("Something broke!");
    }
  );
});

const app = server.build();

if (!_.isEqual(process.env.NODE_ENV, "test")) {
  app.listen(config.port);
  console.info("Server is listening on port : " + config.port);
}
