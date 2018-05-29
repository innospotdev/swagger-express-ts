export interface IApiModelPropertyArgs {
    required?: boolean;
    format?: string;
    type?: string;
    description?: string;
    enum?: string[];
    model?: string;
}
export declare function ApiModelProperty(args?: IApiModelPropertyArgs): PropertyDecorator;
