const puppeteer = require("puppeteer");
const createServer = require("../../server.js");
const { toMatchImageSnapshot } = require("jest-image-snapshot");

expect.extend({ toMatchImageSnapshot });

let server;
let address;
let browser;

beforeAll(async () => {
  server = createServer({ logger: false });
  address = await server.listen();
  browser = await puppeteer.launch();
});

afterAll(async () => {
  await browser.close();
  await server.close();
});

test("tokens", async () => {
  const page = await browser.newPage();
  const tokens = [
    "A1T",
    "B1Tp",
    "C1Tc-Goblin1",
    "D1",
    "E1r",
    "F1y-Goblin1",
    "G1c-Goblin1",
    "H1r-Goblin1",
    "I1g-Goblin1",
    "J1p-Goblin1",
    "A2L",
    "C2Lb",
    "E2lg-Goblin1",
    "A4H",
    "D4Hp",
    "G4Hp-Goblin1",
    "A7G",
    "E7Gr-Goblin1",
  ];
  await page.goto(`${address}/${tokens.join("/")}`);
  const image = await page.screenshot();
  expect(image).toMatchImageSnapshot();
});

test("overlays", async () => {
  const page = await browser.newPage();
  const overlays = ["A1$T", "B1$P", "C1$p", "D1$S", "E1$F", "F1$O", "G1$o"];
  await page.goto(`${address}/${overlays.join("/")}`);
  const image = await page.screenshot();
  expect(image).toMatchImageSnapshot();
});

test("walls", async () => {
  const page = await browser.newPage();
  const walls =
    "_H2J2J7A7A1H1_E1E4]D4A4_B1B2$A2_H1H4[G4E4_D4]D5D7_D5]E5F5F7_F5]G5H5H7_H5I5-J5_I3I4H4";
  await page.goto(`${address}/${walls}`);
  const image = await page.screenshot();
  expect(image).toMatchImageSnapshot();
});

test("effects", async () => {
  const page = await browser.newPage();
  const effects = ["*s15cc1c5", "*c20rh3", "*l40,2ya6j6", "*t15f10f3"];
  await page.goto(`${address}/${effects.join("/")}`);
  const image = await page.screenshot();
  expect(image).toMatchImageSnapshot();
});

test("background", async () => {
  const page = await browser.newPage();
  const bg =
    "https://cdn.discordapp.com/attachments/687568111498821642/714239512741412974/battlemap-3.png";
  await page.goto(`${address}/24x17/?bg=${bg}`);
  const image = await page.screenshot();
  expect(image).toMatchImageSnapshot();
});

test("settings: dark mode", async () => {
  const page = await browser.newPage();
  await page.goto(`${address}/@d`);
  const image = await page.screenshot();
  expect(image).toMatchImageSnapshot();
});

test("settings: zoom: 2", async () => {
  const page = await browser.newPage();
  await page.goto(`${address}/@2`);
  const image = await page.screenshot();
  expect(image).toMatchImageSnapshot();
});

test("settings: zoom: 3", async () => {
  const page = await browser.newPage();
  await page.goto(`${address}/@3`);
  const image = await page.screenshot();
  expect(image).toMatchImageSnapshot();
});

test("settings: grid transparency: half", async () => {
  const page = await browser.newPage();
  await page.goto(`${address}/@h`);
  const image = await page.screenshot();
  expect(image).toMatchImageSnapshot();
});

test("settings: grid transparency: no grid", async () => {
  const page = await browser.newPage();
  await page.goto(`${address}/@n`);
  const image = await page.screenshot();
  expect(image).toMatchImageSnapshot();
});

test("complex: multiple features 1", async () => {
  const page = await browser.newPage();
  const tokens = [
    "A1T",
    "B1Tp",
    "C1Tc-Goblin1",
    "D1",
    "E1r",
    "F1y-Goblin1",
    "G1c-Goblin1",
    "H1r-Goblin1",
    "I1g-Goblin1",
    "J1p-Goblin1",
    "A2L",
    "C2lb",
    "E2Lg-Goblin1",
    "A4H",
    "D4Hp",
    "G4Hp-Goblin1",
    "A7G",
    "E7Gr-Goblin1",
  ];
  const bg =
    "https://cdn.discordapp.com/attachments/687568111498821642/714239512741412974/battlemap-3.png";
  const settings = "@2dn";
  await page.goto(`${address}/${tokens.join("/")}/${settings}/?bg=${bg}`);
  const image = await page.screenshot();
  expect(image).toMatchImageSnapshot();
});

test("complex: multiple features 2", async () => {
  const page = await browser.newPage();
  const tokens = [
    "A1T",
    "B1Tp",
    "C1Tc-Goblin1",
    "D1",
    "E1r",
    "F1y-Goblin1",
    "G1c-Goblin1",
    "H1r-Goblin1",
    "I1g-Goblin1",
    "J1p-Goblin1",
    "A2L",
    "C2lb",
    "E2lg-Goblin1",
    "A4H",
    "D4Hp",
    "G4Hp-Goblin1",
    "A7G",
    "E7Gr-Goblin1",
  ];
  const bg =
    "https://cdn.discordapp.com/attachments/687568111498821642/714239512741412974/battlemap-3.png";
  const settings = "@3h";
  await page.goto(`${address}/${tokens.join("/")}/${settings}/?bg=${bg}`);
  const image = await page.screenshot();
  expect(image).toMatchImageSnapshot();
});
