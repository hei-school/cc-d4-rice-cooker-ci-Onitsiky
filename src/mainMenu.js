"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.show = void 0;
const handling_1 = require("./feature/actions/handling");
const riceCookersAction_1 = require("./feature/actions/riceCookersAction");
const utils_1 = require("./feature/utils/utils");
const readline = __importStar(require("readline-sync"));
let mainMessage = 'Welcome on My Rice Cookers. Choose an action from the list below: \n'
    + '1. Add new rice cooker \n'
    + '2. Handle rice cookers \n'
    + '3. Cook \n'
    + '4. Leave \n';
const validChoices = [1, 2, 3, 4];
function addRiceCooker() {
    let id = +readline.question("Enter the id of the new rice cooker: ");
    let isOperational = +readline.question("Is it operational :"
        + "\n 1. Yes"
        + "\n 2. No"
        + "\n Your choice: ");
    (0, riceCookersAction_1.add)(id, isOperational == 1 ? true : false);
}
function chooseAction(choice) {
    switch (choice) {
        case 1:
            addRiceCooker();
            show();
        case 2:
            (0, handling_1.handleRiceCookersMenu)();
        case 3:
            console.log("cook");
        case 4:
            console.log("Goodbye !");
    }
}
function show() {
    (0, utils_1.showMenu)(mainMessage, validChoices, 4, chooseAction);
}
exports.show = show;
show();
