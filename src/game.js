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
    }
}

const game = new Sokoban(splitLevels[0]);

console.log('game', game);