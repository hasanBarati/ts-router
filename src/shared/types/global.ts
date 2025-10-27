export type selectResponse = {
  id: number;
  text: string;
};

export interface DateDto {
  year: number;
  month: number;
  day: number;
}

export interface DateTimeDto extends DateDto {
  hour: number;
  minute: number;
}
