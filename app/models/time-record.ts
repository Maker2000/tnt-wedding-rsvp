export interface ITimeRecord {
  id: string;
  clockInTime: Date;
  clockOutTime?: Date;
  paid: boolean;
}

export interface CreateTimeRecordDto {
  clockInTime: Date;
  clockOutTime?: Date;
}
