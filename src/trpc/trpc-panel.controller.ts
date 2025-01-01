import { All, Controller, Inject, OnModuleInit } from "@nestjs/common";
import { AnyRouter } from "@trpc/server";
import { AppRouterHost } from "nestjs-trpc";
import { renderTrpcPanel } from "trpc-panel";

@Controller()

export class TrpcPanelController implements OnModuleInit {
    private appRouter! : AnyRouter;

    constructor (@Inject(AppRouterHost) private readonly AppRouterHost : AppRouterHost ){}
    
    onModuleInit() {
        this.appRouter = this.AppRouterHost.appRouter;
    }

    @All ('/panel')
    panel() {
        return renderTrpcPanel(
            this.appRouter,
            {
                url: 'https://trpc-backend-2b8l.onrender.com/panel',
            }
        );
    }

}