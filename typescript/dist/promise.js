"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        let success = true;
        if (success) {
            resolve("success");
        }
        else {
            reject("failed");
        }
    }, 2000);
});
// myPromise 
//     .then((result: unknown) => {
//         console.log(result)
//     })
//     .catch((error: unknown) => {
//         console.log(error)
//     });
// fetch("https://pokeapi.co/api/v2/pokemon/ditto", {
//     method: "GET",
// })
function fetchDitto() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const responseDitto = yield fetch("https://pokeapi.co/api/v2/pokemon/ditto");
            return yield responseDitto.json();
            // console.log("DITTO: ", jsonDitto)
        }
        catch (error) {
            console.log(error);
        }
    });
}
function fetchPikachu() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const responsePikachu = yield fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
            return yield responsePikachu.json();
            // console.log("PIKACHU: ", jsonPikachu)
        }
        catch (error) {
            console.log(error);
        }
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield fetchDitto();
    yield fetchPikachu();
}))();
