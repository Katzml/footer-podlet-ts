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
// podlet.css({})
//Routes

app.get(podlet.content(), (req, res) => {
  res.status(200).podiumSend(`
      <footer>
      <section class ="foo-fragment">
      <div class="sepa"></div>
      ${elements.map((
          element: {
            link: String;
            title: String;
            line: String;
            items: { itemLink: String; name: String }[];
          }) =>
            `<section class="box" >
            <ul>
                <li class="item-title"><a href="${element.link}">${
              element.title
            }</a></li>
                <div class="${element.line}"></div>
                <div class="line-gray"></div>
                ${element.items
                  .map(
                    item =>
                      `<li class="item"><a href="${item.itemLink}">${item.name}</a></li>`
                  )
                  .join("")}
            </ul>
        </section>`
        )
        .join("")}
      <div class="sepa"></div>
      </section>
      </footer>
  `);
});

//Send manifest
app.get(podlet.manifest(), (req, res) => {
    res.status(200).send(podlet);
  });

// example of a get route
// app.get('/',(req:Request,res:Response)=>res.send('Hola mundillo'));

app.listen(3000, () => console.info("🐱‍🏍 express with ts"));
