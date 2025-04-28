const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        let success = true;
        if (success) {
            resolve("success");
        } else {
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

async function fetchDitto(): Promise<any> {
    try {
        const responseDitto = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
        return await responseDitto.json();
        // console.log("DITTO: ", jsonDitto)

    } catch (error) {
        console.log(error)
    }
    
}

async function fetchPikachu() {
    try {
        const responsePikachu = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
        return await responsePikachu.json();
        // console.log("PIKACHU: ", jsonPikachu)
    } catch (error) {
        console.log(error)
    }
    
}

(async () => {
    const ditto = await fetchDitto();
    const pikachu = await fetchPikachu();
    console.log("Ditto: ", ditto);
    console.log("Pikachu: ", pikachu);
})();
