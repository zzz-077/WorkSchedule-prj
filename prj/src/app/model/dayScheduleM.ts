export interface DAYSCHEDULE {
  month: string;
  day: number;
  weekday: string;
  worktype: [
    {
      name: string;
      shift: string;
      worker: string;
    }
  ];
}
