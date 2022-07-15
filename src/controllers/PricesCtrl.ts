import {Controller, Get,RouteService, PathParams,Delete, Post,BodyParams, Res,Next,HeaderParams} from "@tsed/common";
import { $log } from "ts-log-debug";
import { InternalServerError } from "ts-httpexceptions";
import { PricesService } from "../services/PricesService";
import { PriceElement } from "../entity/Prices";
const WebSocket = require('ws');


export type Price =
    {
        "e": string,
        "E": number,
        "s": string,
        "t": number,
        "p": string,
        "q": string,
        "b": number,
        "a": number,
        "T": number,
        "m": boolean,
        "M": boolean
    }

    let streams=[
        'btcusdt',
        'ethusdt'
    ]
    let sockets={}

   

@Controller("/prices")
export class RestCtrl {
    public timeKeeper={}
    constructor(
        private prices: PricesService,
    ) {
        this.initiateStreams()
    }
    public initiateStreams(){
        for(let market of streams){
            sockets[market]=new WebSocket(`wss://stream.binance.com:9443/ws/${market}@trade`)
            this.runStream(market)
        }
    }

    public runStream(market){
        console.log('stream on market '+market+' runned')
        sockets[market].on('message',  (dataBlob) => {
            this.publicSaveNewPrice(JSON.parse(dataBlob))
        })
    }

   async publicSaveNewPrice(data:Price){
        let newPrice= await new PriceElement()
        newPrice.E=data.E
        newPrice.M=data.M
        newPrice.T=data.T
        newPrice.a=data.a
        newPrice.b=data.b
        newPrice.e1=data.e
        newPrice.m1=data.m
        newPrice.p=data.p
        newPrice.q=data.q
        newPrice.s=data.s
        newPrice.t1=data.t
         await this.prices.save(newPrice)
         this.timeLogger(newPrice.s)
    }

   public timeLogger(symbol){
       let now=new Date().getTime()
   
    if(!this.timeKeeper[symbol]){
        this.timeKeeper[symbol] = now
    }
    let lastTime =this.timeKeeper[symbol] 
    let seconds =(((now-lastTime) % 60000) / 1000).toFixed(3)
        console.log(symbol +' - '+ seconds);
        this.timeKeeper[symbol] = now
    }
    
}
