const food = "rice";
const animal = "dog";

export { food, animal };

export function subtract(a: number, b: number) {
    return a - b;
}

type stringModule = {
    generateRandomCharaters: (length: number) => string;
    generateUserName: (name: string) => string
};

export default function stringModule(): any {
    return {
        generateRandomCharacters: (length: number) => {
            return Array.from({ length }, () => String.fromCharCode(Math.floor(Math.random() * 26) + 97)).join('');
        },
        generateUserName: (name: string) => {
            return name 
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join('');
        }
    };
}