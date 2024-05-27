export class TeamInfo {
  constructor(
    public id: number,
    public name: string,
    public members: string[],
    public rooms: string[]
  ) {}
}
