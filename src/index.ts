import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import Podlet from "@podium/podlet";


//Instances
dotenv.config();
const elements = require('../public/elements.json');
const app: Application = express();
const podlet = new Podlet({
  name: "fooFragment",
  version: "1.0.0",
  pathname: "/",
  content: "/",
  development: true
});

//Middlewares
app.use("/assets", express.static("public"));
app.use(podlet.middleware());

//Set podlet assets
//@ts-ignore
podlet.css({value:"/assets/footer-bem.css"})

//Routes
app.get(podlet.content(), (req:Request, res:Response) => {
  res.status(200).podiumSend(`
      <section class="category-footer">
      <div class="category-footer__divider category-footer__divider--responsive"></div>
      <section class ="category-footer__box">
      ${elements.map((
          element: {
            link: String;
            title: String;
            line: String;
            type: String;
            itemClass: String;
            items: { itemLink: String; name: String; type: String; }[];
          }) =>
            `
            <ul class="${element.type} category-footer-list">
                <li class="category-footer-list__item category-footer-list__item--title">
                <a class="category-footer-list__link--link" href="${element.link}">${
              element.title
            }</a></li>
                <div class="category-footer-list__line ${element.line}"></div>
                <div class="category-footer-list__line category-footer-list__line--gray"></div>
                ${element.items.map(
                    item =>
                      `
                      <li class="category-footer-list__item">
                      <a class="category-footer-list__link--link category-footer-list__link--hover" href="${item.itemLink}">
                      ${item.name}<div class="${item.type}"></div>
                      </a>
                      </li>
                     `
                  )
                  .join("")}
            </ul>
        `
        )
        .join("")}
      </section>
      <div class="category-footer__divider category-footer__divider--responsive"></div>
      </section>
  `);
});

//Send manifest
app.get(podlet.manifest(), (req:Request, res:Response) => {
    res.status(200).send(podlet);
  });


app.listen(3001, () => console.info("🐱‍🏍 express with ts"));
