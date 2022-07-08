const PLAYER_ON_FLOOR = '@';
const PLAYER_ON_TARGET = '+';
const BOX_ON_FLOOR = '$';
const BOX_ON_TARGET = '*';
const WALL = '#';
const TARGET = '.';
const FLOOR_INSIDE = '-';
const FLOOR_OUTSIDE = '_';

const splitLevels = levelsText.trim().split('\n\n');


class Sokoban {
    constructor(levelText) {
        this.player = null;
        this.boxes = [];
        this.level = [];

        const levelRows = levelText.split('\n');
        for (let y = 0; y < levelRows.length; y++) {
            const row = levelRows[y];
            const levelRowData = [];

            for (let x = 0; x < row.length; x++) {
                const char = row[x];

                switch (char) {
                    case PLAYER_ON_FLOOR:
                        if (this.player) {
                            throw new Error('Found multiple players');
                        }
                        this.player = { x, y };
                        levelRowData.push(FLOOR_INSIDE);
                        break;
                    case PLAYER_ON_TARGET:
                        if (this.player) {
                            throw new Error('Found multiple players');
                        }
                        this.player = { x, y };
                        levelRowData.push(TARGET);
                        break;
                    case BOX_ON_FLOOR:
                        this.boxes.push({ x, y });
                        levelRowData.push(FLOOR_INSIDE);
                        break;
                    case BOX_ON_TARGET:
                        this.boxes.push({ x, y });
                        levelRowData.push(TARGET);
                        break;
                    case WALL:
                    case TARGET:
                    case FLOOR_INSIDE:
                    case FLOOR_OUTSIDE:
                        levelRowData.push(char);
                        break;
                    default:
                        throw new Error('Discovered unknown level character: ' + char);
                }
            }

            this.level.push(levelRowData);
        }

        if (!this.player) {
            throw new Error('No player found!');
        }

        this.drawPlayfield();
    }

    drawPlayfield() {
        const playfield = document.getElementById('playfield');

        for (let y = 0; y < this.level.length; y++) {
            const row = this.level[y];
            for (let x = 0; x < row.length; x++) {
                const char = row[x];
                const img = document.createElement('img');
                img.style.left = `${x * 48}px`;
                img.style.top = `${y * 48}px`;
                switch (char) {
                    case WALL:
                        img.src = 'assets/flat/wall.png';
                        img.alt = 'Wall';
                        break;
                    case TARGET:
                        img.src = 'assets/flat/target.png';
                        img.alt = 'Target';
                        break;
                    case FLOOR_INSIDE:
                        img.src = 'assets/flat/floor.png';
                        img.alt = 'Floor';
                        break;
                    case FLOOR_OUTSIDE:
                        img.src = 'assets/flat/grass.png';
                        img.alt = 'Grass';
                        break;
                }
                playfield.appendChild(img);
            }
        }

        const playerImg = document.createElement('img');
        playerImg.style.left = `${this.player.x * 48}px`;
        playerImg.style.top = `${this.player.y * 48}px`;
        playerImg.src = 'assets/flat/player.png';
        playerImg.alt = 'Player';
        playfield.appendChild(playerImg);

        for (let i = 0; i < this.boxes.length; i++) {
            const box = this.boxes[i];
            const boxImg = document.createElement('img');
            boxImg.style.left = `${box.x * 48}px`;
            boxImg.style.top = `${box.y * 48}px`;
            boxImg.src = 'assets/flat/box.png';
            boxImg.alt = 'Box';
            playfield.appendChild(boxImg);
        }
    }
}

const game = new Sokoban(splitLevels[0]);

console.log('game', game);