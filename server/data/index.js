BillMetrics.insertMany({
  version: "Version1",
  version1Category1Price: 30.0,
  version1Category2Price: 37.0,
  version2Category1Price: 42.0,
  version2Category2Price: 42.0,
  version2Category3Price: 50.0,
  version2Category4Price: 50.0,
  version2Category5Price: 75.0,
  category1FixedCharge: 400.0,
  category2FixedCharge: 550.0,
  category3FixedCharge: 650.0,
  category4FixedCharge: 1500.0,
  category5FixedCharge: 2000.0,
});

Product.insertMany([
  {
    productName: "Low Frequency Off Grid Solar Inverter",
    price: 234402,
    productType: "PV3500",
    imagePath: "",
    description:
      "PV3500 TLV series is a multi-function inverter ,combining functions of inverter and MPPT solar charger controller, solar charger and battery chargerto offer uninterruptible power support. The comprehensive LCD display offers user-configurable and easy-accessible button operation such as batterycharging current, AC/solar charger priority, and selectable input voltage based on different applications.",
    category: "Inverter",
    features: [
      "Smart LCD setting(Working modes, Charge Current, Charge voltage, etc.)",
      "MPPT efficiency max 98%",
      "Powerful charge rate up to 80Amp",
    ],
    availability: true,
  },
  {
    productName: "Deep Cycle Gel VRLA Battery",
    price: 62500,
    productType: "FCDG Series 6V-12V",
    imagePath: "",
    description:
      "MUST , one of the most trusted names in deep cycle battery technology and the major deep cycle battery manufacturer in China, also offers gel VRLA batteries. The industrial battery we supply is definitely maintenance-free and requires no addition of water. It provides customers durable runtime and battery life for the most demanding applications.",
    category: "Battery",
    features: ["feature 1", "feature2", "feature3"],
    availability: true,
  },
  {
    productName: "Mono-crystalline Silicon Solar Panel",
    price: 76571,
    productType: "Mono SM250W",
    imagePath: "",
    description: "description",
    category: "SolarPanel",
    features: ["feature 1", "feature2", "feature3"],
    availability: true,
  },
  {
    productName: "High Frequency On/Off Grid Hybrid Solar Inverter",
    price: 134390,
    productType: "PH1800 Plus Series (2-5.5KW)",
    imagePath: "",
    description: "description",
    category: "Inverter",
    features: ["feature 1", "feature2", "feature3"],
    availability: true,
  },
]);

ServicePack.insertMany([
  {
    name: "OffGridPackOne",
    products: {
      "646122da1de646d2ddf4c54a": 1,
      "646122c7b0e90f1beeed91ba": 12,
      "64612261af4efcb44ed297d4": 4,
    },
    monthlyPowerConsumption: "0-60",
    totalProductCost: 1303242,
  },
  {
    name: "OffGridPackTwo",
    products: {
      "6461221186dfbb7c4dbc644e": 1,
      "646122c7b0e90f1beeed91ba": 12,
      "64612261af4efcb44ed297d4": 4,
    },
    monthlyPowerConsumption: "61-120",
    totalProductCost: 1403254,
  },
  {
    name: "OffGridPackThree",
    products: {
      "646122da1de646d2ddf4c54a": 3,
      "646122c7b0e90f1beeed91ba": 36,
      "64612261af4efcb44ed297d4": 12,
    },
    monthlyPowerConsumption: "121-180",
    totalProductCost: 3909726,
  },
]);

RecentProject.insertMany([
  {
    projectId: "64181e67f5c7dc2fd59623ab",
    projectName: "Recent Project 1",
    location: "Colombo",
    endDate: new Date("2023-06-28"),
    projectType: "Commercial",
    description: "Description 1",
    picturePath: "picture is",
  },
  {
    projectId: "64181e67f545dc2fd59623ab",
    projectName: "Recent Project 2",
    location: "Colombo",
    endDate: new Date("2023-06-28"),
    projectType: "Commercial",
    description: "Description 2",
    picturePath: "picture is",
  },
  {
    projectId: "64181e67f5c7dc256d59623ab",
    projectName: "Recent Project 2",
    location: "Colombo",
    endDate: new Date("2023-06-28"),
    projectType: "Commercial",
    description: "Description 2",
    picturePath: "picture is",
  },
]);
