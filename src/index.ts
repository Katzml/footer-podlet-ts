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
      <div class="category-footer__divider category-footer__divider--mobile"></div>
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
            <ul class="${element.type} category-footer__list--list">
                <li class="category-footer__list__item--title">
                <a class="category-footer__list__item__link--link category-footer__list__item__link--hover" href="${element.link}">${
              element.title
            }</a></li>
                <div class="category-footer__list__line ${element.line}"></div>
                <div class="category-footer__list__line--gray"></div>
                ${element.items.map(
                    item =>
                      `
                      <li class="category-footer__list__item">
                      <a class="category-footer__list__item__link--link category-footer__list__item__link--hover" href="${item.itemLink}">
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
      <div class="category-footer__divider category-footer__divider--mobile"></div>
      </section>
  `);
});

//Send manifest
app.get(podlet.manifest(), (req:Request, res:Response) => {
    res.status(200).send(podlet);
  });


app.listen(3001, () => console.info("🐱‍🏍 express with ts"));
