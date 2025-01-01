import { Injectable, Logger } from "@nestjs/common";
import { MiddlewareOptions, TRPCMiddleware, TRPCContext } from "nestjs-trpc";
import { Request } from "express";

@Injectable()
export class LoggerMiddleware implements TRPCMiddleware {
    private readonly logger = new Logger(LoggerMiddleware.name);
  async use(opts: MiddlewareOptions & { ctx: TRPCContext & { req: Request, res: any } }) {
      const start = Date.now();
      const {next, type, input, path} = opts;
      const result = await next();

      const {req, res } = opts.ctx;
      const meta = {
            type,
            input,
            path,
            duration: Date.now() - start,
            methods: req.method,
            status: res.statusCode,
            ip: req.ip,
            headers: req.headers,
      }
      result.ok ? this.logger.log('Success', meta) : this.logger.error('Error', meta);
        return result;
  }
  
}