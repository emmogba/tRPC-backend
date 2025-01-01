import { Input, Mutation, Query, Router, UseMiddlewares } from "nestjs-trpc";
import { ProductsService } from "./products.service";
import { Product, productsSchema } from "./products.schema";
import { query } from "express";
import { z } from "zod";
import { LoggerMiddleware } from "src/trpc/middleware/logger.middleware";


@Router({ alias: "products" })
@UseMiddlewares(LoggerMiddleware)

export class ProductsRouter {
    constructor(private productService: ProductsService) {}
    @Query({
        input: z.object({id: z.string()}),
        output: productsSchema,
    })

    getProductById(@Input('id') id: string){
        return this.productService.getProductById(id);
    }

    @Query({
        output: z.array(productsSchema),
    })

    getAllProducts(){
        return this.productService.getAllProducts();
    }

    
    @Mutation({
        input: productsSchema,
        output: productsSchema,
    })
    async createProduct(@Input() ProductData: Product) 
    {
        return this.productService.createProduct(ProductData);
    }


    @Mutation({
        input: z.object({
            id: z.string(),
            data: productsSchema.partial()
        }),
        output: productsSchema
    })
    updateProduct(
        @Input('id') id: string,
        @Input('data') data: Partial<Product>
    ){
        return this.productService.updateProduct(id, data)
    }

    @Mutation({
        input: z.object({id: z.string() }),
        output: z.boolean(),
    })

    deleteProduct(@Input('id') id: string){
        return this.productService.deleteProduct(id);
    }
}