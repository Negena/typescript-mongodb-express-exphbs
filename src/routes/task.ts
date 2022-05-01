import { Router, Request , Response } from "express";

const router = Router()

import Task from "../models/task";

router.get("/", (req: Request, res: Response) => {
  res.render("partials/index")
})

router.route("/create")
.get((req: Request, res: Response) => {
  res.render("task/create")
})
.post(async(req: Request, res: Response) => {
  const {title, description} = req.body;
  const task = new Task ({title, description})
  await task.save()
  console.log(task)
  res.redirect("/task/list")
})

router.route("/list")
.get(async(req: Request, res: Response) => {
  const lists = await Task.find({}).lean().exec((err, body) => {
    if (err) throw err;
    res.render("task/list", {body})
  })
})

router.route("/delete/:id")
.get(async(req: Request, res: Response) => {
  const {id} = req.params
  await Task.findByIdAndDelete(id)
  res.redirect("/task/list")
})

router.route("/edit/:id")
.get(async(req: Request, res: Response) => {
  const {id} = req.params
  const task = await Task.findById(id).lean().exec((err, task) => {
    if (err) throw err;
    res.render("task/edit", {task})
  })
})
.post(async(req: Request, res: Response) => {
  const {title , description} = req.body;
  const {id} = req.params
  const user =  await Task.findByIdAndUpdate(id, req.body)
   console.log(user)
   res.redirect("/task/list")
})


export default router
