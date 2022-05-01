import express from "express"
import {engine} from "express-handlebars"
import path from "path"
import indexRouter from "./routes/router"
import taskRouter from "./routes/task"
import * as dotenv from 'dotenv'

class Application {
  app: express.Application

  constructor(){
    this.app = express()
    this.setting()
    this.middlewares()
    this.routes()
  }

  setting(){
    //engine added after editing answer
  this.app.engine('.hbs', engine({ defaultLayout: 'main', extname: '.hbs' }));

  // necessary for templates
  this.app.set('views', __dirname + '/views');

  // defining handle bar engine
  this.app.set("view engine", "hbs")

  }
  middlewares(){
    this.app.use(express.json())
    this.app.use(express.urlencoded({extended: false}))
    dotenv.config();
  }
  routes(){
    this.app.use(indexRouter)
    this.app.use("/task",taskRouter)
  }
  start(){
    this.app.listen(3000, () => {
      console.log("works")
    })
  }
}

export default Application
