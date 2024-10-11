import { Injectable } from '@angular/core';

export class Data {
  text: string | undefined;

  priorityId: number| undefined;

  typeId: number| undefined;

  startDate: Date| undefined;

  endDate: Date| undefined;

  recurrenceRule?: string;
}

export class PriorityData {
  text: string| undefined;

  id: number| undefined;

  color: string| undefined;
}

export class TypeData {
  text: string| undefined;

  id: number| undefined;

  color: string| undefined;
}

const data: Data[] = [{
  text: 'Walking a dog',
  priorityId: 1,
  typeId: 1,
  startDate: new Date('2023-10-24T03:35:39.55'),
  endDate: new Date('2023-10-26T03:35:39.55'),
}, {
  text: 'Website Re-Design Plan',
  priorityId: 2,
  typeId: 2,
  startDate: new Date('2023-04-26T16:00:00.000Z'),
  endDate: new Date('2023-04-26T18:30:00.000Z'),
}, {
  text: 'Book Flights to San Fran for Sales Trip',
  priorityId: 2,
  typeId: 2,
  startDate: new Date('2023-04-26T19:00:00.000Z'),
  endDate: new Date('2023-04-26T20:00:00.000Z'),
}, {
  text: 'Install New Router in Dev Room',
  priorityId: 1,
  typeId: 2,
  startDate: new Date('2023-04-26T21:30:00.000Z'),
  endDate: new Date('2023-04-26T22:30:00.000Z'),
}, {
  text: 'Go Grocery Shopping',
  priorityId: 1,
  typeId: 1,
  startDate: new Date('2023-04-27T01:30:00.000Z'),
  endDate: new Date('2023-04-27T02:30:00.000Z'),
}, {
  text: 'Approve Personal Computer Upgrade Plan',
  priorityId: 2,
  typeId: 2,
  startDate: new Date('2023-04-27T17:00:00.000Z'),
  endDate: new Date('2023-04-27T18:00:00.000Z'),
}, {
  text: 'Final Budget Review',
  priorityId: 2,
  typeId: 2,
  startDate: new Date('2023-04-27T19:00:00.000Z'),
  endDate: new Date('2023-04-27T20:35:00.000Z'),
}, {
  text: 'New Brochures',
  priorityId: 2,
  typeId: 2,
  startDate: new Date('2023-04-27T21:30:00.000Z'),
  endDate: new Date('2023-04-27T22:45:00.000Z'),
}, {
  text: 'Install New Database',
  priorityId: 1,
  typeId: 2,
  startDate: new Date('2023-04-28T16:45:00.000Z'),
  endDate: new Date('2023-04-28T18:15:00.000Z'),
}, {
  text: 'Approve New Online Marketing Strategy',
  priorityId: 2,
  typeId: 2,
  startDate: new Date('2023-04-28T19:00:00.000Z'),
  endDate: new Date('2023-04-28T21:00:00.000Z'),
}, {
  text: 'Upgrade Personal Computers',
  priorityId: 1,
  typeId: 2,
  startDate: new Date('2023-04-28T22:15:00.000Z'),
  endDate: new Date('2023-04-28T23:30:00.000Z'),
}, {
  text: 'Prepare 2023 Marketing Plan',
  priorityId: 2,
  typeId: 2,
  startDate: new Date('2023-04-29T18:00:00.000Z'),
  endDate: new Date('2023-04-29T20:30:00.000Z'),
}, {
  text: 'Brochure Design Review',
  priorityId: 1,
  typeId: 2,
  startDate: new Date('2023-04-29T21:00:00.000Z'),
  endDate: new Date('2023-04-29T22:30:00.000Z'),
}, {
  text: 'Create Icons for Website',
  priorityId: 2,
  typeId: 2,
  startDate: new Date('2023-04-30T17:00:00.000Z'),
  endDate: new Date('2023-04-30T18:30:00.000Z'),
}, {
  text: 'Upgrade Server Hardware',
  priorityId: 1,
  typeId: 2,
  startDate: new Date('2023-04-30T21:30:00.000Z'),
  endDate: new Date('2023-04-30T23:00:00.000Z'),
}, {
  text: 'Submit New Website Design',
  priorityId: 2,
  typeId: 2,
  startDate: new Date('2023-04-30T23:30:00.000Z'),
  endDate: new Date('2023-05-01T01:00:00.000Z'),
}, {
  text: 'Launch New Website',
  priorityId: 2,
  typeId: 2,
  startDate: new Date('2023-04-30T19:20:00.000Z'),
  endDate: new Date('2023-04-30T21:00:00.000Z'),
}, {
  text: 'Visiting a Doctor',
  priorityId: 2,
  typeId: 1,
  startDate: new Date('2023-05-01T17:00:00.000Z'),
  endDate: new Date('2023-05-01T20:30:00.000Z'),
},
];

const priorityData: PriorityData[] = [{
  text: 'Low Priority',
  id: 1,
  color: '#fcb65e',
}, {
  text: 'High Priority',
  id: 2,
  color: '#e18e92',
},
];

const typeData: TypeData[] = [{
  text: 'Home',
  id: 1,
  color: '#b6d623',
}, {
  text: 'Work',
  id: 2,
  color: '#679ec5',
},
];

@Injectable()
export class Service {
  getPriorityData() {
    return priorityData;
  }

  getTypeData() {
    return typeData;
  }

  getData() {
    return data;
  }

  getDinnerTime() {
    return { from: 12, to: 13 };
  }

  getHolidays() {
    return [
      new Date(2023, 3, 29),
      new Date(2023, 5, 6),
      new Date('2023-12-25T01:00:00.000Z'),
    ];
  }
}
