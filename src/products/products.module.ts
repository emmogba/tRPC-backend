import { Module } from "@nestjs/common";
import exp from "constants";
import { ProductsService } from "./products.service";
import { ProductsRouter } from "./products.router";

@Module({
    providers: [ProductsService, ProductsRouter],
})

export class ProductModule { }