export class Duck {
    id: string;
    username: string;
    x: number;
    y: number;

    constructor(id: string, username: string) {
        this.id = id;
        this.username = username;
        this.x = 0;
        this.y = 0;
    }

    randomizePosition(width: number) {
        this.x = Math.floor(Math.random() * ((width - 200) - 200 + 1) + 200);
        this.y = Math.floor(Math.random() * (10 - -10 + 1) + -10);
    }
}