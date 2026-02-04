






async function test() {
    try {
        const response = await fetch("../src/data/api.json");
        if (!response.ok){
            throw new Error(`Reponse status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);

    } catch (error) {
        console.log(error.message);
    }
}
test();