"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var swagger_service_1 = require("./swagger.service");

function ApiModelProperty(args) {
    return function(target, propertyKey) {

        var propertyType;

        if (Reflect.getMetadata("design:type", target, propertyKey) !== undefined) {
            propertyType = Reflect.getMetadata("design:type", target, propertyKey).name.toLowerCase();

        } else {
            propertyType = undefined;

        }

        swagger_service_1.SwaggerService.getInstance().addApiModelProperty(args, target, propertyKey, propertyType);
    };
}
exports.ApiModelProperty = ApiModelProperty;