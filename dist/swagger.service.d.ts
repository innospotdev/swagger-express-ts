import { ISwagger, ISwaggerInfo, ISwaggerExternalDocs } from "./i-swagger";
import { IApiPathArgs } from "./api-path.decorator";
import { IApiOperationPostArgs } from "./api-operation-post.decorator";
import { IApiOperationArgsBaseResponse } from "./i-api-operation-args.base";
import { IApiOperationGetArgs } from "./api-operation-get.decorator";
import { IApiModelPropertyArgs } from "./api-model-property.decorator";
import { IApiModelArgs } from ".";
import { ISwaggerSecurityDefinition } from "./swagger.builder";
import { ISwaggerBuildDefinitionModel } from "./swagger.builder";
export declare class SwaggerService {
    private static instance;
    private controllerMap;
    private data;
    private modelsMap;
    private globalResponses;
    private constructeur();
    static getInstance(): SwaggerService;
    resetData(): void;
    private initData();
    getData(): ISwagger;
    setBasePath(basePath: string): void;
    setOpenapi(openapi: string): void;
    setInfo(info: ISwaggerInfo): void;
    setSchemes(schemes: string[]): void;
    setProduces(produces: string[]): void;
    setConsumes(consumes: string[]): void;
    setHost(host: string): void;
    setDefinitions(models: {
        [key: string]: ISwaggerBuildDefinitionModel;
    }): void;
    setExternalDocs(externalDocs: ISwaggerExternalDocs): void;
    setGlobalResponses(globalResponses: {
        [key: string]: IApiOperationArgsBaseResponse;
    }): void;
    addPath(args: IApiPathArgs, target: any): void;
    addOperationGet(args: IApiOperationGetArgs, target: any, propertyKey: string | symbol): void;
    addOperationPost(args: IApiOperationPostArgs, target: any, propertyKey: string | symbol): void;
    addOperationPut(args: IApiOperationPostArgs, target: any, propertyKey: string | symbol): void;
    addOperationPatch(args: IApiOperationPostArgs, target: any, propertyKey: string | symbol): void;
    addOperationDelete(args: IApiOperationPostArgs, target: any, propertyKey: string | symbol): void;
    addSecurityDefinitions(securityDefinitions: {
        [key: string]: ISwaggerSecurityDefinition;
    }): void;
    private addOperation(operation, args, target, propertyKey);
    private buildOperation(args, target, propertyKey);
    private buildOperationResponses(responses);
    private buildOperationSecurity(argsSecurity);
    private buildParameters(type, parameters);
    buildSwagger(): void;
    private buildSwaggerOperation(operation, controller);
    private buildRef(definition);
    addApiModelProperty(args: IApiModelPropertyArgs, target: any, propertyKey: string | symbol, propertyType: string): void;
    addApiModel(args: IApiModelArgs, target: any): any;
}
