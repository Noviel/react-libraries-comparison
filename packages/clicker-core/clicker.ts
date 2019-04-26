type Energy = 'energy';
type Gold = 'gold';

type ResourceType = Gold | Energy;

interface Resource {
  count: number;
}

interface ClickerPlayerState {
  gold: Resource;
  energy: Resource;
}

const initialPlayerState = {
  gold: {
    count: 100,
  },
  energy: {
    count: 100,
  },
};

/*
  Server can be located remotely on in Web Worker
*/
export class ClickerServer {
  playerState: ClickerPlayerState;

  constructor() {
    this.playerState = initialPlayerState;
  }
}
