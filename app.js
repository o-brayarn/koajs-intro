const Koa = require("koa");
const KoaRouter = require("koa-router");
const json = require("koa-json");
const render = require("koa-ejs"); //template engine
const path = require("path");
const bodyParser = require("koa-bodyparser");

const app = new Koa();
const router = new KoaRouter();

// JSON prettier middleware
app.use(json());

// BodyParser middleware
app.use(bodyParser());

// Replace with DB
const things = ["Coding 24/7", "Chess", "Food"];

// Simple middleware sample
// app.use(async (ctx) => (ctx.body = { message: "Intro to Koa JS" }));

// You can add any additional properties to context
app.context.user = "Kevin";

render(app, {
  root: path.join(__dirname, "views"),
  layout: "layout",
  viewExt: "html",
  cache: false,
  debug: false,
});
// Routes
router.get("/", index);
router.get("/add", showAdd);
router.post("/add", add);
async function index(ctx) {
  await ctx.render("index", {
    title: "Things I love.",
    things: things,
  });
}

// Show add page
async function showAdd(ctx) {
  await ctx.render("add");
}

// Add Things
async function add(ctx) {
  const body = ctx.request.body;
  things.push(body.thing);
  ctx.redirect("/");
}

router.get("/test", (ctx) => (ctx.body = `Hello ${ctx.user}`));
router.get("/test2/:name", (ctx) => (ctx.body = `Hello ${ctx.params.name}`));

// Router Middleware
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => console.log("Server started ..."));
